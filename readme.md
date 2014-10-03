#

[<img alt="npm downloads" src="http://img.shields.io/npm/dm/utils-type.svg?style=flat-square" align="right"/>](http://img.shields.io/npm/dm/utils-type.svg)
[<img alt="NPM version" src="http://img.shields.io/npm/v/utils-type.svg?style=flat-square" align="right"/>](http://www.npmjs.org/package/utils-type)
[<img alt="build" src="http://img.shields.io/travis/stringparser/utils-type/master.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/utils-type/builds)
[<img alt="build" src="http://img.shields.io/badge/node-%3E=0.6-green.svg?style=flat-square" align="right"/>](https://travis-ci.org/stringparser/utils-type/builds/34802928)

## utils-type
> a posteriory simple type checking for `js` [<img alt="progressed.io" src="http://progressed.io/bar/78" align="right"/>](https://github.com/fehmicansaglam/progressed.io)

Heavily inspired by api design of [ianstorm's `is`](https://github.com/ianstormtaylor/is).

**Implementation state** : missing browser tests.

## install

    $ npm install utils-type

### usage

```js
var is = require('utils-type');

is( 42 );              // -> { number: 42 }
is( NaN );             // -> { nan: true }
is( null );            // -> { null: true }
is( true );            // -> { boolean: true }
is( false );           // -> { boolean: true }
is( Infinity );        // -> { infinity: true }
is( undefined );       // -> { undefined: true }
is( 'a string');       // -> { string: 'a string' }
is( /a regex/ );       // -> { object: true, regexp: /a regex/ } }
is( function(){ } );   // -> { object: true, function: [Function] }
is({ type : 'toy' });  // -> { object: { type: 'toy' } }
is( new Date() );      // -> { object: true,  date: Mon Sep 08 2014 19:10:32 GMT+0200 (CEST) }
is( new Error() );     // -> { object: true, error: [Error] }

// and more!
is( new Stream() );
// -> { object: true, eventemitter: true, stream: { domain: null, _events: {}, _maxListeners: 10 } }
is( new EventEmitter() );
// -> { object: true, eventemitter: { domain: null, _events: {}, _maxListeners: 10 } }
```

### composing

The function returns an object. The type mached by `what` type returns itself. That is:

```js
is(1).number      // -> 1 (that is truthy)
is([1,2,3]).array // -> [1,2,3] (truthy)
is([1,2,3])       // -> { object : true, array : [1,2,3] }
```
making easy to compose
```js
is(is([1,2,3]).array[1]).number // -> 1 (truthy)
```

so, you know..., turtles all the way down!
```js
is(
  is(
      is([1,Infinity,3]).array[1] ).number ).Infinity
```

### philosophy

No specific method for each `class` is implemented. Instead use `constructor.name` and if is not present `({}).toString` to get the `[[Class]]`. This makes possible to find types/instances names all over the map with very little code.

No booleans for the return value. An object is returned. True/false is achieved just by checking the existence of properties.

### beware of edge cases

I use this library heavily to avoid the ternary operator as much as possible and if else clauses. Don't get me wrong, the ternary operator is really cool but sometimes is way too misleading. What I'm saying is that I use this library to do argument parsing like below

```js
function method( arrayOrObject, plainObjOrFunction, aFunction){
  var oneIs = is(arrayOrObject);
  var twoIs = is(plainObjOrFunction);
  var threeIs = is(aFunction);

  var opt = twoIs.plainObject || oneIs.plainObject || { };
  opt.array = oneIs.array;
  opt.function = threeIs.function || twoIs.function || oneIs.function;
}
```

It might seem verbose, but try to do that with ternaries or if else clauses...

#### edge cases, weird things

Somethings that are difficult to deal with, but because of concepts not code.

#### NaN

Though is a number by js standards, or so is typed, if you do `is(NaN).number` it will return `undefined` since is "Not A Number". Returning true would be a double bluff.

With just some checks its clear that is the right choice here
```js
(NaN).constructor.name
// => Number
({}).toString.call(NaN)
// => [Object Number]
Number.isNaN(NaN)
// => true
```
So even if is typed like a number if you check the `Number.isNaN` function like above it will return true saying "is Not A Number".

A `nan` property is added instead
```js
is(NaN)
// => { nan : true }
```

#### Infinity

Something similar happens for `Infinity`. Is a number by its `[[Class]]`, but if you ask to a math student it will disagree for the most part. [Infinity and -Infinity can be added to the real line to make it *compact*](http://en.wikipedia.org/wiki/Real_projective_line). *Compactification* is the result of making a topological space into a compact space ([more on that](http://en.wikipedia.org/wiki/Compactification_(mathematics))).

So `is(Infinity).number` will return `undefined`. Though on the paper **we can do normal number operations** with it add it to the "is(something).number" check will produce errors code on general.

An `infinity` property is added instead
```js
is(Infinity)
// => { infinity : true }
```
And no one can stop you to use it on operations as you normally would.

#### falsy values

Falsy values are made true when it makes sense based on their use

```js
var arr = [false, 0, NaN, ''];

is(is(arr).array[0]).boolean // -> true      (truthy)
is(is(arr).array[1]).number  // -> 0         (falsy)
is(is(arr).array[2]).number  // -> undefined (nope is "Not A Number")
is(is(arr).array[3]).string  // -> ' '       (truthy)
```

Why:
 - `false` is a boolean, returning it will be misleading.
 - `0` is a number yes, but if is changed to true you can't add to it after the function returns.
 - `NaN` is not a number :D
 - `the empty string` is kept as an space so you can do checks and operations with it (because is falsy by default).

### test

    $ make test
    or
    $ npm test

### todo

 - [ ] Make browser tests
 - [X] Make more server tests (included `stream`, `event emitter`)
 `function` property.

### license

[<img alt="LICENSE" src="http://img.shields.io/npm/l/utils-type.svg?style=flat-square"/>](http://opensource.org/licenses/MIT)
