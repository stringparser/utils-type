'use strict';

var Stream = require('stream');
var EventEmitter = require('events').EventEmitter;

module.exports = (function(){
  return ([
    {
      what : null,
      type : ['null']
    },
    {
      what : undefined,
      type : ['undefined']
    },
    {
      what : [true, false],
      type : ['boolean']
    },
    {
      what : [ 0, 1, 1.5, Math.E ],
      type : ['number']
    },
    {
      what : [-3,-2,-1,1,2,3],
      type : ['number', 'integer']
    },
    {
      what : { yep : 'yep' },
      type : ['object', 'plainObject']
    },
    {
      what : arguments,
      type : ['arguments', 'object']
    },
    {
      what : [[1,2,3]],
      type : ['object', 'array']
    },
    {
      what : [function(a,b){    }],
      type : ['function', 'object']
    },
    {
      what : [new Error()],
      type : ['error', 'object']
    },
    {
      what : [new RegExp()],
      type : ['regexp', 'object']
    },
    {
      what : ['a string', '', '     '],
      type : ['string']
    },
/*    {
      what : ['', '      ', null, undefined, function(a,b){   }, 0, NaN, { }],
      type : ['empty']
    },*/
    {
      what : {},
      type : ['object', 'plainObject']
    },
    {
      what : new Date(),
      type : ['object', 'date']
    },
    {
      what : Math,
      type : ['object', 'math']
    },
    {
      what : new Stream(),
      type : ['object', 'stream', 'eventemitter']
    },
    {
      what : new EventEmitter(),
      type : ['object', 'eventemitter']
    }
  ]);
})();
