ngBuffer?: boolean);

    /**
     * Activates the addon
     * @param terminal The terminal the addon is being loaded in.
     */
    public activate(terminal: Terminal): void;

    /**
     * Disposes the addon.
     */
    public dispose(): void;
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTerminalFromCache = exports.acquireCharAtlas = void 0;
var CharAtlasUtils_1 = require("./CharAtlasUtils");
var WebglCharAtlas_1 = require("./WebglCharAtlas");
var charAtlasCache = [];
function acquireCharAtlas(terminal, colors, scaledCharWidth, scaledCharHeight) {
    var newConfig = CharAtlasUtils_1.generateConfig(scaledCharWidth, scaledCharHeight, terminal, colors);
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        var ownedByIndex = entry.ownedBy.indexOf(terminal);
        if (ownedByIndex >= 0) {
            if (CharAtlasUtils_1.configEquals(entry.config, newConfig)) {
                return entry.atlas;
            }
            if (entry.ownedBy.length === 1) {
                entry.atlas.dispose();
                charAtlasCache.splice(i, 1);
            }
            else {
                entry.ownedBy.splice(ownedByIndex, 1);
            }
            break;
        }
    }
    for (var i = 0; i < charAtlasCache.length; i++) {
        var entry = charAtlasCache[i];
        if (CharAtlasUtils_1.configEquals(entry.config, newConfig)) {
            entry.ownedBy.push(terminal);
            return entry.atlas;
        }
    }
    var newEntry = {
        atlas: new WebglCharAtlas_1.WebglCharAtlas(document, newConfig),
        config: newConfig,
        ownedBy: [terminal]
    };
    charAtlasCache.push(newEntry);
    return newEntry.atlas;
}
exports.acquireCharAtlas = acquireCharAtlas;
function removeTerminalFromCache(terminal) {
    for (var i = 0; i < charAtlasCache.length; i++) {
        var index = charAtlasCache[i].ownedBy.indexOf(terminal);
        if (index !== -1) {
            if (charAtlasCache[i].ownedBy.length === 1) {
                charAtlasCache[i].atlas.dispose();
                charAtlasCache.splice(i, 1);
            }
            else {
                charAtlasCache[i].ownedBy.splice(index, 1);
            }
            break;
        }
    }
}
exports.removeTerminalFromCache = removeTerminalFromCache;
//# sourceMappingURL=CharAtlasCache.js.map{"version":3,"file":"CharAtlasCache.js","sourceRoot":"","sources":["../../src/atlas/CharAtlasCache.ts"],"names":[],"mappings":";;;AAKA,mDAAgE;AAChE,mDAAkD;AAalD,IAAM,cAAc,GAA2B,EAAE,CAAC;AAQlD,SAAgB,gBAAgB,CAC9B,QAAkB,EAClB,MAAiB,EACjB,eAAuB,EACvB,gBAAwB;IAExB,IAAM,SAAS,GAAG,+BAAc,CAAC,eAAe,EAAE,gBAAgB,EAAE,QAAQ,EAAE,MAAM,CAAC,CAAC;IAGtF,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,cAAc,CAAC,MAAM,EAAE,CAAC,EAAE,EAAE;QAC9C,IAAM,KAAK,GAAG,cAAc,CAAC,CAAC,CAAC,CAAC;QAChC,IAAM,YAAY,GAAG,KAAK,CAAC,OAAO,CAAC,OAAO,CAAC,QAAQ,CAAC,CAAC;QACrD,IAAI,YAAY,IAAI,CAAC,EAAE;YACrB,IAAI,6BAAY,CAAC,KAAK,CAAC,MAAM,EAAE,SAAS,CAAC,EAAE;gBACzC,OAAO,KAAK,CAAC,KAAK,CAAC;aACpB;YAED,IAAI,KAAK,CAAC,OAAO,CAAC,MAAM,KAAK,CAAC,EAAE;gBAC9B,KAAK,CAAC,KAAK,CAAC,OAAO,EAAE,CAAC;gBACtB,cAAc,CAAC,MAAM,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;aAC7B;iBAAM;gBACL,KAAK,CAAC,OAAO,CAAC,MAAM,CAAC,YAAY,EAAE,CAAC,CAAC,CAAC;aACvC;YACD,MAAM;SACP;KACF;IAGD,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,cAAc,CAAC,MAAM,EAAE,CAAC,EAAE,EAAE;QAC9C,IAAM,KAAK,GAAG,cAAc,CAAC,CAAC,CAAC,CAAC;QAChC,IAAI,6BAAY,CAAC,KAAK,CAAC,MAAM,EAAE,SAAS,CAAC,EAAE;YAEzC,KAAK,CAAC,OAAO,CAAC,IAAI,CAAC,QAAQ,CAAC,CAAC;YAC7B,OAAO,KAAK,CAAC,KAAK,CAAC;SACpB;KACF;IAED,IAAM,QAAQ,GAAyB;QACrC,KAAK,EAAE,IAAI,+BAAc,CAAC,QAAQ,EAAE,SAAS,CAAC;QAC9C,MAAM,EAAE,SAAS;QACjB,OAAO,EAAE,CAAC,QAAQ,CAAC;KACpB,CAAC;IACF,cAAc,CAAC,IAAI,CAAC,QAAQ,CAAC,CAAC;IAC9B,OAAO,QAAQ,CAAC,KAAK,CAAC;AACxB,CAAC;AA5CD,4CA4CC;AAMD,SAAgB,uBAAuB,CAAC,QAAkB;IACxD,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,cAAc,CAAC,MAAM,EAAE,CAAC,EAAE,EAAE;QAC9C,IAAM,KAAK,GAAG,cAAc,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,OAAO,CAAC,QAAQ,CAAC,CAAC;QAC1D,IAAI,KAAK,KAAK,CAAC,CAAC,EAAE;YAChB,IAAI,cAAc,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,MAAM,KAAK,CAAC,EAAE;gBAE1C,cAAc,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,OAAO,EAAE,CAAC;gBAClC,cAAc,CAAC,MAAM,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;aAC7B;iBAAM;gBAEL,cAAc,CAAC,CAAC,CAAC,CAAC,OAAO,CAAC,MAAM,CAAC,KAAK,EAAE,CAAC,CAAC,CAAC;aAC5C;YACD,MAAM;SACP;KACF;AACH,CAAC;AAfD,0DAeC"}"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is256Color = exports.configEquals = exports.generateConfig = void 0;
var NULL_COLOR = {
    css: '',
    rgba: 0
};
function generateConfig(scaledCharWidth, scaledCharHeight, terminal, colors) {
    var clonedColors = {
        foreground: colors.foreground,
        background: colors.background,
        cursor: NULL_COLOR,
        cursorAccent: NULL_COLOR,
        selectionTransparent: NULL_COLOR,
        selectionOpaque: NULL_COLOR,
        ansi: colors.ansi.slice(),
        contrastCache: colors.contrastCache
    };
    return {
        devicePixelRatio: window.devicePixelRatio,
        scaledCharWidth: scaledCharWidth,
        scaledCharHeight: scaledCharHeight,
        fontFamily: terminal.getOption('fontFamily'),
        fontSize: terminal.getOption('fontSize'),
        fontWeight: terminal.getOption('fontWeight'),
        fontWeightBold: terminal.getOption('fontWeightBold'),
        allowTransparency: terminal.getOption('allowTransparency'),
        drawBoldTextInBrightColors: terminal.getOption('drawBoldTextInBrightColors'),
        minimumContrastRatio: terminal.getOption('minimumContrastRatio'),
        colors: clonedColors
    };
}
exports.generateConfig = generateConfig;
function configEquals(a, b) {
    for (var i = 0; i < a.colors.ansi.length; i++) {
        if (a.colors.ansi[i].rgba !== b.colors.ansi[i].rgba) {
            return false;
        }
    }
    return a.devicePixelRatio === b.devicePixelRatio &&
        a.fontFamily === b.fontFamily &&
        a.fontSize === b.fontSize &&
        a.fontWeight === b.fontWeight &&
        a.fontWeightBold === b.fontWeightBold &&
        a.allowTransparency === b.allowTransparency &&
        a.scaledCharWidth === b.scaledCharWidth &&
        a.scaledCharHeight === b.scaledCharHeight &&
        a.drawBoldTextInBrightColors === b.drawBoldTextInBrightColors &&
        a.minimumContrastRatio === b.minimumContrastRatio &&
        a.colors.foreground === b.colors.foreground &&
        a.colors.background === b.colors.background;
}
exports.configEquals = configEquals;
function is256Color(colorCode) {
    return (colorCode & 50331648) === 16777216 || (colorCode & 50331648) === 33554432;
}
exports.is256Color = is256Color;
//# sourceMappingURL=CharAtlasUtils.js.map{"version":3,"file":"CharAtlasUtils.js","sourceRoot":"","sources":["../../src/atlas/CharAtlasUtils.ts"],"names":[],"mappings":";;;AAUA,IAAM,UAAU,GAAW;IACzB,GAAG,EAAE,EAAE;IACP,IAAI,EAAE,CAAC;CACR,CAAC;AAEF,SAAgB,cAAc,CAAC,eAAuB,EAAE,gBAAwB,EAAE,QAAkB,EAAE,MAAiB;IAErH,IAAM,YAAY,GAAc;QAC9B,UAAU,EAAE,MAAM,CAAC,UAAU;QAC7B,UAAU,EAAE,MAAM,CAAC,UAAU;QAC7B,MAAM,EAAE,UAAU;QAClB,YAAY,EAAE,UAAU;QACxB,oBAAoB,EAAE,UAAU;QAChC,eAAe,EAAE,UAAU;QAG3B,IAAI,EAAE,MAAM,CAAC,IAAI,CAAC,KAAK,EAAE;QACzB,aAAa,EAAE,MAAM,CAAC,aAAa;KACpC,CAAC;IACF,OAAO;QACL,gBAAgB,EAAE,MAAM,CAAC,gBAAgB;QACzC,eAAe,iBAAA;QACf,gBAAgB,kBAAA;QAChB,UAAU,EAAE,QAAQ,CAAC,SAAS,CAAC,YAAY,CAAC;QAC5C,QAAQ,EAAE,QAAQ,CAAC,SAAS,CAAC,UAAU,CAAC;QACxC,UAAU,EAAE,QAAQ,CAAC,SAAS,CAAC,YAAY,CAAe;QAC1D,cAAc,EAAE,QAAQ,CAAC,SAAS,CAAC,gBAAgB,CAAe;QAClE,iBAAiB,EAAE,QAAQ,CAAC,SAAS,CAAC,mBAAmB,CAAC;QAC1D,0BAA0B,EAAE,QAAQ,CAAC,SAAS,CAAC,4BAA4B,CAAC;QAC5E,oBAAoB,EAAE,QAAQ,CAAC,SAAS,CAAC,sBAAsB,CAAC;QAChE,MAAM,EAAE,YAAY;KACrB,CAAC;AACJ,CAAC;AA3BD,wCA2BC;AAED,SAAgB,YAAY,CAAC,CAAmB,EAAE,CAAmB;IACnE,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,MAAM,EAAE,CAAC,EAAE,EAAE;QAC7C,IAAI,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,KAAK,CAAC,CAAC,MAAM,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE;YACnD,OAAO,KAAK,CAAC;SACd;KACF;IACD,OAAO,CAAC,CAAC,gBAAgB,KAAK,CAAC,CAAC,gBAAgB;QAC5C,CAAC,CAAC,UAAU,KAAK,CAAC,CAAC,UAAU;QAC7B,CAAC,CAAC,QAAQ,KAAK,CAAC,CAAC,QAAQ;QACzB,CAAC,CAAC,UAAU,KAAK,CAAC,CAAC,UAAU;QAC7B,CAAC,CAAC,cAAc,KAAK,CAAC,CAAC,cAAc;QACrC,CAAC,CAAC,iB		var topDiff = this._eventToPage( e, 'Y' ) - start.top;
		var leftDiff = this._eventToPage( e, 'X' ) - start.left;
		var snap = this.c.snapX;
		var left;
		var top = topDiff + start.offsetTop;

		if ( snap === true ) {
			left = start.offsetLeft;
		}
		else if ( typeof snap === 'number' ) {
			left = start.offsetLeft + snap;
		}
		else {
			left = leftDiff + start.offsetLeft;
		}

		if(top < 0) {
			top = 0
		}
		else if(top + this.s.domCloneOuterHeight > this.s.documentOuterHeight) {
			top = this.s.documentOuterHeight - this.s.domCloneOuterHeight;
		}

		this.dom.clone.css( {
			top: top,
			left: left
		} );
	},


	/**
	 * Emit an event on the DataTable for listeners
	 *
	 * @param  {string} name Event name
	 * @param  {array} args Event arguments
	 * @private
	 */
	_emitEvent: function ( name, args )
	{
		this.s.dt.iterator( 'table', function ( ctx, i ) {
			$(ctx.nTable).triggerHandler( name+'.dt', args );
		} );
	},


	/**
	 * Get pageX/Y position from an event, regardless of if it is a mouse or
	 * touch event.
	 *
	 * @param  {object} e Event
	 * @param  {string} pos X or Y (must be a capital)
	 * @private
	 */
	_eventToPage: function ( e, pos )
	{
		if ( e.type.indexOf( 'touch' ) !== -1 ) {
			return e.originalEvent.touches[0][ 'page'+pos ];
		}

		return e[ 'page'+pos ];
	},


	/**
	 * Mouse down event handler. Read initial positions and add event handlers
	 * for the move.
	 *
	 * @param  {object} e      Mouse event
	 * @param  {jQuery} target TR element that is to be moved
	 * @private
	 */
	_mouseDown: function ( e, target )
	{
		var that = this;
		var dt = this.s.dt;
		var start = this.s.start;

		var offset = target.offset();
		start.top = this._eventToPage( e, 'Y' );
		start.left = this._eventToPage( e, 'X' );
		start.offsetTop = offset.top;
		start.offsetLeft = offset.left;
		start.nodes = $.unique( dt.rows( { page: 'current' } ).nodes().toArray() );

		this._cachePositions();
		this._clone( target );
		this._clonePosition( e );

		this.dom.target = target;
		target.addClass( 'dt-rowReorder-moving' );

		$( document )
			.on( 'mouseup.rowReorder touchend.rowReorder', function (e) {
				that._mouseUp(e);
			} )
			.on( 'mousemove.rowReorder touchmove.rowReorder', function (e) {
				that._mouseMove(e);
			} );

		// Check if window is x-scrolling - if not, disable it for the duration
		// of the drag
		if ( $(window).width() === $(document).width() ) {
			$(document.body).addClass( 'dt-rowReorder-noOverflow' );
		}

		// Cache scrolling information so mouse move doesn't need to read.
		// This assumes that the window and DT scroller will not change size
		// during an row drag, which I think is a fair assumption
		var scrollWrapper = this.dom.dtScroll;
		this.s.scroll = {
			windowHeight: $(window).height(),
			windowWidth:  $(window).width(),
			dtTop:        scrollWrapper.length ? scrollWrapper.offset().top : null,
			dtLeft:       scrollWrapper.length ? scrollWrapper.offset().left : null,
			dtHeight:     scrollWrapper.length ? scrollWrapper.outerHeight() : null,
			dtWidth:      scrollWrapper.length ? scrollWrapper.outerWidth() : null
		};
	},


	/**
	 * Mouse move event handler - move the cloned row and shuffle the table's
	 * rows if required.
	 *
	 * @param  {object} e Mouse event
	 * @private
	 */
	_mouseMove: function ( e )
	{
		this._clonePosition( e );

		// Transform the mouse position into a position in the table's body
		var bodyY = this._eventToPage( e, 'Y' ) - this.s.bodyTop;
		var middles = this.s.middles;
		var insertPoint = null;
		var dt = this.s.dt;

		// Determine where the row should be inserted based on the mouse
		// position
		for ( var i=0, ien=middles.length ; i<ien ; i++ ) {
			if ( bodyY < middles[i] ) {
				insertPoint = i;
				break;
			}
		}

		if ( insertPoint === null ) {
			insertPoint = middles.length;
		}

		// Perform the DOM shuffle if it has changed from last time
		if ( this.s.lastInsert === null || this.s.lastInsert !== insertPoint ) {
			var nodes = $.unique( dt.rows( { page: 'current' } ).nodes().toArray() );

			if ( insertPoint > this.s.lastInsert ) {
				this.dom.target.insertAfter( nodes[ insertPoint-1 ] );
			}
			else {
				this.dom.target.insertBefore( nodes[ insertPoint ] );
			}

			this._cachePositions();

			this.s.lastInsert = insertPoint;
		}

		this._shiftScroll( e );
	},


	/**
	 * Mouse up event handler - release the event handlers and perform the
	 * table updates
	 *
	 * @param  {object} e Mouse event
	 * @private
	 */
	_mouseUp: function ( e )
	{
		var that = this;
		var dt = this.s.dt;
		var i, ien;
		var dataSrc = this.c.dataSrc;

		this.dom.clone.remove();
		this.dom.clone = null;

		this.dom.target.removeClass( 'dt-rowReorder-moving' );
		//this.dom.target = null;

		$(document).off( '.rowReorder' );
		$(document.body).removeClass( 'dt-rowReorder-noOverflow' );

		clearInterval( this.s.scrollInterval );
		this.s.scrollInterval = null;

		// Calculate the difference
		var startNodes = this.s.start.nodes;
		var endNodes = $.unique( dt.rows( { page: 'current' } ).nodes().toArray() );
		var idDiff = {};
		var fullDiff = [];
		var diffNodes = [];
		var getDataFn = this.s.getDataFn;
		var setDataFn = this.s.setDataFn;

		for ( i=0, ien=startNodes.length ; i<ien ; i++ ) {
			if ( startNodes[i] !== endNodes[i] ) {
				var id = dt.row( endNodes[i] ).id();
				var endRowData = dt.row( endNodes[i] ).data();
				var startRowData = dt.row( startNodes[i] ).data();

				if ( id ) {
					idDiff[ id ] = getDataFn( startRowData );
				}

				fullDiff.push( {
					node: endNodes[i],
					oldData: getDataFn( endRowData ),
					newData: getDataFn( startRowData ),
					newPosition: i,
					oldPosition: $.inArray( endNodes[i], startNodes )
				} );

				diffNodes.push( endNodes[i] );
			}
		}
		
		// Create event args
		var eventArgs = [ fullDiff, {
			dataSrc:       dataSrc,
			nodes:         diffNodes,
			values:        idDiff,
			triggerRow:    dt.row( this.dom.target ),
			originalEvent: e
		} ];
		
		// Emit event
		this._emitEvent( 'row-reorder', eventArgs );

		var update = function () {
			if ( that.c.update ) {
				for ( i=0, ien=fullDiff.length ; i<ien ; i++ ) {
					var row = dt.row( fullDiff[i].node );
					var rowData = row.data();

					setDataFn( rowData, fullDiff[i].newData );

					// Invalidate the cell that has the same data source as the dataSrc
					dt.columns().every( function () {
						if ( this.dataSrc() === dataSrc ) {
							dt.cell( fullDiff[i].node, this.index() ).invalidate( 'data' );
						}
					} );
				}

				// Trigger row reordered event
				that._emitEvent( 'row-reordered', eventArgs );

				dt.draw( false );
			}
		};

		// Editor interface
		if ( this.c.editor ) {
			// Disable user interaction while Editor is submitting
			this.c.enable = false;

			this.c.editor
				.edit(
					diffNodes,
					false,
					$.extend( {submit: 'changed'}, this.c.formOptions )
				)
				.multiSet( dataSrc, idDiff )
				.one( 'preSubmitCancelled.rowReorder', function () {
					that.c.enable = true;
					that.c.editor.off( '.rowReorder' );
					dt.draw( false );
				} )
				.one( 'submitUnsuccessful.rowReorder', function () {
					dt.draw( false );
				} )
				.one( 'submitSuccess.rowReorder', function () {
					update();
				} )
				.one( 'submitComplete', function () {
					that.c.enable = true;
					that.c.editor.off( '.rowReorder' );
				} )
				.submit();
		}
		else {
			update();
		}
	},


	/**
	 * Move the window and DataTables scrolling during a drag to scroll new
	 * content into view.
	 *
	 * This matches the `_shiftScroll` method used in AutoFill, but only
	 * horizontal scrolling is considered here.
	 *
	 * @param  {object} e Mouse move event object
	 * @private
	 */
	_shiftScroll: function ( e )
	{
		var that = this;
		var dt = this.s.dt;
		var scroll = this.s.scroll;
		var runInterval = false;
		var scrollSpeed = 5;
		var buffer = 65;
		var
			windowY = e.pageY - document.body.scrollTop,
			windowVert,
			dtVert;

		// Window calculations - based on the mouse position in the window,
		// regardless of scrolling
		if ( windowY < $(window).scrollTop() + buffer ) {
			windowVert = scrollSpeed * -1;
		}
		else if ( windowY > scroll.windowHeight + $(window).scrollTop() - buffer ) {
			windowVert = scrollSpeed;
		}

		// DataTables scrolling calculations - based on the table's position in
		// the document and the mouse position on the page
		if ( scroll.dtTop !== null && e.pageY < scroll.dtTop + buffer ) {
			dtVert = scrollSpeed * -1;
		}
		else if ( scroll.dtTop !== null && e.pageY > scroll.dtTop + scroll.dtHeight - buffer ) {
			dtVert = scrollSpeed;
		}

		// This is where it gets interesting. We want to continue scrolling
		// without requiring a mouse move, so we need an interval to be
		// triggered. The interval should continue until it is no longer needed,
		// but it must also use the latest scroll commands (for example consider
		// that the mouse might move from scrolling up to scrolling left, all
		// with the same interval running. We use the `scroll` object to "pass"
		// this information to the interval. Can't use local variables as they
		// wouldn't be the ones that are used by an already existing interval!
		if ( windowVert || dtVert ) {
			scroll.windowVert = windowVert;
			scroll.dtVert = dtVert;
			runInterval = true;
		}
		else if ( this.s.scrollInterval ) {
			// Don't need to scroll - remove any existing timer
			clearInterval( this.s.scrollInterval );
			this.s.scrollInterval = null;
		}

		// If we need to run the interval to scroll and there is no existing
		// interval (if there is an existing one, it will continue to run)
		if ( ! this.s.scrollInterval && runInterval ) {
			this.s.scrollInterval = setInterval( function () {
				// Don't need to worry about setting scroll <0 or beyond the
				// scroll bound as the browser will just reject that.
				if ( scroll.windowVert ) {
					var top = $(document).scrollTop();
					$(document).scrollTop(top + scroll.windowVert);

					if ( top !== $(document).scrollTop() ) {
						var move = parseFloat(that.dom.clone.css("top"));
						that.dom.clone.css("top", move + scroll.windowVert);					
					}
				}

				// DataTables scrolling
				if ( scroll.dtVert ) {
					var scroller = that.dom.dtScroll[0];

					if ( scroll.dtVert ) {
						scroller.scrollTop += scroll.dtVert;
					}
				}
			}, 20 );
		}
	}
} );



