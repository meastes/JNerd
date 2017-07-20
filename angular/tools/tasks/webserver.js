import path from 'path';

import connect from 'gulp-connect';
import mock from 'swagger-mock-api';
import yargs from 'yargs';

export default function () {
    return connect.server({
        root: 'app',
        livereload: true,
        middleware: () => {
            if (yargs.argv.env === 'mock') {
                return ([
                    mock({
                        swaggerFile: path.join(__dirname, '../swagger/api.json'),
                    }),
                ]);
            }
            return ([]);
        },
    });
}
