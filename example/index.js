
var Stream = require('stream');
var EventEmitter = require('events').EventEmitter;
var is = require('./..');

is( 0 )
is( 42 );
is( NaN );
is( null );
is( true );
is( false );
is( Infinity );
is( undefined );
is( 'a string');
is( /a regex/ );
is( [ Math.E ] );
is( { type : 'toy' });
is( new Date());
is( new Error() );
is( new Stream() );
is( new EventEmitter() );
is( function(){ } );
is( (function(){ return arguments; })() );
