import gulp from 'gulp';
import rename from 'gulp-rename';
import yargs from 'yargs';

export default function () {
    const env = yargs.argv.env || 'local';
    return gulp.src(`./app/scripts/src/config/json/application.${env}.config.json`)
        .pipe(rename('application.config.json'))
        .pipe(gulp.dest('./app/scripts/src/config/dist'));
}
