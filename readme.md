# utils-type [![NPM version][badge-version]][x-npm]

[documentation](#documentation) -
[install](#install) -
[notes](#notes) -
[todo](#todo)

[![build][badge-build]][x-travis]

#### simple

```js
var type = require('utils-type');

type(42);              // -> { number: 42 }
type(NaN);             // -> { nan: true }
type(null);            // -> { null: true }
type(true);            // -> { boolean: true }
type(false);           // -> { boolean: true }
type(Infinity);        // -> { infinity: Infinity }
type(undefined);       // -> { undefined: true }
type('a string');       // -> { string: 'a string' }
type(/a regex/);       // -> { object: /a regex/, regexp: /a regex/ } }
type(function(){ });   // -> { object: [Function], function: [Function] }
type({ type : 'toy' });  // -> { object: { type: 'toy' } }
type(new Date());      // -> { object: Mon Sep 08 2014 19:10:32,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
type(new Error());     // -> { object: [Error], error: [Error] }
type(new Stream());
// -> {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   stream: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
```

#### composition

The function returns an object. The type matched by `that` type returns itself.

```js
type(1).number                      // -> 1 (that is truthy)
type([1,2,3]).array                 // -> [1,2,3] (truthy)
type(type([1,2,3]).array[1]).number // -> 1 (truthy)
```

#### comprehensive

```js
type(-1).number            // -> -1
type(-1).integer           // -> -1
type(NaN).nan              // -> true
type(0.4).float            // -> 0.4
type(Infinity).infinity    // -> Infinity
type(new EventEmitter())
// -> {
//   object: { domain: null, _events: {}, _maxListeners: 10 },
//   eventemitter: { domain: null, _events: {}, _maxListeners: 10 }
// }
```

#### `falsy` values maintain the value if it makes sense

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
- `0` is a number, but for `integer` its value its maintained
- `the empty string` is changed to an space so is truthy and operations can be made on it
- `null` and `undefined` are self explanatory

<br>
---
### Documentation

The `module.exports` a function

```js
var type = require('utils-type');
```

that takes one argument.

### type
```js
function type(value)
```

_arguments_
 - `value` type any, from where types will be obtained

_returns_
 - object with as many properties as types the argument has

```js
var type = require('utils-type');
var items = type([1,2,3]);
Object.keys(items); // =>
// ['object', 'array']
```

### install

With [npm][x-npm]

    $ npm install utils-type

### test

    $ npm test

### notes

The module uses `Objec.create` in order to not produce false positives when checking properties on the returned object. So it basically needs support for object create. Polyfill it, for more info:

[http://kangax.github.io/compat-table/es5/](http://kangax.github.io/compat-table/es5/)

### todo

 - [ ] Include browser tests

### license

![LICENSE](http://img.shields.io/npm/l/utils-type.svg?style=flat-square)

[x-npm]: https://npmjs.org/package/utils-type
[x-travis]: https://travis-ci.org/stringparser/utils-type/builds
[badge-build]: https://travis-ci.org/stringparser/utils-type.svg?branch=master
[badge-version]: http://img.shields.io/npm/v/utils-type.svg?style=flat-square
