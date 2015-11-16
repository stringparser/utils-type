'use strict';

var util = require('./lib/util');
var primitive = /undefined|null|string|number|boolean|symbol/;

exports = module.exports = Type;

function Type(src){
  if(!(this instanceof Type)){ return new Type(src); }
  var strRep, className = util.getClassName(src);

  if(primitive.test(className)){
    if(className === 'number'){
      strRep = src + '';
      if(parseInt(strRep) === src){
        this.integer = src;
      } else if(/\./.test(strRep)){
        this.float = src;
      } else if(src){
        this.infinity = src;
      } else {
        this.nan = true;
        return this;
      }
    }
    this[className] = src || Boolean(src + '') || ' ';
    return this;
  }

  // everything else is an object
  this[className] = this.object = src;
  var ctorName = (src.constructor.name || '').toLowerCase();

  if (className !== ctorName) {
    this[ctorName] = src;
  } else if(className === 'object'){
    this.plainObject = src;
    return this;
  }

  // exploit node's util.inherits pattern
  var super_ = src.constructor.super_;
  while(super_){
    this[super_.name.toLowerCase()] = src;
    super_ = super_.super_;
  }
}

Type.prototype.match = function(pattern){
  var re = RegExp(pattern);
  for(var key in this){
    if(this.hasOwnProperty(key) && re.test(key)){
      return this[key] || true;
    }
  }
  return null;
};
