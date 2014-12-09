module.exports = function(grunt) {
  var jsFiles = [
    'index.js',
    'Gruntfile.js',
    'client/app/**/*.js',
    'server/**/*.js',
    'specs/**/*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: 'config/.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
    jscs: {
      src: jsFiles,
      options: {
        config: 'config/.jscsrc'
      }
    }
  });
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'jscs']);
};
