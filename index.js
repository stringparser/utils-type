
/**
 * Exports
 */
exports = module.exports = is;
exports.typeLabel = typeLabel;

/**
 * The actual function
 */
function is(what){

  var leType = { }, ctorName, super_, label;
  if( what === null || what === void 0 ) {
    leType[''+what] = true;
    return leType;
  }

  ctorName = (what.constructor.name || '');
  if( ctorName === '' || ctorName === 'Object' )
    ctorName = ({}).toString.call(what).match(/\w+/g)[1];

  if( what === Object(what) ){

    leType.object = true;
    super_ = what.constructor.super_;

    while(super_){ // util.inherits pattern
      label = super_.name.toLowerCase();
      leType[ typeLabel(label) || label ] = true;
      super_ = super_.constructor.super_;
    }
  }

  ctorName = ctorName.toLowerCase();
  ctorName = typeLabel(ctorName) || ctorName;

  if(what) leType[ctorName] = what;
  else     leType[ctorName] = ''+what || 'empty string';


  if(leType.object){

    var types = Object.keys(leType);
    if( types.length > 1)
      leType.types = types.join('|');

    return leType;
  }

  if(!leType.number){}
  else if( what !== what )
    leType.nan = true;
  else if( what === Infinity )
    leType.infinity = true;
  else if( parseInt(what+'') === what )
    leType.integer = true;
  else
    leType.float = true;

  if(!leType.boolean){}
  else if( what === true )
    leType.true = true;
  else if( what === false )
    leType.false = true;

  return leType;
}

/*
 * No labels by default
 * No labels in test_types environment
 */

var labels = { };
function typeLabel(key, value){

  if(process.env.NODE_ENV !== 'test_types')
    return value ? labels[key] = value : labels[key];
  else
    return void 0;
}
