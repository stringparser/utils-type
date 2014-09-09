
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
      label = typeLabel(super_.name) || super_.name.toLowerCase();
      leType[ label ] = true;
      super_ = super_.constructor.super_;
    }
  }

  ctorName = ctorName.toLowerCase();
  ctorName = typeLabel(ctorName) || ctorName;

  if(what) leType[ctorName] = what;
  else     leType[ctorName] = ''+what;

  if(leType.object)
    return leType;

  if(!leType.number){}
  else if( what !== what )
    leType.nan = true;
  else if( what === Infinity )
    leType.infinity = true;

  return leType;
}

/*
 * No labels by default
 * No labels in test environment
 */

var labels = { };
function typeLabel(key, value){

  if(process.env.NODE_ENV !== 'test')
    return value ? labels[key] = value : labels[key];
  else
    return void 0;
}
