module.exports = function(grunt) {
  pkg: grunt.file.readJSON('package.json'),
  grunt.initConfig({
    webdriver: {
      tests: {
        configFile: 'wdio.conf.js'
    },
      options: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'public/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.registerTask('default', ['webdriver']);
};