/**
 * RowReorder default settings for initialisation
 *
 * @namespace
 * @name RowReorder.defaults
 * @static
 */
RowReorder.defaults = {
	/**
	 * Data point in the host row's data source object for where to get and set
	 * the data to reorder. This will normally also be the sorting column.
	 *
	 * @type {Number}
	 */
	dataSrc: 0,

	/**
	 * Editor instance that will be used to perform the update
	 *
	 * @type {DataTable.Editor}
	 */
	editor: null,

	/**
	 * Enable / disable RowReorder's user interaction
	 * @type {Boolean}
	 */
	enable: true,

	/**
	 * Form options to pass to Editor when submitting a change in the row order.
	 * See the Editor `from-options` object for details of the options
	 * available.
	 * @type {Object}
	 */
	formOptions: {},

	/**
	 * Drag handle selector. This defines the element that when dragged will
	 * reorder a row.
	 *
	 * @type {String}
	 */
	selector: 'td:first-child',

	/**
	 * Optionally lock the dragged row's x-position. This can be `true` to
	 * fix the position match the host table's, `false` to allow free movement
	 * of the row, or a number to define an offset from the host table.
	 *
	 * @type {Boolean|number}
	 */
	snapX: false,

	/**
	 * Update the table's data on drop
	 *
	 * @type {Boolean}
	 */
	update: true,

	/**
	 * Selector for children of the drag handle selector that mouseDown events
	 * will be passed through to and drag will not activate
	 *
	 * @type {String}
	 */
	excludedChildren: 'a'
};


