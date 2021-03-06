/* eslint-disable no-console */

import gulp from 'gulp';
import babel from 'babelify';
import gulpBrowserify from 'browserify';
import gulpif from 'gulp-if';
import stringify from 'stringify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import yargs from 'yargs';

function bundle(watch) {
    return watch ? watchify(browserify()).bundle() : browserify().bundle();
}

function browserify() {
    return gulpBrowserify(
        './app/scripts/src/app.js',
        { debug: true }
    )
    .transform(stringify, {
        appliesTo: { includeExtensions: ['.html'] },
        minify: true,
    })
    .transform(babel);
}

function build(watch) {
    return bundle(watch)
    .on('error', function onBundleError(e) {
        console.error(e);
        this.emit('end');
    })
    .pipe(source('./app/scripts/dist/build.js'))
    .pipe(buffer())
    .pipe(gulpif(yargs.argv.minify, uglify()))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'));
}

export function buildScriptsWatch() {
    return build(true);
}

export function buildScripts() {
    return build(false);
}
