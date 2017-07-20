import gulp from 'gulp';
import connect from 'gulp-connect';
import sass from 'gulp-sass';

export default function () {
    return gulp.src([
        './app/styles/src/scss/**.scss',
        './app/styles/src/scss/libraries/**.scss'
    ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./app/styles/dist'))
        .pipe(connect.reload());
}