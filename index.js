'use strict';

var __toString = ({}).toString;
var primitive = /undefined|null|string|number|boolean|symbol/;

function type(_src){

  var src = _src;
  // keep a clean reference so it can be reasigned
  var strRep, leType = { };
  var types = __toString.call(_src).match(/\w+/g)[1].toLowerCase();

  leType[types] = src || Boolean(strRep = src+'') || ' ';
  leType.match  = function typeMatch(re){
    return (new RegExp(re)).test(types) ? src : null;
  };

  // primitives
  if( (primitive).test(types) ) {
    if( leType.number ){
      strRep = strRep || src+'';
      if( parseInt(strRep) === src ){
        types += ' integer';
        leType.integer = src;
      } else if ( (/\./g).test(strRep) ){
        types += ' float';
        leType.float = src;
      } else if( src !== src ){
        types += ' nan';
        leType.nan = true;
        delete leType.number;
      } else if( src === Infinity ){
        leType.infinity = src;
        types += ' infinity';
      }
    }
    strRep = ctorName = super_ = null; // clean up
    return leType;
  }

  // everything else is an object
  var ctorName = (_src.constructor.name || '').toLowerCase() || types;
  if ( !leType.object ) {
    leType.object = src;
    types = 'object ' + types;
  } else if( !ctorName.match(types) ){
    leType[ctorName] = src;
    types += ' ' + ctorName;
  } else {
    leType.plainObject = src;
    types = 'object plainObject';
    strRep = ctorName = super_ = null; // clean up
    return leType;
  }

  var super_ = _src.constructor.super_;
  while(super_){ // inheritance pattern
    ctorName = super_.name.toLowerCase();
    leType[ctorName] = src;
    types += ' ' + ctorName;
    super_ = super_.constructor.super_;
  }
  strRep = ctorName = super_ = null; // clean up
  return leType;
}
module.exports = type;
