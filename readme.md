## utils-type
[![build][badge-build]][x-travis][![NPM version][badge-version]][x-npm]

[documentation](#documentation) -
[install](#install) -
[todo](#todo)

#### simple

```js
var Type = require('utils-type');

Type( 42 );              // -> { number: 42 }
Type( NaN );             // -> { nan: true }
Type( null );            // -> { null: true }
Type( true );            // -> { boolean: true }
Type( false );           // -> { boolean: true }
Type( Infinity );        // -> { infinity: Infinity }
Type( undefined );       // -> { undefined: true }
Type( 'a string');       // -> { string: 'a string' }
Type( /a regex/ );       // -> { object: /a regex/, regexp: /a regex/ } }
Type( function(){ } );   // -> { object: [Function], function: [Function] }
Type({ type : 'toy' });  // -> { object: { type: 'toy' } }
Type( new Date() );      // -> { object: Mon Sep 08 2014 19:10:32,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
Type( new Error() );     // -> { object: [Error], error: [Error] }
Type( new Stream() ); // ->
// {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   stream: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
Type( new EventEmitter() ); // ->
// {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
```
#### one to many

```js
Type(function one(){}).match(/function|object/);
// => [Function: one]
```

#### composition

The function returns an object. The type matched by `that` type returns itself. That is:

```js
Type(1).number                      // -> 1 (that is truthy)
Type([1,2,3]).array                 // -> [1,2,3] (truthy)
Type(Type([1,2,3]).array[1]).number // -> 1 (truthy)
```

#### comprehensive

```js
Type(-1).number            // -> -1
Type(-1).integer           // -> -1
Type(NaN).nan              // -> true
Type(0.4).float            // -> 0.4
Type(Infinity).infinity    // -> Infinity
```

#### falsy values maintain the value if it makes sense

```js
Type(0).number             // -> true
Type(0).integer            // -> 0
Type('').string            // -> ' '
Type(null).null            // -> true
Type(NaN).number           // -> undefined
Type(false).boolean        // -> true
Type(undefined).undefined  // -> true
```

Why:
- `NaN` is not a number
- `false` is a boolean, returning it will be misleading
- `0` is a number, but for `integer` its value its maintained
- `the empty string` is changed to an space so is truthy and operations can be made on it
- `null` and `undefined` are self explanatory

<br>
---
### Documentation

The `module.exports` a constructor function

```js
var Type = require('utils-type');
```

that takes one argument.

### Type
```js
function Type(value)
```

_arguments_
 - `value` type any, from where types will be obtained

_returns_
 - object with as many properties as types the argument has

```js
var Type = require('utils-type');
var items = Type([1,2,3]);
Object.keys(items); // =>
// ['object', 'array']
```

### type.match
```js
function Type(value).match(RegExp pattern)
```

The constructor prototype has an additional method to
check types through a regular expression.

_arguments_
 - `value` type any, from where types will be obtained
 - `pattern` type regexp, regular expression to match types to

_returns_
 - null if `value` types did not match the given `pattern`
 - `value`, true or space if the types of `value` matched `pattern`
  - `value` when `value` is truthy
  - true when `value` is null, NaN, 0, undefined or the empty string

Always returing `truthy` when there was a match.

Useful for checks that are not so strict.

```js
var Type = require('utils-type');
var items = Type([1,2,3]);

// so you can do this
if(items.match(/object|array/)){
  // do something
}

// instead of this
if(items.array || items.object){
  // do something
}
```

### install

With [npm][x-npm]

    $ npm install utils-type

### test

    $ npm test

### todo

 - [ ] Include browser tests

### license

![LICENSE](http://img.shields.io/npm/l/utils-type.svg?style=flat-square)

[x-npm]: https://npmjs.org/package/utils-type
[x-travis]: https://travis-ci.org/stringparser/utils-type/builds
[badge-build]: http://img.shields.io/travis/stringparser/utils-type/master.svg?style=flat-square
[badge-version]: http://img.shields.io/npm/v/utils-type.svg?style=flat-square
