# utils-type[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-type.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-type)

A posteriory, constructor-based, simple type checking for `JS`.

Heavily inspired by api design of [ianstorm's `is`](https://github.com/ianstormtaylor/is).

Implementation state : missing browser tests.

## install

    $ npm install utils-type

# usage

```js
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
```

## Composing

```js

var arr = [1,/heythere/,3];

is(is(arr).array[0]).number
// -> 1           (truthy)
is(is(arr).array[1]).regexp
// -> /heythere/  (truthy)
is(is(arr).array[2]).object
// -> undefined   (number is not an object, just because the prop is not defined on the returned object)
var check = is(arr);

var grab = check.array[4] || check.array[3] || type[2] > 1
```

## *a posteriory what*? => Why

`is[ConstructorName](var)` -> priori. You know what you have to check and you do so.
`is(var)` -> posteriory. You dismiss edge cases (`null` and `undefined`) and write what you can find out of the type.

Give `var` and get `WTF` is that thing.

# todo

 - [ ] Make browser tests
 - [ ] Make more server tests
 - [ ] Provide a map to rename `type`/`instances` names as properties since it seems to be an issue for some environments.

# license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-type.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
