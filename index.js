
/*
 *
 */

function label(){

  if(process.env.NODE_ENV !== 'test')
    return require('utils-config')({
        object : 'obj',
         array : 'arr',
      function : 'fn'
    });
  else
    return void 0;
}
exports.label = label;

/*
 *
 */

function is(what){

  var leType = { }, ctorName, super_;
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

    while(super_){ // utils.inherit pattern
      leType[super_.name.toLowerCase()] = true;
      super_ = super_.constructor.super_;
    }
  }

  ctorName = ctorName.toLowerCase();
  ctorName = label(ctorName) || ctorName;

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
