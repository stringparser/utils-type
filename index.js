'use strict';

var util = require('./lib/util');
var primitives = /undefined|null|string|number|boolean|symbol/;

var proto = Object.create(null);
Object.defineProperty(proto, 'match', {
  value: function match(pattern){
    if(!pattern || !pattern.source){ return null; }
    var types = Object.keys(this);
    if(RegExp(pattern.source).test(types)){
      return this[types[0]] || true;
    }
    return null;
  }
});

function type(src){
  var strRep;

  var self = Object.create(proto);
  var className = util.getClassName(src);
  self[className] = src || Boolean(strRep = src + '') || ' ';

  if(primitives.test(className)){
    if(self.number){
      strRep = strRep || src.toString(10);
      if(parseInt(strRep) === src){
        self.integer = src;
      } else if(/\./.test(strRep)){
        self.float = src;
      } else if(src){
        self.infinity = src;
      } else {
        self.nan = true;
        delete self.number;
      }
    }
    return self;
  }

  // everything else is an object
  self.object = src;

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

exports = module.exports = type;
