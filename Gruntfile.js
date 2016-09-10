module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            'video-player': {
                tsconfig: true
            }
        },
        watch: {
            'video-player': {
                files: [
                    'video-player/src/**/*.ts'
                ],
                tasks: ['ts:video-player']
            }
        }
    });


    //
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //
    grunt.registerTask('build-video-player', ['ts:video-player']);
    grunt.registerTask('build', ['build-video-player']);

    // Default task(s).
    grunt.registerTask('default', ['build']);
};