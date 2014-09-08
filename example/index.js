
var is = require('./..');
// some cool constructors over here
var Stream = require('stream');
var EventEmitter = require('events').EventEmitter;

is( 0 ) ;
// -> { number: '0' }
is( 42 );
// -> { number: 42 }
is( NaN );
// -> { number: 'NaN', nan: true }
is( null );
// -> { null: true }
is( true );
// -> { boolean: true, true: true }
is( false );
 // -> { boolean: 'false', false: true }
is( Infinity );
// -> { number: Infinity, infinity: true }
is( undefined );
// -> { undefined: true }
is( 'a string');
// -> { string: 'a string' }
is( /a regex/ );
// -> { object: true, regexp: /a regex/ }
is( [ Math.E ] );
// -> { object: true,  array: [ 2.718281828459045 ] }
is( { type : 'toy' });
// -> { object: { type: 'toy' } }
is( new Date());
// -> { object: true,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
is( new Error() );
// -> { object: true, error: [Error] }
is( new Stream() );
// -> { object: true,  eventemitter: true,  stream: { domain: null,  _events: {}, _maxListeners: 10 } }
is( new EventEmitter() );
// -> { object: true,  eventemitter: { domain: null,     _events: {},  _maxListeners: 10 } }
is( function(){ } );
// -> { object: true, function: [Function] }
