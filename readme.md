# utils-type[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-type.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-type)

A posteriory, constructor-based, simple type checking for `javascript`.

Heavily inspired by api design of [ianstorm's `is`](https://github.com/ianstormtaylor/is) and a simple question

> Why not check the constructor's name?

## install

    $ npm install utils-type

# usage

``js
var is = require('utils-type');
is( 0 );
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
// -> { object: true, eventemitter: true, stream: { domain: null, _events: {}, _maxListeners: 10 } }
is( new EventEmitter() );
// -> { object: true, eventemitter: { domain: null, _events: {}, _maxListeners: 10 } }
is( function(){ } );
// -> { object: true, function: [Function] }
``

# todo

 - [ ] Make browser tests
 - [ ] Make more server tests
 - [ ] maybe provide a map to rename type names since it seems to be an issue on some environments

# license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-type.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
