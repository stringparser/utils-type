var types = [
  arguments,
  function(){},
  [],
  true,             // remains unchanged
  new Boolean(),
  new Date(),
  new Error(),
  Math,
  1,                // remains unchanged
  {},
  /(?:)/,
  'test',
  null,
  undefined,
  NaN,
  Infinity
];

function is(what){

  var type = { };
  console.log('\n'+({}).toString.call(what))
  if( what === null || what === void 0 || what === Infinity){
    type[what] = true;
    return type;
  }

  if( what === true || what === false ){
    type.boolean = true;
    return type;
  }

  var stringRep = what.toString();
  var ctorName = what.constructor ? what.constructor.name : null;

  if( what !== what && ctorName === 'Number' ){
    type[what] = true;
  } else {

    if(stringRep[0] !== '[')
      stringRep = ({}).toString.call(what);

    stringRep = stringRep.match(/\w+/g);

    console.log('stringRep', stringRep, 'ctorName', ctorName)
    if( ctorName === stringRep[1] )
      stringRep = stringRep[0];
    else{
      ctorName = stringRep[0];
      stringRep = stringRep[1];
    }

    type[stringRep] = true;
    type[ctorName] = what;
  }

  return type;
}

types.forEach(function(typeName){

  console.log(is(typeName))
});
