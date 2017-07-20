import gulp from 'gulp';
import war from 'gulp-war';
import zip from 'gulp-zip';

export default function () {
    return gulp.src(['./app/**/*', '!./app/scripts/src{,/**/*.js}'])
        .pipe(war({
            welcome: 'index.html',
            displayName: 'Angular WAR',
        }))
        .pipe(zip('angular.war'))
        .pipe(gulp.dest('./dist'));
}
