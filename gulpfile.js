'use strict';

var gulp = require("gulp");
var fs = require('fs');

gulp.task('functions', function() {
    var src = './node_modules/vim-dict-wordpress/functions.dict';
    var out = './snippets/functions.cson';
    var snippets = "'.source.php':\n"
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets = snippets + "  " + "'function: " + snippet + "()':\n";
            snippets = snippets + "    " + "'prefix': '" + snippet + "()'\n";
            snippets = snippets + "    " + "'body': '" + snippet + "(${1})'\n";
        }
        fs.writeFile( out, snippets );
    } );
} );

gulp.task('filters', function() {
    var src = './node_modules/vim-dict-wordpress/filter-hooks.dict';
    var out = './snippets/filters.cson';
    var snippets = "'.source.php':\n"
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets = snippets + "  " + "'filter: " + snippet + "':\n";
            snippets = snippets + "    " + "'prefix': '" + snippet + "'\n";
            snippets = snippets + "    " + "'body': 'add_filter( \"" + snippet + "\", ${1} )'\n";
        }
        fs.writeFile( out, snippets );
    } );
} );

gulp.task('actions', function() {
    var src = './node_modules/vim-dict-wordpress/action-hooks.dict';
    var out = './snippets/actions.cson';
    var snippets = "'.source.php':\n"
    fs.readFile( src, 'utf8', function ( err, text ) {
        var lines = text.split( /\n/ );
        for ( var i = 0; i < lines.length; i++ ) {
            var snippet = lines[i].trim();
            if ( ! snippet.length ) {
                continue;
            }
            snippets = snippets + "  " + "'action: " + snippet + "':\n";
            snippets = snippets + "    " + "'prefix': '" + snippet + "'\n";
            snippets = snippets + "    " + "'body': 'add_action( \"" + snippet + "\", ${1} )'\n";
        }
        fs.writeFile( out, snippets );
    } );
} );

gulp.task( 'default', [ 'functions', 'filters', 'actions' ] );
