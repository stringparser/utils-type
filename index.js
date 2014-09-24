
exports = module.exports = type;

function type(what){

  var leType = { };
  var ctorName, super_;
  if( what === null || what === void 0 ) {
    leType[''+what] = true;
    return leType;
  }

  ctorName = (what.constructor.name || null);
  if( ctorName === null || ctorName === 'Object' ){
    ctorName = ({}).toString.call(what).match(/\w+/g)[1];
  }

  if( what === Object(what) ){

    leType.object = true;
    super_ = what.constructor.super_;

    while(super_){ // util.inherits pattern
      leType[ super_.name.toLowerCase() ] = true;
      super_ = super_.constructor.super_;
    }

    var types = Object.keys(leType);
    if( types.length > 1){
      leType.types = types.join('|');
    } else {
      leType.anObject = true;
    }
  }

  ctorName = ctorName.toLowerCase();

  if( what ){
    leType[ctorName] = what;
  } else {
    leType[ctorName] = ''+what;
  }

  if( !leType[ctorName] ){
    leType[ctorName] = true;
    leType.empty = true;
  }

  if(!leType.string){}
  else if( !what.trim() ){
    leType.empty = true;
  }

  if(!leType.number){}
  else if( what !== what ){
    leType.nan = true;
  } else if( what === Infinity ){
    leType.infinity = true;
  } else if( parseInt(what+'') === what ){
    leType.integer = what;
  } else {
    leType.float = what;
  }

  if(!leType.boolean){}
  else if( what === true ){
    leType.true = true;
  } else if( what === false ){
    leType.false = true;
  }

  return leType;
}
