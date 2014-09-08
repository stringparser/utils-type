
function is(what){

  var leType = { }, ctorName, super_;
  if( what === null || what === void 0 ) {
    leType[''+what] = true;
    return leType;
  }

  ctorName = what.constructor.name.toLowerCase();

  if( what === Object(what) ){

    if( ctorName === 'object' ){
      ctorName = ({}).toString.call(what).match(/\w+/g)[1].toLowerCase();
    }

    leType.object = true;
    leType[ctorName] = true;
    super_ = what.constructor.super_;

    while(super_){
      leType[super_.name.toLowerCase()] = true;
      super_ = super_.constructor.super_;
    }
  }

  // falsy values -> to string
  if(what)
    leType[ctorName] = what;
  else
    leType[ctorName] = ''+what;

  if(leType.object)
    return leType;

  if(!leType.number){}
  else if( what !== what )
    leType.nan = true;
  else if( what === Infinity )
    leType.infinity = true;

  return leType;
}

exports = module.exports = is;
