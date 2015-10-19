'use strict';

var gulp = require( "gulp" );
var fs = require( "fs" );
var cson = require('CSON');
var sprintf = require("sprintf-js").sprintf;

gulp.task( 'functions', function() {
    var src = './node_modules/vim-dict-wordpress/functions.dict';
    var out = './snippets/functions.cson';
    var snippets = {};
    snippets['.source.php'] = {};
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets['.source.php']['function: ' + snippet + '()'] = {
                'prefix': snippet,
                'body': snippet + '(${1})',
            }
        }
        cson.createCSONString( snippets, function( err,result ){
            fs.writeFile( out, result );
        })
    } );
} );

gulp.task( 'filters', function() {
    var src = './node_modules/vim-dict-wordpress/filter-hooks.dict';
    var out = './snippets/filters.cson';
    var snippets = {};
    snippets['.source.php'] = {};
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets['.source.php']['filter: ' + snippet] = {
                'prefix': snippet,
                'body': sprintf( 'add_filter( "%1$s", ${1:array( $this, "%1$s" )} );', snippet ),
            }
        }
        cson.createCSONString( snippets, function( err,result ){
            fs.writeFile( out, result );
        })
    } );
} );

gulp.task( 'actions', function() {
    var src = './node_modules/vim-dict-wordpress/action-hooks.dict';
    var out = './snippets/actions.cson';
    var snippets = {};
    snippets['.source.php'] = {};
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets['.source.php']['action: ' + snippet] = {
                'prefix': snippet,
                'body': sprintf( 'add_action( "%1$s", ${1:array( $this, "%1$s" )} );', snippet ),
            }
        }
        cson.createCSONString( snippets, function( err,result ){
            fs.writeFile( out, result );
        })
    } );
} );

gulp.task( 'default', [ 'functions', 'filters', 'actions' ] );
