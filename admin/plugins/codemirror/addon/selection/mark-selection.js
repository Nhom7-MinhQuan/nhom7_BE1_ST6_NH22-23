df
    3,3,3,3,3,3,3,3,  // e0 - e7
    3,3,3,3,3,3,3,3,  // e8 - ef
    3,3,3,3,3,3,3,3,  // f0 - f7
    3,3,3,3,3,3,3,0   // f8 - ff
];

var BIG5_st = [
    consts.error,consts.start,consts.start,    3,consts.error,consts.error,consts.error,consts.error, //00-07
    consts.error,consts.error,consts.itsMe,consts.itsMe,consts.itsMe,consts.itsMe,consts.itsMe,consts.error, //08-0f
    consts.error,consts.start,consts.start,consts.start,consts.start,consts.start,consts.start,consts.start  //10-17
];

var Big5CharLenTable = [0, 1, 1, 2, 0];

module.exports = {
    "classTable"    : BIG5_cls,
    "classFactor"   : 5,
    "stateTable"    : BIG5_st,
    "charLenTable"  : Big5CharLenTable,
    "name"          : "Big5"
};
var consts = require('../constants');

var EUCJP_cls = [
    4,4,4,4,4,4,4,4,  // 00 - 07
    4,4,4,4,4,4,5,5,  // 08 - 0f
    4,4,4,4,4,4,4,4,  // 10 - 17
    4,4,4,5,4,4,4,4,  // 18 - 1f
    4,4,4,4,4,4,4,4,  // 20 - 27
    4,4,4,4,4,4,4,4,  // 28 - 2f
    4,4,4,4,4,4,4,4,  // 30 - 37
    4,4,4,4,4,4,4,4,  // 38 - 3f
    4,4,4,4,4,4,4,4,  // 40 - 47
    4,4,4,4,4,4,4,4,  // 48 - 4f
    4,4,4,4,4,4,4,4,  // 50 - 57
    4,4,4,4,4,4,4,4,  // 58 - 5f
    4,4,4,4,4,4,4,4,  // 60 - 67
    4,4,4,4,4,4,4,4,  // 68 - 6f
    4,4,4,4,4,4,4,4,  // 70 - 77
    4,4,4,4,4,4,4,4,  // 78 - 7f
    5,5,5,5,5,5,5,5,  // 80 - 87
    5,5,5,5,5,5,1,3,  // 88 - 8f
    5,5,5,5,5,5,5,5,  // 90 - 97
    5,5,5,5,5,5,5,5,  // 98 - 9f
    5,2,2,2,2,2,2,2,  // a0 - a7
    2,2,2,2,2,2,2,2,  // a8 - af
    2,2,2,2,2,2,2,2,  // b0 - b7
    2,2,2,2,2,2,2,2,  // b8 - bf
    2,2,2,2,2,2,2,2,  // c0 - c7
    2,2,2,2,2,2,2,2,  // c8 - cf
    2,2,2,2,2,2,2,2,  // d0 - d7
    2,2,2,2,2,2,2,2,  // d8 - df
    0,0,0,0,0,0,0,0,  // e0 - e7
    0,0,0,0,0,0,0,0,  // e8 - ef
    0,0,0,0,0,0,0,0,  // f0 - f7
    0,0,0,0,0,0,0,5   // f8 - ff
];

var EUCJP_st = [
         3,    4,    3,    5,consts.start,consts.error,consts.error,consts.error, //00-07
     consts.error,consts.error,consts.error,consts.error,consts.itsMe,consts.itsMe,consts.itsMe,consts.itsMe, //08-0f
     consts.itsMe,consts.itsMe,consts.start,consts.error,consts.start,consts.error,consts.error,consts.error, //10-17
     consts.error,consts.error,consts.start,consts.error,consts.error,consts.error,    3,consts.error, //18-1f
         3,consts.error,consts.error,consts.error,consts.start,consts.start,consts.start,consts.start  //20-27
];

var EUCJPCharLenTable = [2, 2, 2, 3, 1, 0];

module.exports = {
    "classTable"    : EUCJP_cls,
    "classFactor"   : 6,
    "stateTable"    : EUCJP_st,
    "charLenTable"  : EUCJPCharLenTable,
    "name"          : "EUC-JP"
};
var consts = require('../constants');

var EUCKR_cls  = [
    1,1,1,1,1,1,1,1,  // 00 - 07
    1,1,1,1,1,1,0,0,  // 08 - 0f
    1,1,1,1,1,1,1,1,  // 10 - 17
    1,1,1,0,1,1,1,1,  // 18 - 1f
    1,1,1,1,1,1,1,1,  // 20 - 27
    1,1,1,1,1,1,1,1,  // 28 - 2f
    1,1,1,1,1,1,1,1,  // 30 - 37
    1,1,1,1,1,1,1,1,  // 38 - 3f
    1,1,1,1,1,1,1,1,  // 40 - 47
    1,1,1,1,1,1,1,1,  // 48 - 4f
    1,1,1,1,1,1,1,1,  // 50 - 57
    1,1,1,1,1,1,1,1,  // 58 - 5f
    1,1,1,1,1,1,1,1,  // 60 - 67
    1,1,1,1,1,1,1,1,  // 68 - 6f
    1,1,1,1,1,1,1,1,  // 70 - 77
    1,1,1,1,1,1,1,1,  // 78 - 7f
    0,0,0,0,0,0,0,0,  // 80 - 87
    0,0,0,0,0,0,0,0,  // 88 - 8f
    0,0,0,0,0,0,0,0,  // 90 - 97
    0,0,0,0,0,0,0,0,  // 98 - 9f
    0,2,2,2,2,2,2,2,  // a0 - a7
    2,2,2,2,2,3,3,3,  // a8 - af
    2,2,2,2,2,2,2,2,  // b0 - b7
    2,2,2,2,2,2,2,2,  // b8 - bf
    2,2,2,2,2,2,2,2,  // c0 - c7
    2,3,2,2,2,2,2,2,  // c8 - cf
    2,2,2,2,2,2,2,2,  // d0 - d7
    2,2,2,2,2,2,2,2,  // d8 - df
    2,2,2,2,2,2,2,2,  // e0 - e7
    2,2,2,2,2,2,2,2,  // e8 - ef
    2,2,2,2,2,2,2,2,  // f0 - f7
    2,2,2,2,2,2,2,0   // f8 - ff
];

var EUCKR_st = [
    consts.error,consts.start,    3,consts.error,consts.error,consts.error