'use strict';

var _ = { isPlainObject : require('lodash.isplainobject') };

/**
 * exports below
 * ----------------
 * module.exports = type;
 * exports.getCtorName = getCtorName;
 */

function type(what){

  var strRep = what + '';
  var leType = { types : getCtorName(what, strRep) };
  leType[leType.types] = what || !!strRep || ' ';

  // primitives
  if( (/undefined|null|string|number|boolean|symbol/).test(leType.types) ) {
    if( leType.number ){
      leType.number = true;
      if( parseInt(strRep) === what ){
        leType.integer = what;
        leType.types += ' integer';
      } else if ( (/\./g).test(strRep) ){
        leType.float = what;
        leType.types += ' float';
      } else if( what !== what ){
        delete leType.number;
        leType.nan = true;
      } else if( what === Infinity ){
        leType.infinity = Infinity;
      }
    }
    return leType;
  }

  // everything else is an object
  leType.object = true;
  if( _.isPlainObject(what) ){
    leType.plainObject = what;
    leType.types += ' plainObject';
  } else {
    leType.types = 'object '+leType.types;
  }

  // util.inherits pattern
  if( what.constructor.super_ ){
    var name, super_ = what.constructor.super_;
    while(super_){
      name = super_.name.toLowerCase();
      leType[name] = true;
      leType.types += ' '+name;
      super_ = super_.constructor.super_;
    }
    name = super_ = null;
  }

  return leType;
}
exports = module.exports = type;

var __ = ({ });
var __toString = __.toString;

function getCtorName(thing, strRep){

  if( thing === void 0 || thing === null ){
    return strRep;
  }

  var ctorName = thing.constructor.name;
  if( ctorName === 'Object' || !ctorName ){
    return __toString.call(thing)
      .match(/\w+/g)[1].toLowerCase();
  }
  return ctorName.toLowerCase();
}
exports.getCtorName = getCtorName;
