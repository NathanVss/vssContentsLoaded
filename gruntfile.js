module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: ['*.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'vssContentsLoaded.min.js': ['vssContentsLoaded.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('js', ['jshint', 'uglify']);
    grunt.registerTask('default', ['js']);
};