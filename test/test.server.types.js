var is = require('../.');
var types = require('./server_types');
var assert = require('assert');
var bdd = require('./bdd');

var describe = bdd.describe;
var it = bdd.it;

describe('utils-type', function(){

  types.forEach(function(typeUnit){

    var type = Object.keys(typeUnit)[0];

    it(typeUnit[type]+' should be "'+type+'"', function(){
      assert( is(typeUnit[type])[type] );
    });
  });

  it('NaN should be a `number` and have nan property"', function(){
    var type = is(NaN);
    assert( type.number && type.nan );
  });

  it('Infinity should be a `number` and have infinity property', function(){
    var type = is(Infinity);
    assert( type.number && type.infinity );
  });

});
