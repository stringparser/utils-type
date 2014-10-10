'use strict';

var _ = { isPlainObject : require('lodash.isplainobject') };

exports = module.exports = type;

function type(what){

  var leType = { types : getCtorName(what) };
  var strRep = what + '';
  leType[leType.types] = what || !!strRep || ' ';

  // pritives and arguments
  if( (/undefined|null|string|number|boolean|arguments|symbol/).test(leType.types) ) {
    if( leType.arguments ){
      leType.object = what;
      leType.types = 'object '+leType.types;
    } else if( leType.number ){
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

  var name, super_ = what.constructor.super_;
  while(super_){ // util.inherits pattern
    name = super_.name.toLowerCase();
    leType[name] = true;
    leType.types += ' '+name;
    super_ = super_.constructor.super_;
  }
  name = super_ = null;

  return leType;
}

var __ = ({ });
var __toString = __.toString;

function getCtorName(thing){

  if( thing === void 0 || thing === null ){
    return thing+'';
  }

  var ctorName = thing.constructor.name;
  if( ctorName === 'Object' || !ctorName ){
    return __toString.call(thing)
      .match(/\w+/g)[1].toLowerCase();
  }
  return ctorName.toLowerCase();
}
exports.getCtorName = getCtorName;
