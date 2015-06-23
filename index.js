'use strict';

var util = require('./lib/util');
var primitives = /undefined|null|string|number|boolean|symbol/;

function Type(src){
  if(!(this instanceof Type)){
    return new Type(src);
  }

  var strRep, classType = util.getClassType(src);
  this[classType] = src || Boolean(src + '') || ' ';
  // primitives
  if(primitives.test(classType)) {
    if(this.number){
      strRep = src + '';
      if(parseInt(strRep) === src){
        this.integer = src;
      } else if(/\./.test(strRep)){
        this.float = src;
      } else if(src){
        this.infinity = src;
      } else {
        this.nan = true;
        delete this.number;
      }
    }
    return this;
  }

  // everything else is an object
  var ctorName = (src.constructor.name || '').toLowerCase();
  if(!this.object){
    this.object = src;
  } else if (classType !== ctorName) {
    this[ctorName] = src;
  } else {
    this.plainObject = src;
    return this;
  }

  // exploit the util.inherits pattern
  var super_ = src.constructor.super_;
  while(super_){
    this[super_.name.toLowerCase()] = src;
    super_ = super_.super_;
  }

  return this;
}

Type.prototype.match = function(pattern){
  var types = Object.keys(this);
  var source = this[types[0]];
  if(RegExp(pattern).test(types.join(' '))){
    return source || Boolean(source + '') || ' ';
  }
  return null;
};

exports = module.exports = Type;
