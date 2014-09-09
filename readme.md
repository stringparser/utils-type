#

[<img alt="npm downloads" src="http://img.shields.io/npm/dm/utils-type.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/utils-type.svg)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-type.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-type)
[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-type/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/utils-type/builds)
[<img alt="build" src="http://img.shields.io/badge/node-%3E=0.6-green.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/utils-type/builds/34802928)

## utils-type
> a posteriory simple type checking for `js` [<img alt="progressed.io" src="http://progressed.io/bar/65" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

Heavily inspired by api design of [ianstorm's `is`](https://github.com/ianstormtaylor/is).

**Implementation state** : missing browser tests.

## install

    $ npm install utils-type

### usage

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
// -> { boolean: true }
is( false );
 // -> { boolean: 'false' }
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
is( new Date() );
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

### composing

The function returns an object. The type mached by `what` type returns itself. That is:

```js
is(1).number
// -> 1 (that is truthy)
is([1,2,3]).array
// -> [1,2,3] (truthy)
is([1,2,3])
// -> { object : true, array : [1,2,3] }
```
so its very easy to compose
```js
is(is([1,2,3]).array[1]).number
// -> 1 (truthy)
```

and continue as much as possible
```js
is(
  is(
    is([1,Infinity,3]).array[1] ).number ).Infinity
```

Something I don't know if I should change is how falsy values are handled (`false`, `0` or `NaN`). At the moment they are concatenated with a `string` so they become truthy. Though this might have some drawbacks I will have to investigate.

```js
var arr = [false,0,NaN];

is(is(arr).array[0]).boolean
// -> 'false'       (truthy)
is(is(arr).array[1]).number
// -> '0'           (truthy)
is(is(arr).array[1]).object
// -> undefined     (nope)
is(is(arr).array[2]).number
// 'NaN'     (truthy)
```

### test

    $ make test
    or
    $ npm test

### todo

 - [ ] Make browser tests
 - [X] Make more server tests (included `stream`, `event emitter`)
 - [X] Provide a map so to rename `types`. Either because:
   * You like things your way, sorter, different prop names.
   * It seems to be an issue for some environments to have a `function` property.
 - [ ] Maybe chain everything ?
   * that is `is([1,2,3]).array[1].number > 0`
   * instead of what's the case now `is(is([1,2,3]).array[1]).number > 0`   

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-type.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
