'use strict';

var util = require('./lib/util');
var primitives = /undefined|null|string|number|boolean|symbol/;

exports = module.exports = type;

var proto = Object.create(null);

function type(src){
  var strRep;

  var self = Object.create(proto);
  var className = util.getClassName(src);

  if(primitives.test(className)){
    if(className === 'number'){
      strRep = src.toString(10);
      if(parseInt(strRep) === src){
        self.integer = src;
      } else if(/\./.test(strRep)){
        self.float = src;
      } else if(src){
        self.infinity = src;
      } else {
        self.nan = true;
        return self;
      }
    }
    self[className] = src || Boolean(src + '') || ' ';
    return self;
  }

  // everything else is an object
  self[className] = self.object = src;
  var ctorName = (src.constructor.name || '').toLowerCase();

  if (className !== ctorName) {
    self[ctorName] = src;
  } else if(className === 'object'){
    self.plainObject = src;
    return self;
  }

  // util.inherits pattern
  var super_ = src.constructor.super_;

  while(super_){
    self[super_.name.toLowerCase()] = src;
    super_ = super_.super_;
  }

  return self;
}

Object.defineProperty(proto, 'match', {
  value: function match(pattern){
    if(!pattern){ return null; }
    var types = Object.keys(this);
    if(RegExp(pattern).test(types)){
      return this[types[0]] || true;
    }
    return null;
  }
});
