[![build][badge-build]][x-travis][![NPM version][badge-version]][x-npm]

[documentation](#documentation) -
[install](#install) -
[todo](#todo)

#### simple

```js
var type = require('utils-type');

type( 42 );              // -> { number: 42 }
type( NaN );             // -> { nan: true }
type( null );            // -> { null: true }
type( true );            // -> { boolean: true }
type( false );           // -> { boolean: true }
type( Infinity );        // -> { infinity: Infinity }
type( undefined );       // -> { undefined: true }
type( 'a string');       // -> { string: 'a string' }
type( /a regex/ );       // -> { object: /a regex/, regexp: /a regex/ } }
type( function(){ } );   // -> { object: [Function], function: [Function] }
type({ type : 'toy' });  // -> { object: { type: 'toy' } }
type( new Date() );      // -> { object: Mon Sep 08 2014 19:10:32,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
type( new Error() );     // -> { object: [Error], error: [Error] }
type( new Stream() ); // ->
// {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   stream: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
type( new EventEmitter() ); // ->
// {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
```
#### one to many

```js
type(function one(){}).match(/function|object/);
// => [Function: one]
```

#### composition

The function returns an object. The type matched by `that` type returns itself. That is:

```js
type(1).number      // -> 1 (that is truthy)
type([1,2,3]).array // -> [1,2,3] (truthy)
type(type([1,2,3]).array[1]).number // -> 1 (truthy)
```

### comprehensive

```js
type(0).number             // -> true
type(0).integer            // -> 0
type(0.4).number           // -> 0.4
type(0.4).float            // -> 0.4
```

### falsy values maintain the value if it makes sense

```js
type(0).number             // -> true
type(0).integer            // -> 0
type('').string            // -> ' '
type(null).null            // -> true
type(NaN).number           // -> undefined
type(false).boolean        // -> true
type(undefined).undefined  // -> true
```

Why:
- `NaN` is not a number
- `false` is a boolean, returning it will be misleading
- `0` is a number yes, but for `integer` its value its maintained
- `the empty string` is changed to an space so is truthy and operations can be made on it
- `null` and `undefined` are self explanatory

# documentation

The `module.exports` a function

```js
var type = require('utils-type');
```

that takes only one argument

### type
```js
function type(argument)
```

_arguments_
 - `argument` type any

_returns_
 - an object with as many enumerable properties as types the argument has

### type(argument).match
```js
function type(argument).match(object RegExp)
```

The object returned has a non enumerable `match` method giving a one to many relationship.

_arguments_
 - a regular expression

_returns_
 - the value of the given type if truthy
 - `true` if the value is `null`, `undefined` or `0`
 - `space` for the empty string (which is falsy)

Useful for checks that are not so strict
```js
var items = type([1,2,3]);

// so you can do this
items.match(/object|array/)
// => {object:[1,2,3], array:[1,2,3]}

// instead of this
if(items.array || items.object){
  // do something
}
```

The method is _not_ enumerable so all the types can be obtained in a very simple manner

```js
var items = type([1,2,3]);
Object.keys(items); // =>
// ['object', 'array']
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
