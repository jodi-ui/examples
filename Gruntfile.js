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
        }
    });


    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    grunt.registerTask('build-video-player', ['ts:video-player', 'sass:video-player']);
    grunt.registerTask('build', ['build-video-player']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};