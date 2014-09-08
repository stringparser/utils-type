
var toString = ({}).toString;

function is(what){

  var leType = { }, ctorName, super_, stringRep;

  if( what === null || what === void 0 ) {

    leType[''+what] = true;
    return leType;

  } else
    ctorName = what.constructor.name.toLowerCase();

  if( what === Object(what) ){

    leType.object = true;
    stringRep = what.toString();

    if( stringRep[0] !== '[' )
      stringRep = toString.call(what);

    stringRep = stringRep.match(/\w+/g)[1].toLowerCase();
    leType[stringRep] = true;

    if( what.constructor.super_ ){

      super_ = what.constructor.super_;
      while(super_){
        leType[super_.name.toLowerCase()] = true;
        super_ = super_.constructor.super_;
      }
    }
  }

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

exports = module.exports = is;
