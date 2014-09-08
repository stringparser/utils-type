var is = require('../.');
var types = require('./server_types');
var assert = require('assert');


describe('utils-type', function(){

  types.forEach(function(typeUnit){

    typeNames = Object.keys(typeUnit);
    typeNames.forEach(function(typeName){

      console.log(is(typeUnit[typeName]), typeName);
      it('`'+JSON.stringify(typeUnit[typeName])+'` types "'+typeName+'"', function(){
        assert( is(typeUnit[typeName])[typeName] );
      });
    })

  });

});
