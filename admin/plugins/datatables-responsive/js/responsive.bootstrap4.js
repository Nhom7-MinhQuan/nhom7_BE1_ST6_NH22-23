nderModel implements IRenderModel {
  public cells: Uint32Array;
  public lineLengths: Uint32Array;
  public selection: ISelectionRenderModel;

  constructor() {
    this.cells = new Uint32Array(0);
    this.lineLengths = new Uint32Array(0);
    this.selection = {
      hasSelection: false,
      columnSelectMode: false,
      viewportStartRow: 0,
      viewportEndRow: 0,
      viewportCappedStartRow: 0,
      viewportCappedEndRow: 0,
      startCol: 0,
      endCol: 0
    };
  }

  public resize(cols: number, rows: number): void {
    const indexCount = cols * rows * RENDER_MODEL_INDICIES_PER_CELL;
    if (indexCount !== this.cells.length) {
      this.cells = new Uint32Array(indexCount);
      this.lineLengths = new Uint32Array(rows);
    }
  }

  public clear(): void {
    fill(this.cells, 0, 0);
    fill(this.lineLengths, 0, 0);
    this.clearSelection();
  }

  public clearSelection(): void {
    this.selection.hasSelection = false;
    this.selection.viewportStartRow = 0;
    this.selection.viewportEndRow = 0;
    this.selection.viewportCappedStartRow = 0;
    this.selection.viewportCappedEndRow = 0;
    this.selection.startCol = 0;
    this.selection.endCol = 0;
  }
}
/**
 * Copyright (c) 2018 The xterm.js authors. All rights reserved.
 * @license MIT
 */
import { assert } from 'chai';
import { sliceFallback } from './TypedArray';

type TypedArray = Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

function deepEquals(a: TypedArray, b: TypedArray): void {
  assert.equal(a.length, b.length);
  for (let i = 0; i < a.length; ++i) {
    assert.equal(a[i], b[i]);
  }
}

describe('polyfill conformance tests', function(): void {
  describe('TypedArray.slice', () => {
    describe('should work with all typed array types', () => {
      it('Uint8Array', () => {
        const a = new Uint8Array(5);
        deepEquals(sliceFallback(a, 2), a.slice(2));
        deepEquals(sliceFallback(a, 65