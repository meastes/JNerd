import gulp from 'gulp';
import eslint from 'gulp-eslint';

export default function () {
    return gulp.src(['./app/scripts/src/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
