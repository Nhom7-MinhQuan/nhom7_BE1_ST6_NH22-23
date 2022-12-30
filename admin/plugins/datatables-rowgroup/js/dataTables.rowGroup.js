p space coordinates.
   */
  texturePositionClipSpace: IVector;
  /**
   * The width and height of the glyph in the texture in pixels.
   */
  size: IVector;
  /**
   * The width and height of the glyph in the texture in clip space coordinates.
   */
  sizeClipSpace: IVector;
}

export interface IVector {
  x: number;
  y: number;
}

export interface IBoundingBox {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IRenderModel {
  cells: Uint32Array;
  lineLengths: Uint32Array;
  selection: ISelectionRenderModel;
}

export interface ISelectionRenderModel {
  hasSelection: boolean;
  columnSelectMode: boolean;
  viewportStartRow: number;
  viewportEndRow: number;
  viewportCappedStartRow: number;
  viewportCappedEndRow: number;
  startCol: number;
  endCol: number;
}

export interface IWebGL2RenderingContext extends WebGLRenderingContext {
  vertexAttribDivisor(index: number, divisor: number): void;
  createVertexArray(): IWebGLVertexArrayObject;
  bindVertexArray(vao: IWebGLVertexArrayObject): void;
  drawElementsInstanced(mode: number, count: number, type: number, offset: number, instanceCount: number): void;
}

export interface IWebGLVertexArrayObject {
}
/**
 * Copyright (c) 2017 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { Terminal, ITerminalAddon } from 'xterm';
import { WebglRenderer } from './WebglRenderer';
import { IRenderService } from 'browser/services/Services';
import { IColorSet } from 'browser/Types';

export class WebglAddon implements ITerminalAddon {
  private _terminal?: Terminal;
  private _renderer?: WebglRenderer;

  constructor(
    private _preserveDrawingBuffer?: boolean
  ) {}

  public activate(terminal: Terminal): void {
    if (!terminal.element) {
      throw new Error('Cannot activate WebglAddon before Terminal.open');
    }
    this._terminal = terminal;
    const renderService: IRenderService = (<any>terminal)._core._renderService;
    const colors: IColorSet = (<any>terminal)._core._colorManager.colors;
    this._renderer = new WebglRenderer(terminal, colors, this._preserveDrawingBuffer);
    renderService.setRenderer(this._renderer);
  }

  public dispose(): void {
    if (!this._terminal) {
      throw new Error('Cannot dispose WebglAddon because it is activated');
    }
    const renderService: IRenderService = (this._terminal as any)._core._renderService;
    renderService.setRenderer((this._terminal as any)._core._createRenderer());
    renderService.onResize(this._terminal.cols, this._terminal.rows);
    this._renderer = undefined;
  }

  public get textureAtlas(): HTMLCanvasElement | undefined {
    return this._renderer?.textureAtlas;
  }
}
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */

import { GlyphRenderer } from './GlyphRenderer';
import { LinkRenderLayer } from './renderLayer/LinkRenderLayer';
import { CursorRenderLayer } from './renderLayer/CursorRenderLayer';
import { acquireCharAtlas } from './atlas/CharAtlasCache';
import { WebglCharAtlas } from './atlas/WebglCharAtlas';
import { RectangleRenderer } from './RectangleRenderer';
import { IWebGL2RenderingContext } from './Types';
import { RenderModel, COMBINED_CHAR_BIT_MASK, RENDER_MODEL_BG_OFFSET, RENDER_MODEL_FG_OFFSET, RENDER_MODEL_INDICIES_PER_CELL } from './RenderModel';
import { Disposable } from 'common/Lifecycle';
import { NULL_CELL_CODE } from 'common/buffer/Constants';
import { Terminal, IEvent } from 'xterm';
import { IRenderLayer } from './renderLayer/Types';
import { IRenderDimensions, IRenderer, IRequestRedrawEvent } from 'browser/renderer/Types';
import { ITerminal, IColorSet } from 'browser/Types';
import { EventEmitter } from 'common/EventEmitter';
import { CellData } from 'common/buffer/CellData';

export class WebglRenderer extends Disposable implements IRenderer {
  private _renderLayers: IRenderLayer[];
  private _charAtlas: WebglCharAtlas | undefined;
  private _devicePixelRatio: number;

  private _model: RenderModel = new RenderModel();
  private _workCell: CellData = new CellData();

  private _canvas: HTMLCanvasElement;
  private _gl: IWebGL2RenderingContext;
  private _rectangleRenderer: RectangleRenderer;
  private _glyphRenderer: GlyphRenderer;

  public dimensions: IRenderDimensions;

  private _core: ITerminal;
  private _isAttached: boolean;

  private _onRequestRedraw = new EventEmitter<IRequestRedrawEvent>();
  public get onRequestRedraw(): IEvent<IRequestRedrawEvent> { return this._onRequestRedraw.event; }

