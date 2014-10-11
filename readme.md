# utils-type [<img alt="progressed.io" src="http://progressed.io/bar/80" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-type/master.svg?style=flat-square" align="left"/>](https://travis-ci.org/stringparser/utils-type/builds)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-type.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-type)
<br><br>

Robust type checking.

<table>
<tr>
<td>Node Version</td>
<td>>= 0.8</td>
</tr>
</table>

**Implementation state** : missing browser tests.

## install

    $ npm install utils-type

### usage

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

### composing

The function returns an object. The type mached by `what` type returns itself. That is:

```js
type(1).number      // -> 1 (that is truthy)
type([1,2,3]).array // -> [1,2,3] (truthy)
type([1,2,3])       // -> { object : true, array : [1,2,3] }
```
making easy to compose
```js
type(type([1,2,3]).array[1]).number // -> 1 (truthy)
```

so, you know..., turtles all the way down!
```js
type(
  type(
      type([1,Infinity,3]).array[1] ).number).Infinity
```

#### falsy values

Falsy values are made true when it makes sense based on their use

```js
var arr = [false, 0, NaN, ''];   // yes, the empty string is falsy

type(type(arr).array[0]).boolean // -> true      (truthy)
type(type(arr).array[1]).number  // -> 0         (falsy)
type(type(arr).array[2]).number  // -> undefined (nope is "Not A Number")
type(type(arr).array[3]).string  // -> ' '       (truthy)
```

Why:
 - `false` is a boolean, returning it will be misleading.
 - `0` is a number yes, but if is changed to true you can't add to it after the function returns.
 - `NaN` is not a number :D
 - `the empty string` is kept as an space so checks and operations can be done.

### philosophy

No specific method for each `class` is implemented. Instead use `constructor.name` and if is not present `({}).toString` to get the `[[Class]]`. This makes possible to find types/instances names all over the map with very little code.

No booleans for the return value. An object is returned. True/false is achieved just by checking the existence of properties.

### test

    $ npm test

### todo

 - [ ] Make browser tests
 - [X] Make more server tests (included `stream`, `event emitter`)
 `function` property.

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-type.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
