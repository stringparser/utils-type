var is = require('../.');
var types = require('./server_types');
var assert = require('assert');


describe('utils-type', function(){

  types.forEach(function(typeUnit){

    var type = Object.keys(typeUnit)[0];

    it('`'+typeUnit[type]+'` should be "'+type+'"', function(){
      assert( is(typeUnit[type])[type] );
    });
  });

  it('`NaN` should be a `number` and "NaN"', function(){
    assert( is(NaN).number && is(NaN).nan );
  });

  it('`Infinity` should be a `number` and "Infinity"', function(){
    assert( is(Infinity).number && is(Infinity).infinity );
  });

});
