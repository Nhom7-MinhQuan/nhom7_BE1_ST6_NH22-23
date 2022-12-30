tProber.apply(this);

    var FREQ_CAT_NUM = 4;
    var CLASS_NUM = 8; // total classes
    var self = this;

    function init() {
        self.reset();
    }

    this.reset = function() {
        this._mLastCharClass = OTH;
        this._mFreqCounter = [];
        for( var i = 0; i < FREQ_CAT_NUM; this._mFreqCounter[i++] = 0 );
        Latin1Prober.prototype.reset.apply(this);
    }

    this.getCharsetName = function() {
        return "windows-1252";
    }

    this.feed = function(aBuf) {
        aBuf = this.filterWithEnglishLetters(aBuf);
        for( var i = 0; i < aBuf.length; i++ ) {
            var c = aBuf.charCodeAt(i);
            var charClass = Latin1_CharToClass[c];
            var freq = Latin1ClassModel[(this._mLastCharClass * CLASS_NUM) + charClass];
            if( freq == 0 ) {
                this._mState = Constants.notMe;
                break;
            }
            this._mFreqCounter[freq]++;
            this._mLastCharClass = charClass;
        }

        return this.getState();
    }

    this.getConfidence = function() {
        var confidence;
        var constants;

        if( this.getState() == Constants.notMe ) {
            return 0.01;
        }

        var total = 0;
        for( var i = 0; i < this._mFreqCounter.length; i++ ) {
            total += this._mFreqCounter[i];
        }
        if( total < 0.01 ) {
            constants = 0.0;
        } else {
            confidence = (this._mFreqCounter[3] / total) - (this._mFreqCounter[1] * 20 / total);
        }
        if( confidence < 0 ) {
            confidence = 0.0;
        }
        // lower the confidence of latin1 so that other more accurate detector
        // can take priority.
        //
        // antonio.afonso: need to change this otherwise languages like pt, es, fr using latin1 will never be detected.
        confidence = confidence * 0.95;
        return confidence;
    }

    init();
}
Latin1Prober.prototype = new CharSetProber();

module.exports = Latin1Prober
// By default, do nothing
exports.log = function () {};

