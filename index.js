'use strict';

var util = require('./lib/util');
var primitives = /undefined|null|string|number|boolean|symbol/;

function type(src){

  var that = { };
  var classType = util.getClassType(src);
  that[classType] = src || Boolean(src + '') || ' ';

  // primitives
  if(primitives.test(classType)) {
    if(that.number){
      var strRep = src + '';
      if(parseInt(strRep) === src){
        that.integer = src;
      } else if(/\./.test(strRep)){
        that.float = src;
      } else if(src){
        that.infinity = src;
      } else {
        that.nan = true;
        delete that.number;
      }
    }
    return that;
  }

  // everything else is an object
  var ctorName = (src.constructor.name || classType).toLowerCase();
  if (!that.object) {
    that.object = src;
  } else if(classType !== ctorName){
    that[ctorName] = src;
  } else {
    that.plainObject = src;
    return that;
  }

  // exploit the util.inherits pattern
  var super_ = src.constructor.super_;
  while(super_){
    that[super_.name.toLowerCase()] = src;
    super_ = super_.super_;
  }
  return that;
}

type.match = function typeMatch(src, pattern){
  var types = Object.keys(type(src));
  if(RegExp(pattern).test(types.join(' '))){
    return src || Boolean(src + '') || ' ';
  }
  return null;
};

exports = module.exports = type;
