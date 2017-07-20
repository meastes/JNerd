exports.config = {
    baseUrl: 'http://localhost:8080/',
    capabilities: {
        browserName: 'chrome',
    },
    framework: 'jasmine',
    specs: ['e2e/*.js'],
    onPrepare() {
        require('babel-register');
    },
};
