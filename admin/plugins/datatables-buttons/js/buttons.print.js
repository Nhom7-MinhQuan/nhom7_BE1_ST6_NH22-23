==t?void 0:t.cacheCanvas},enumerable:!1,configurable:!0}),e.prototype.setColors=function(t){var e=this;this._colors=t,this._renderLayers.forEach((function(t){t.setColors(e._terminal,e._colors),t.reset(e._terminal)})),this._rectangleRenderer.setColors(),this._glyphRenderer.setColors(),this._refreshCharAtlas(),this._rectangleRenderer.updateSelection(this._model.selection),this._glyphRenderer.updateSelection(this._model),this._model.clear()},e.prototype.onDevicePixelRatioChange=function(){this._devicePixelRatio!==window.devicePixelRatio&&(this._devicePixelRatio=window.devicePixelRatio,this.onResize(this._terminal.cols,this._terminal.rows))},e.prototype.onResize=function(t,e){var i=this;this._updateDimensions(),this._model.resize(this._terminal.cols,this._terminal.rows),this._rectangleRenderer.onResize(),this._renderLayers.forEach((function(t){return t.resize(i._terminal,i.dimensions)})),this._canvas.width=this.dimensions.scaledCanvasWidth,this._canvas.height=this.dimensions.scaledCanvasHeight,this._canvas.style.width=this.dimensions.canvasWidth+"px",this._canvas.style.height=this.dimensions.canvasHeight+"px",this._core.screenElement.style.width=this.dimensions.canvasWidth+"px",this._core.screenElement.style.height=this.dimensions.canvasHeight+"px",this._glyphRenderer.setDimensions(this.dimensions),this._glyphRenderer.onResize(),this._refreshCharAtlas(),this._model.clear()},e.prototype.onCharSizeChanged=function(){this.onResize(this._terminal.cols,this._terminal.rows)},e.prototype.onBlur=function(){var t=this;this._renderLayers.forEach((function(e){return e.onBlur(t._terminal)}))},e.prototype.onFocus=function(){var t=this;this._renderLayers.forEach((function(e){return e.onFocus(t._terminal)}))},e.prototype.onSelectionChanged=function(t,e,i){var r=this;this._renderLayers.forEach((function(o){return o.onSelectionChanged(r._terminal,t,e,i)})),this._updateSelectionModel(t,e,i),this._rectangleRenderer.updateSelection(this._model.selection),this._glyphRenderer.updateSelection(this._model),this._onRequestRedraw.fire({start:0,end:this._terminal.rows-1})},e.prototype.onCursorMove=function(){var t=this;this._renderLayers.forEach((function(e){return e.onCursorMove(t._terminal)}))},e.prototype.onOptionsChanged=function(){var t=this;this._renderLayers.forEach((function(e){return e.onOptionsChanged(t._terminal)})),this._updateDimensions(),this._refreshCharAtlas()},e.prototype._refreshCharAtlas=function(){if(this.dimensions.scaledCharWidth<=0&&this.dimensions.scaledCharHeight<=0)this._isAttached=!1;else{var t=l.acquireCharAtlas(this._terminal,this._colors,this.dimensions.scaledCharWidth,this.dimensions.scaledCharHeight);if(!("getRasterizedGlyph"in t))throw new Error("The webgl renderer only works with the webgl char atlas");this._charAtlas=t,this._charAtlas.warmUp(),this._glyphRenderer.setAtlas(this._charAtlas)}},e.prototype.clear=function(){var t=this;this._renderLayers.forEach((function(e){return e.reset(t._terminal)}))},e.prototype.registerCharacterJoiner=function(t){return-1},e.prototype.deregisterCharacterJoiner=function(t){return!1},e.prototype.renderRows=function(t,e){var i=this;if(!this._isAttached){if(!(document.body.contains(this._core.screenElement)&&this._core._charSizeService.width&&this._core._charSizeService.height))return;this._updateDimensions(),this._refreshCharAtlas(),this._isAttached=!0}this._renderLayers.forEach((function(r){return r.onGridChanged(i._terminal,t,e)})),this._glyphRenderer.beginFrame()&&this._model.clear(),this._updateModel(t,e),this._rectangleRenderer.render(),this._glyphRenderer.render(this._model,this._model.selection.hasSelection)},e.prototype._updateModel=function(t,e){for(var i=this._core,r=t;r<=e;r++){var o=r+i.buffer.ydisp,n=i.buffer.lines.get(o);this._model.lineLengths[r]=0;for(var s=0;s<i.cols;s++){n.loadCell(s,this._workCell);var a=this._workCell.getChars(),l=this._workCell.getCode(),c=(r*i.cols+s)*h.RENDER_MODEL_INDICIES_PER_CELL;l!==d.NULL_CELL_CODE&&(this._model.lineLengths[r]=s+1),this._model.cells[c]===l&&this._model.cells[c+h.RENDER_MODEL_BG_OFFSET]===this._workCell.bg&&this._model.cells[c+h.RENDER_MODEL_FG_OFFSET]===this._workCell.fg||(a.length>1&&(l|=h.COMBINED_CHAR_BIT_MASK),this._model.cells[c]=l,this._model.cells[c+h.RENDER_MODEL_BG_OFFSET]=this._workCell.bg,this._model.cells[c+h.RENDER_MODEL_FG_OFFSET]=this._workCell.fg,this._glyphRenderer.updateCell(s,r,l,this._workCell.bg,this._workCell.fg,a))}}this._rectangleRenderer.updateBackgrounds(this._model)},e.prototype._updateSelectionModel=function(t,e,i){var r=this._terminal;if(t&&e&&(t[0]!==e[0]||t[1]!==e[1])){var o=t[1]-r.buffer.active.viewportY,n=e[1]-r.buffer.active.viewportY,s=Math.max(o,0),a=Math.min(n,r.rows-1);s>=r.rows||a<0?this._model.clearSelection():(this._model.selection.hasSelection=!0,this._model.selection.columnSelectMode=i,this._model.selection.viewportStartRow=o,this._model.selection.viewportEndRow=n,this._model.selection.viewportCappedStartRow=s,this._model.selection.viewportCappedEndRow=a,this._model.selection.startCol=t[0],this._model.selection.endCol=e[0])}else this