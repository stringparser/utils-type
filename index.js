'use strict';

var _ = { };
_.isEmpty = require('lodash.isempty');
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

  if( what === void 0 || what === null ) {
    leType[leType.types] = true;
    leType.empty = true;
    leType.types += ' empty';
    return leType;
  }

  var strRep = what + ' ';
  var ctorName = leType.types;
  leType[ctorName] = what || strRep;

  // array, function, regexp, object
  if( _.isObject(what) ){
    // ^ avoids V8 bug. Got it from lodash source
    // https://github.com/lodash/lodash/blob/2.4.1/dist/lodash.compat.js#L2757-L2758
    // http://code.google.com/p/v8/issues/detail?id=2291

    leType.object = true;
    if( _.isPlainObject(what) ){
      leType.plainObject = what;
      leType.types += ' plainObject';
    }

    // isEmpty
    leType.empty = !leType.function
      ? _.isEmpty(what)
      : !what.toString('utf8')
          .replace(/[ ]+|\n/g, '')
          .match(/.*{(.*)}/)[1].trim() || false;

    if( leType.empty ){
      leType.types += ' empty';
    } else {
      delete leType.empty;
    }

    var super_ = what.constructor.super_;
    while(super_){ // util.inherits pattern
      var name = super_.name.toLowerCase();
      leType[name] = true;
      leType.types += ' '+name;
      super_ = super_.constructor.super_;
    }
    super_ = null;

    return leType;
  }

  // string, boolean, number

  if( leType.string || leType.boolean ){
    leType.empty = leType.string
      ? !what.trim() || false
      : true;
    return leType;
  }

  leType.empty = !what || false;
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
    return __toString.call(thing).match(/\w+/g)[1].toLowerCase();
  }

  var ctorName = thing.constructor.name;
  if( ctorName === 'Object' ){
    return __toString.call(thing).match(/\w+/g)[1].toLowerCase();
  }
  return ctorName.toLowerCase();
}
exports.getCtorName = getCtorName;
