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
type( Infinity );        // -> { infinity: true }
type( undefined );       // -> { undefined: true }
type( 'a string');       // -> { string: 'a string' }
type( /a regex/ );       // -> { object: true, regexp: /a regex/ } }
type( function(){ } );   // -> { object: true, function: [Function] }
type({ type : 'toy' });  // -> { object: { type: 'toy' } }
type( new Date() );      // -> { object: true,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
type( new Error() );     // -> { object: true, error: [Error] }

// and more!
type( new Stream() );
// -> { object: true, eventemitter: true, stream: { domain: null, _events: {}, _maxListeners: 10 } }
type( new EventEmitter() );
// -> { object: true, eventemitter: { domain: null, _events: {}, _maxListeners: 10 } }
```

#### composition

The function returns an object. The type mached by `what` type returns itself. That is:

```js
type(1).number      // -> 1 (that is truthy)
type([1,2,3]).array // -> [1,2,3] (truthy)
type(type([1,2,3]).array[1]).number // -> 1 (truthy)
```

#### falsy values maintain the value if makes sense

```js
var arr = [false, 0, NaN, '', null, undefined];
type(type(arr).array[0]).boolean    // -> true
type(type(arr).array[1]).number     // -> 0
type(type(arr).array[2]).number     // -> undefined
type(type(arr).array[3]).string     // -> ' '
type(type(arr).array[5]).undefined  // -> true
type(type(arr).array[4]).null       // -> true
```

Why:
- `NaN` is not a number
- `false` is a boolean, returning it will be misleading
- `0` is a number yes, but if is changed to true you can't add to it afterwards
- `the empty string` is changed to an space so is truthy and operations can be made on it
- `null` and `undefined` are self explanatory

## install

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
