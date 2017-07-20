import lint from './lint';
import mailserver from './mailserver';
import webserver from './webserver';
import swagger from './swagger';
import buildConfig from './buildConfig';
import { buildScripts, buildScriptsWatch } from './buildScripts';
import buildStyles from './buildStyles';
import buildWar from './buildWar';

import gulp from 'gulp';
import connect from 'gulp-connect';

gulp.task('webserver', webserver);
gulp.task('mailserver', mailserver);

gulp.task('downloadSwagger', swagger);
gulp.task('lint', lint);

gulp.task('buildConfig', buildConfig);
gulp.task('buildScripts', ['buildConfig'], buildScripts);
gulp.task('buildScriptsWatch', ['buildConfig'], buildScriptsWatch);
gulp.task('buildStyles', buildStyles);
gulp.task('buildWar', ['buildScripts', 'buildStyles'], buildWar);

gulp.task('reloadHtml', ['reloadScripts'], () =>
    gulp.src('./app/**/*.html').pipe(connect.reload()));
gulp.task('reloadScripts', ['buildScriptsWatch'], () =>
    gulp.src('./app/scripts/dist/build.js').pipe(connect.reload()));

gulp.task('build', ['lint', 'buildWar']);

gulp.task('watch', () => {
    gulp.watch(['./app/**/*.html'], ['reloadHtml']);
    gulp.watch([
        './app/scripts/src/app.js',
        './app/scripts/src/angular-nrd/**/*.js',
        './app/scripts/src/config/**/*.js',
        './app/scripts/src/components/**/*.js',
        './app/scripts/src/services/**/*.js',
        './app/scripts/src/stores/**/*.js',
        './app/scripts/src/validators/**/*.js',
    ], ['reloadScripts']);
    gulp.watch(['./app/styles/src/**/*.css'], ['buildStyles']);
});

gulp.task('default', ['buildScriptsWatch', 'buildStyles', 'webserver', 'watch']);
