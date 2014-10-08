
exports = module.exports = type;

function type(what){

  var leType = { };
  var ctorName, super_;
  if( what === null || what === void 0 ) {
    leType[''+what] = true;
    leType.empty = true;
    return leType;
  }

  ctorName = (what.constructor.name || null);
  if( ctorName === null || ctorName === 'Object' ){
    ctorName = ({}).toString.call(what).match(/\w+/g)[1];
  }

  ctorName = ctorName.toLowerCase();
  leType[ctorName] = what || what+' ';

  if( what === Object(what) ){

    leType.object = true;
    super_ = what.constructor.super_;

    while(super_){ // util.inherits pattern
      leType[ super_.name.toLowerCase() ] = true;
      super_ = super_.constructor.super_;
    }
  }

  var types = Object.keys(leType);
  leType.types = types.join(' ');

  leType.match = function typeMatch(re){
    return this.types.match(re);
  };

  if( leType.object && !types[1] ){
    leType.plainObject = true;
  }

  if(leType.object){
    return leType;
  }

  if( leType.string && !leType.string.trim() ){
    leType.string = ' ';
    leType.empty = true;
  }

  if( !leType.number ){ }
  else if( what !== what ){
    delete leType.number;
    leType.nan = true;
  } else if( what === Infinity ){
    leType.infinity = true;
  } else if( parseInt(what+'') === what ){
    leType.number = what || true;
    leType.integer = what;
  } else {
    leType.float = what;
  }

  if(leType.falsy && !leType.boolean){
    leType.false = true;
    leType.boolean = true;
  } else if( what === true ){
    leType.true = true;
  }

  return leType;
}
