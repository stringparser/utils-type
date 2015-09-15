'use strict';

var __toString = ({}).toString;

exports = module.exports = {};

// get class of the constructor if any
//
exports.getClassName = function(src){
  return __toString.call(src).match(/\w+/g)[1].toLowerCase();
};
