'use strict';

var type = require('../.');
var should = require('should');

var types = {
  server: require('./types/server')
};

describe('utils-type:server', function(){

  var tests = types.server.tests;
  describe('type(value) should have property {typeName}', function(){
    tests.forEach(function(typeUnit){
      var list = typeUnit.src;
      var checks = typeUnit.check;
      list.forEach(function(value){
        it('type(' + value + ') to have prop {' + checks.join('}, {') + '}',
          function(){
          checks.forEach(function(typeName, index){
            if( typeName === 'integer' ){
              should(type(value))
                .have.property(typeName, value);
            } else {
              should(type(value))
              .have.property(typeName,
                index > 1
                  ? value
                  : value || Boolean(value + '') || ' '
              );
            }
          });
        });
      });
    });
  });

  var checks = types.server.checks;
  describe('should not have other property types',
    function(){
    types.server.tests.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
        it('type('+value+') NOT be anything but {'+typeChecks.join('} or {')+'}',
          function(){
          checks.forEach(function(typeName){
            if( typeChecks.indexOf(typeName) > -1 ){ return ; }
            should(type(value)).not.have.property(typeName);
          });
        });
      });
    });
  });

  describe('should type(value).match(/name/) = value || Bolean(value+\'\') || \' \'',
    function(){
    types.server.tests.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      typeList.forEach(function(value){
        it('should type(' + value + ').match(/'+typeChecks.join('|') + '/g) = ' +
          (value || Boolean(value+'') || ' '),
          function(){
          var re = new RegExp(typeChecks.join('|'),'g');
          should(type(value).match(re)).be.eql(value || Boolean(value+'') || ' ');
        });
      });
    });
  });

  describe('type.match should return null if it doesnt match its type(s)', function(){
    types.server.tests.forEach(function(typeUnit){
      var typeList = typeUnit.src;
      var typeChecks = typeUnit.check;
      var checkNots = [];
      typeList.forEach(function(value){
        checks.filter(function(typeName){
          if( typeChecks.indexOf(typeName) > -1 ){ return; }
          checkNots.push(typeName);
        });
        var keys = Object.keys(type(value));
        it('should only type(' + value + ').match(/' + keys.join('|') + '/)',
          function(){
            should(type(value).match(checkNots.join('|'))).be.eql(null);
          });
      });
    });
  });
});
