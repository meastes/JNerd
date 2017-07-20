import gulp from 'gulp';
import download from 'gulp-download-stream';

export default function () {
    return download({
        file: 'api.json',
        url: 'http://localhost:8081/jnerd/v2/api-docs',
    })
    .pipe(gulp.dest('tools/swagger'));
}
