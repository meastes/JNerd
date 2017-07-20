import gulp from 'gulp';
import connect from 'gulp-connect';

export default function () {
    return gulp.src([
        './app/styles/src/**/*.css',
        './node_modules/angular-material/angular-material.css',
    ])
        .pipe(gulp.dest('./app/styles/dist'))
        .pipe(connect.reload());
}
