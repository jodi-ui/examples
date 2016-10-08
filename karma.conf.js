// Karma configuration
// Generated on Thu Aug 11 2016 10:23:34 GMT+0200 (CEST)

var chrome = require('selenium-webdriver/chrome');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'mocha'],


        // list of files / patterns to load in the browser
        files: [
            // built sources and tests
            'build/**/*.js'
        ],


        systemjs: {
            // Path to your SystemJS configuration file
            configFile: 'systemjs.config.js',

            // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
            serveFiles: [
                'node_modules/incremental-dom/dist/**/*.js',
                'node_modules/incremental-dom/dist/**/*.map',
                'node_modules/jodi-ui-dom/dist/**/*.js',
                'node_modules/jodi-ui-components/dist/**/*.js',
                'node_modules/systemjs/dist/**/*.js',
                'node_modules/systemjs/dist/**/*.map',
                'node_modules/redux/dist/**/*.js',
                'node_modules/chai/**/*.js',

                'index.ts',
                'src/**/*.ts',
                'spec/**/*.ts'
            ],

            // SystemJS configuration specifically for tests, added after your config file.
            // Good for adding test libraries and mock modules
            config: {
                map: {
                    'chai': 'node_modules/chai/chai.js'
                }
            }
        },


        // list of files to exclude
        exclude: [
            '**/*.e2e.spec.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // browsers: ['Chrome', 'PhantomJS'],
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,


        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