/*
 * API
 */
var Api = $.fn.dataTable.Api;

// Doesn't do anything - work around for a bug in DT... Not documented
Api.register( 'rowReorder()', function () {
	return this;
} );

Api.register( 'rowReorder.enable()', function ( toggle ) {
	if ( toggle === undefined ) {
		toggle = true;
	}

	return this.iterator( 'table', function ( ctx ) {
		if ( ctx.rowreorder ) {
			ctx.rowreorder.c.enable = toggle;
		}
	} );
} );

Api.register( 'rowReorder.disable()', function () {
	return this.iterator( 'table', function ( ctx ) {
		if ( ctx.rowreorder ) {
			ctx.rowreorder.c.enable = false;
		}
	} );
} );


/**
 * Version information
 *
 * @name RowReorder.version
 * @static
 */
RowReorder.version = '1.2.6';


$.fn.dataTable.RowReorder = RowReorder;
$.fn.DataTable.RowReorder = RowReorder;

// Attach a listener to the document which listens for DataTables initialisation
// events so we can automatically initialise
$(document).on( 'init.dt.dtr', function (e, settings, json) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var init = settings.oInit.rowReorder;
	var defaults = DataTable.defaults.rowReorder;

	if ( init || defaults ) {
		var opts = $.extend( {}, init, defaults );

		if ( init !== false ) {
			new RowReorder( settings, opts  );
		}
	}
} );


return RowReorder;
}));
