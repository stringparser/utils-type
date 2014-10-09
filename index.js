'use strict';

var _ = { };
_.isObject = require('lodash.isobject');
_.isPlainObject = require('lodash.isplainobject');

exports = module.exports = type;

function type(what){

  var leType = {
    types : getCtorName(what),
    match : function typesMatch(re){
      return this.types.match(re) ? what : null;
    }
  };

  if( leType.match(/null|undefined|arguments/g) ) {
    leType[leType.types] = true;
    if( leType.match(/arguments/g) ){
      leType.object = true;
      leType.arguments = what;
      leType.types = 'object '+leType.types;
    }
    return leType;
  }

  var strRep = what + ' ';
  leType[leType.types] = what || strRep;

  // array, function, regexp, object
  if( _.isObject(what) ){
    // ^ avoids V8 bug. Got it from lodash source
    // https://github.com/lodash/lodash/blob/2.4.1/dist/lodash.compat.js#L2757-L2758
    // http://code.google.com/p/v8/issues/detail?id=2291
    leType.object = true;
    if( _.isPlainObject(what) ){
      leType.plainObject = what;
      leType.types += ' plainObject';
    } else {
      leType.types = 'object '+leType.types;
    }

    var name;
    var super_ = what.constructor.super_;
    while(super_){ // util.inherits pattern
      name = super_.name.toLowerCase();
      leType[name] = true;
      leType.types += ' '+name;
      super_ = super_.constructor.super_;
    }
    super_ = null;
    name = null;
    return leType;
  }

  // string, boolean, number
  if( leType.match(/string|boolean/g) ){
    return leType;
  }

  leType.number = what || true;

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

  return leType;
}

var __ = ({ });
var __toString = __.toString;

function getCtorName(thing){

  if( thing === void 0 || thing === null ){
    return __toString.call(thing)
      .match(/\w+/g)[1].toLowerCase();
  }

  var ctorName = thing.constructor.name;
  if( ctorName === 'Object' ){
    return __toString.call(thing)
      .match(/\w+/g)[1].toLowerCase();
  }
  return ctorName.toLowerCase();
}
exports.getCtorName = getCtorName;
