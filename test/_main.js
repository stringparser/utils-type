'use strict';

var type = require('../.');
var should = require('should');
var server = { };
    server.testSuite = require('./types/server');

describe('utils-type:server', function(){

  var types = server.testSuite.types;
  describe('type(value) should have property {typeName} returning (value || true)', function(){
    types.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
        it('type('+value+') to have property {'+typeChecks.join('}, {')+'}', function(){
          typeChecks.forEach(function(typeName, index){
            if( typeName === 'integer' ){
              should(type(value))
                .have.property(typeName, value);
            } else {
              should(type(value))
              .have.property(typeName,
                index > 1
                  ? Boolean(value)
                  : value || Boolean(value+'') || ' '
              );
            }
          });
        });
      });
    });
  });

  describe('should type(value).match(/name/) = value || true (for NaN)',
    function(){
    types.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
        it('should type('+value+').match(/'+typeChecks.join('|')+'/g) = '+value,
          function(){
          var re = new RegExp(typeChecks.join('|'),'g');
          if( !Number.isNaN(value) ){
            should(type(value).match(re))
              .be.eql(value);
          } else {
            should(type(value).match(re)).be.eql(true);
          }
        });
      });
    });
  });

  var checks = server.testSuite.checks;
  describe('\nExcluding its type(s), NOT to be \n {'+checks.join('}, {')+'}',
    function(){
    server.testSuite.types.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
        it('type('+value+') NOT be anything but {'+typeChecks.join('}, {')+'}',
          function(){
          checks.forEach(function(typeName){
            if( typeChecks.indexOf(typeName) > -1 ){ return ; }
            should(type(value)).not.have.property(typeName);
          });
        });
      });
    });
  });

  describe('type.match should return null for no match', function(){
    server.testSuite.types.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
          checks.filter(function(typeName){
            if( typeChecks.indexOf(typeName) > -1 ){ return ; }
            it('type('+value+').match(/'+typeName+'/) should === null',
              function(){
                should(type(value).match(typeName)).be.eql(null);
              });
        });
      });
    });
  });
});