exports.setLogger = function setLogger(loggerFunction) {
  exports.enabled = true;
  exports.log = loggerFunction;
};
/*
 * The Original Code is Mozilla Universal charset detector code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2001
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   António Afonso (antonio.afonso gmail.com) - port to JavaScript
 *   Mark Pilgrim - port to Python
 *   Shy Shalom - original C code
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

var CharSetProber = require('./charsetprober');
var constants = require('./constants');
var logger = require('./logger');

 function MultiByteCharSetProber() {
    CharSetProber.apply(this);

    var self = this;

    function init() {
        self._mDistributionAnalyzer = null;
        self._mCodingSM = null;
        //self._mLastChar = ["\x00", "\x00"];
        self._mLastChar = "\x00\x00";
    }

    this.reset = function() {
        MultiByteCharSetProber.prototype.reset.apply(this);
        if( this._mCodingSM ) {
            this._mCodingSM.reset();
        }
        if( this._mDistributionAnalyzer ) {
            this._mDistributionAnalyzer.reset();
        }
        //this._mLastChar = ["\x00", "\x00"];
        this._mLastChar = "\x00\x00";
    }

    this.getCharsetName = function() {
    }

    this.feed = function(aBuf) {
        var aLen = aBuf.length;
        for( var i = 0; i < aLen; i++ ) {
            var codingState = this._mCodingSM.nextState(aBuf[i]);
            if( codingState == constants.error ) {
                logger.log(this.getCharsetName() + " prober hit error at byte " + i + "\n");
                this._mState = constants.notMe;
                break;
            } else if( codingState == constants.itsMe ) {
                this._mState = constants.foundIt;
                break;
            } else if( codingState == constants.start ) {
                var charLen = this._mCodingSM.getCurrentCharLen();
                if( i == 0 ) {
                    this._mLastChar[1] = aBuf[0];
                    this._mDistributionAnalyzer.feed(this._mLastChar, charLen);
                } else {
                    this._mDistributionAnalyzer.feed(aBuf.slice(i-1,i+1), charLen);
                }
            }
        }

        this._mLastChar[0] = aBuf[aLen - 1];

        if( this.getState() == constants.detecting ) {
            if( this._mDistributionAnalyzer.gotEnoughData() &&
                this.getConfidence() > constants.SHORTCUT_THRESHOLD ) {
                this._mState = constants.foundIt;
            }
        }

        return this.getState();
    }

    this.getConfidence = function() {
        return this._mDistributionAnalyzer.getConfidence();
    }
}
MultiByteCharSetProber.prototype = new CharSetProber();

module.exports = MultiByteCharSetProber
/*
 * The Original Code is Mozilla Universal charset detector code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2001
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   António Afonso (antonio.afonso gmail.com) - port to JavaScript
 *   Mark Pilgrim - port to Python
 *   Shy Shalom - original C code
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

var CharSetGroupProber = require('./charsetgroupprober');
var Big5Prober = require('./big5prober');
var UTF8Prober = require('./utf8prober');
var SJISProber = require('./sjisprober');
var EUCJPProber = require('./eucjpprober');
var GB2312Prober = require('./gb2312prober');
var EUCKRProber = require('./euckrprober');
var EUCTWProber = require('./euctwprober');

function MBCSGroupProber() {
    CharSetGroupProber.apply(this);
    this._mProbers = [
        new UTF8Prober(),
        new SJISProber(),
        new EUCJPProber(),
        new GB2312Prober(),
        new EUCKRProber(),
        new Big5Prober(),
        new EUCTWProber()
    ];
    this.reset();
}
MBCSGroupProber.prototype = new CharSetGroupProber();

module.exports = MBCSGroupProber
/*
 * The Original Code is Mozilla Universal charset detector code.
 *
 * The Initial Developer of the Original Code is
 * Netscape Communications Corporation.
 * Portions created by the Initial Developer are Copyright (C) 2001
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   António Afonso (antonio.afonso gmail.com) - port to JavaScript
 *   Mark Pilgrim - port to Python
 *   Shy Shalom - original C code
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

var CharSetProber = require('./charsetprober');
var constants = require('./constants');
var logger = require('./logger');

function SingleByteCharSetProber(model, reversed, nameProber) {
    CharSetProber.apply(this);

    var SAMPLE_SIZE = 64;
    var SB_ENOUGH_REL_THRESHOLD = 1024;
    var POSITIVE_SHORTCUT_THRESHOLD = 0.95;
    var NEGATIVE_SHORTCUT_THRESHOLD = 0.05;
    var SYMBOL_CAT_ORDER = 250;
    var NUMBER_OF_SEQ_CAT = 4;
    var POSITIVE_CAT = NUMBER_OF_SEQ_CAT - 1;
    //var NEGATIVE_CAT = 0;

    var self = this;

    function init(model, reversed, nameProber) {
        self._mModel = model;
        self._mReversed = reversed; // "true" if we need to reverse every pair in the model lookup
        self._mNameProber = nameProber; // Optional auxiliary prober for name decision
        self.reset();
    }

    this.reset = function() {
        SingleByteCharSetProber.prototype.reset.apply(this);
        this._mLastOrder = 255; // char order of last character
        this._mSeqCounters = [];
        for( var i = 0; i < NUMBER_OF_SEQ_CAT; this._mSeqCounters[i++] = 0 );
        this._mTotalSeqs = 0;
        this._mTotalChar = 0;
        this._mFreqChar = 0; // characters that fall in our sampling range
    }

    this.getCharsetName = function() {
        if( this._mNameProber ) {
            return this._mNameProber.getCharsetName();
        } else {
            return this._mModel.charsetName;
        }
    }

    this.feed = function(aBuf) {
        if( ! this._mModel.keepEnglishLetter ) {
            aBuf = this.filterWithoutEnglishLetters(aBuf);
        }
        var aLen = aBuf.length;
        if( !aLen ) {
            return this.getState();
        }
        for( var i = 0, c; i < aLen; i++ )
        {
            c = aBuf.charCodeAt(i);
            var order = this._mModel.charToOrderMap[c];
            if( order < SYMBOL_CAT_ORDER ) {
                this._mTotalChar++;
            }
            if( order < SAMPLE_SIZE ) {
                this._mFreqChar++;
                if( this._mLastOrder < SAMPLE_SIZE ) {
                    this._mTotalSeqs++;
                    