var is = require('../.');
var types = require('./server_types');
var assert = require('assert');
var bdd = require('./bdd');

var describe = bdd.describe;
var it = bdd.it;

describe('utils-type server', function(){

  types.forEach(function(typeUnit){

    var typeList = typeUnit.what;
    var typeName = typeUnit.type;

    typeName.forEach(function(type){

      if(!Array.isArray(typeList)){

        it(typeList, ' should be {'+type+'}', function(){
          assert( is(typeList)[type] );
        });

      } else {

        typeList.forEach(function(typeWhat){

          it(typeWhat, ' should be {'+type+'}', function(){
            assert( is(typeWhat)[type] );
          });

        });
      }

    });
  });

  it('[NaN] should be a {number} and have "nan" property', function(){
    var type = is(NaN);
    assert( type.number && type.nan );
  });

  it('[Infinity] should be a {number} and have "infinity" property', function(){
    var type = is(Infinity);
    assert( type.number && type.infinity );
  });

});