  constructor(
    private _terminal: Terminal,
    private _colors: IColorSet,
    preserveDrawingBuffer?: boolean
  ) {
    super();

    this._core = (this._terminal as any)._core;

    this._renderLayers = [
      new LinkRenderLayer(this._core.screenElement!, 2, this._colors, this._core),
      new CursorRenderLayer(this._core.screenElement!, 3, this._colors, this._onRequestRedraw)
    ];
    this.dimensions = {
      scaledCharWidth: 0,
      scaledCharHeight: 0,
      scaledCellWidth: 0,
      scaledCellHeight: 0,
      scaledCharLeft: 0,
      scaledCharTop: 0,
      scaledCanvasWidth: 0,
      scaledCanvasHeight: 0,
      canvasWidth: 0,
      canvasHeight: 0,
      actualCellWidth: 0,
      actualCellHeight: 0
    };
    this._devicePixelRatio = window.devicePixelRatio;
    this._updateDimensions();

    this._canvas = document.createElement('canvas');

    const contextAttributes = {
      antialias: false,
      depth: false,
      preserveDrawingBuffer
    };
    this._gl = this._canvas.getContext('webgl2', contextAttributes) as IWebGL2RenderingContext;
    if (!this._gl) {
      throw new Error('WebGL2 not supported ' + this._gl);
    }
    this._core.screenElement!.appendChild(this._canvas);

    this._rectangleRenderer = new RectangleRenderer(this._terminal, this._colors, this._gl, this.dimensions);
    this._glyphRenderer = new GlyphRenderer(this._terminal, this._colors, this._gl, this.dimensions);

    // Update dimensions and acquire char atlas
    this.onCharSizeChanged();

    this._isAttached = document.body.contains(this._core.screenElement!);
  }

  public dispose(): void {
    this._renderLayers.forEach(l => l.dispose());
    this._core.screenElement!.removeChild(this._canvas);
    super.dispose();
  }

  public get textureAtlas(): HTMLCanvasElement | undefined {
    return this._charAtlas?.cacheCanvas;
  }

  public setColors(colors: IColorSet): void {
    this._colors = colors;
    // Clear layers and force a full render
    this._renderLayers.forEach(l => {
      l.setColors(this._terminal, this._colors);
      l.reset(this._terminal);
    });

    this._rectangleRenderer.setColors();
    this._glyphRenderer.setColors();

    this._refreshCharAtlas();

    this._rectangleRenderer.updateSelection(this._model.selection);
    this._glyphRenderer.updateSelection(this._model);

    // Force a full refresh
    this._model.clear();
  }

  public onDevicePixelRatioChange(): void {
    // If the device pixel ratio changed, the char atlas needs to be regenerated
    // and the terminal needs to refreshed
    if (this._devicePixelRatio !== window.devicePixelRatio) {
      this._devicePixelRatio = window.devicePixelRatio;
      this.onResize(this._terminal.cols, this._terminal.rows);
    }
  }

  public onResize(cols: number, rows: number): void {
    // Update character and canvas dimensions
    this._updateDimensions();

    this._model.resize(this._terminal.cols, this._terminal.rows);
    this._rectangleRenderer.onResize();

    // Resize all render layers
    this._renderLayers.forEach(l => l.resize(this._terminal, this.dimensions));

    // Resize the canvas
    this._canvas.width = this.dimensions.scaledCanvasWidth;
    this._canvas.height = this.dimensions.scaledCanvasHeight;
    this._canvas.style.width = `${this.dimensions.canvasWidth}px`;
    this._canvas.style.height = `${this.dimensions.canvasHeight}px`;

    // Resize the screen
    this._core.screenElement!.style.width = `${this.dimensions.canvasWidth}px`;
    this._core.screenElement!.style.height = `${this.dimensions.canvasHeight}px`;
    this._glyphRenderer.setDimensions(this.dimensions);
    this._glyphRenderer.onResize();

    this._refreshCharAtlas();

    // Force a full refresh
    this._model.clear();
  }

  public onCharSizeChanged(): void {
    this.onResize(this._terminal.cols, this._terminal.rows);
  }

  public onBlur(): void {
    this._renderLayers.forEach(l => l.onBlur(this._terminal));
  }

  public onFocus(): void {
    this._renderLayers.forEach(l => l.onFocus(this._terminal));
  }

  public onSelectionChanged(start: [number, number] | undefined, end: [number, number] | undefined, columnSelectMode: boolean): void {
    this._renderLayers.forEach(l => l.onSelectionChanged(this._terminal, start, end, columnSelectMode));

    this._updateSelectionModel(start, end, columnSelectMode);

    this._rectangleRenderer.updateSelection(this._model.selection);
    this._glyphRenderer.updateSelection(this._model);

    this._onRequestRedraw.fire({ start: 0, end: this._terminal.rows - 1 });
  }

  public onCursorMove(): void {
    this._renderLayers.forEach(l => l.onCursorMove(this._terminal));
  }

  public onOptionsChanged(): void {
    this._renderLayers.forEach(l => l.onOptionsChanged(this._terminal));
    this._updateDimensions();
    this._refreshCharAtlas();
  }

  /**
   * Refreshes the char atlas, aquiring a new one if necessary.
   * @param terminal The terminal.
   * @param colorSet The color set to use for the char atlas.
   */
  private _refreshCharAtlas(): void {
    if (this.dimensions.scaledCharWidth <= 0 && this.dimensions.scaledCharHeight <= 0) {
      // Mark as not attached so char atlas gets refreshed on next render
      this._isAttached = false;
      return;
    }

    const atlas = acquireCharAtlas(this._terminal, this._colors, this.dimensions.scaledCharWidth, this.dimensions.scaledCharHeight);
    if (!('getRasterizedGlyph' in atlas)) {
      throw new Error('The webgl renderer only works with the webgl char atlas');
    }
    this._charAtlas = atlas as WebglCharAtlas;
    this._charAtlas.warmUp();
    this._glyphRenderer.setAtlas(this._charAtlas);
  }

  public clear(): void {
    this._renderLayers.forEach(l => l.reset(this._terminal));
  }

  public registerCharacterJoiner(handler: (text: string) => [number, number][]): number {
    return -1;
  }

  public deregisterCharacterJoiner(joinerId: number): boolean {
    return false;
  }

  public renderRows(start: number, end: number):