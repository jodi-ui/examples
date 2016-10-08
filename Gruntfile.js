module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            'video-player': {
                tsconfig: true
            }
        },
        sass: {
            'video-player': {
                options: {
                    // style: 'compressed',
                    sourcemap: 'inline' // auto or inline
                },
                files: {
                    'build/video-player.css': 'video-player/styles/app.scss'
                }
            }
        },
        watch: {
            'video-player-ts': {
                files: [
                    'video-player.ts',
                    'mocka.ts',
                    'video-player/**/*.ts'
                ],
                tasks: ['ts:video-player']
            },
            'video-player-styles': {
                files: [
                    'video-player/**/*.scss'
                ],
                tasks: ['sass:video-player']
            }
        },
        exec: {
            'run-unit-tests': 'node_modules/.bin/karma start --single-run',
            'run-e2e-tests': `
                env \
                E2E_HOST=localhost \
                E2E_PORT=${grunt.option('port') || 19892} \
                E2E_BROWSER=${grunt.option('browser') || 'chrome'} \
                \
                node_modules/.bin/mocha build/**/*.e2e.spec.js \
                --timeout 10000
                `
        },
        connect: {
            'server': {
                options: {
                    port: grunt.option('port') || 19891,
                    base: ''
                }
            },
            'test-server': {
                options: {
                    port: grunt.option('port') || 19892,
                    base: ''
                }
            }
        }
    });


    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // tests
    grunt.registerTask('run-e2e-tests', ['connect:test-server', 'exec:run-e2e-tests']);
    grunt.registerTask('run-unit-tests', ['exec:run-unit-tests']);
    grunt.registerTask('run-all-tests', ['run-unit-tests', 'run-e2e-tests']);

    // building
    grunt.registerTask('build-video-player', ['ts:video-player', 'sass:video-player']);
    grunt.registerTask('build', ['build-video-player']);

    //
    grunt.registerTask('run-server', ['connect:server:keepalive']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};