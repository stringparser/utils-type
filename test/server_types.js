
var Stream = require('stream');
var EventEmitter = require('events').EventEmitter;

module.exports = (function(){
  return ([
    {         null : null                 },
    {    undefined : undefined            },
    {      boolean : true                 },
    {      boolean : false                },
    {       number : 0                    },
    {       number : 1                    },
    {       number : 1.5                  },
    {       object : { yep : 'yep' }      },
    {    arguments : arguments            },
    {     function : function(){}         },
    {        error : new Error()          },
    {       regexp : new RegExp()         },
    {       string : 'a string'           },
    {       number : Math.E               },
    {        array : [1,2]                },
    {         date : new Date()           },
    {         math : Math                 },
    {       stream : new Stream()         },
    { eventemitter : new EventEmitter()   }
  ]);
})();
