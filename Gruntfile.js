(function () {
  'use strict';

  module.exports = function (grunt) {
    // project configuration
    var config = grunt.file.readJSON('config.json');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Grunt.js configuration
    grunt.initConfig({

      config: config,

      // JSHint
      jshint: {
        dev: {
          files: config.grunt.jshint.files,
          options: { force: true }
        },
        build: {
          files: config.grunt.jshint.files,
          options: { force: false }
        }
      },

      // Clean folders
      clean: {
        build: {
          src: ['<%= config.dist.path %>']
        }
      },

      // Copy files and folders
      copy: {
        statics: {
          files: [
            {
              expand: true,
              dot:    true,
              cwd:    '<%= config.app.path %>/',
              dest:   '<%= config.dist.path %>',
              src:    ['*.{ico,txt}', '.htaccess']
            }
          ]
        }
      },

      // Compass
      compass: {
        dev: {
          options: {
            sassDir:        '<%= config.app.styles %>',
            cssDir:         '<%= config.app.styles %>',
            imagesDir:      '<%= config.app.images %>',
            javascriptsDir: '<%= config.app.scripts %>',
            outputStyle:    'expanded',
            noLineComments: false,
            debugInfo:      true
          }
        },
        build: {
          options: {
            sassDir:        '<%= config.app.styles %>',
            cssDir:         '<%= config.app.styles %>',
            imagesDir:      '<%= config.app.images %>',
            javascriptsDir: '<%= config.app.scripts %>',
            outputStyle:    'compressed',
            noLineComments: true,
            debugInfo:      false
          }
        }
      },

      // server
      connect: {
        server: {
          options: {
            port: 8080,
            base: 'app'
          }
        }
      },

      // Livereload
      livereload: {
        port: 35728
      },

      // Watch
      regarde: {
        html: {
          files: ['<%= config.app.path %>/**/*.{html,md,txt,xml}'],
          tasks: []
        },
        js: {
          files: ['<%= config.app.scripts %>/**/*'],
          tasks: ['jshint']
        },
        scss: {
          files: ['<%= config.app.styles %>/**/*.scss'],
          tasks: ['compass:dev']
        },
        images: {
          files: ['<%= config.app.images %>/**/*'],
          tasks: []
        }
      },

      // RequireJS Optimizer
      requirejs: {
        dist: {
          options: {
            baseUrl:                    '<%= config.app.scripts %>',
            mainConfigFile:             'config.js',
            out:                        '<%= config.dist.scripts %>/app.js',
            wrap:                       true,
            findNestedDependencies:     true,
            optimizeAllPluginResources: false,
            preserveLicenseComments:    true,
            optimize:                   'none'
          }
        }
      },

      // usemin prepare task
      useminPrepare: {
        html: '<%= config.app.path %>/index.html',
        options: {
          dest: '<%= config.dist.path %>'
        }
      },

      // Replace assets calls
      usemin: {
        html: ['<%= config.dist.path %>/*.html'],
        css: ['<%= config.dist.styles %>/*.css'],
        options: {
          dirs: ['<%= config.dist.path %>']
        }
      },

      // Copy and minify images
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd:    '<%= config.app.images %>/',
            src:    '*.{png,jpg,jpeg}',
            dest:   '<%= config.dist.images %>'
          }]
        }
      },

      // Copy and minify stylesheets
      cssmin: {
        dist: {
          files: {
            '<%= config.dist.styles %>/main.css': [
              '.tmp/styles/*.css',
              '<%= config.app.styles %>/*.css'
            ]
          }
        }
      },

      // Copy and minify html files
      htmlmin: {
        dist: {
          files: [
            {
              expand: true,
              cwd:    '<%= config.app.path %>/',
              src:    '*.html',
              dest:   '<%= config.dist.path %>'
            }
          ]
        }
      }

    });

    // Default
    grunt.registerTask('default', [
      'jshint:dev',
      'compass:dev',
      'livereload-start',
      'server',
      'regarde'
    ]);

    // Build
    grunt.registerTask('build', [
      'clean:build',
      'jshint:build',
      'compass:build',
      'useminPrepare',
      'requirejs',
      'imagemin',
      'cssmin',
      'htmlmin',
      'concat',
      'uglify',
      'copy',
      'usemin'
    ]);

    // Server
    grunt.registerTask('server', 'connect:server');
  };
}());