module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    //Read the package.json (optional)
    pkg: grunt.file.readJSON('package.json'),

    ////
    // Metadata.
    //
    meta: {
      sourcePath: 'assets/',
      buildPath:  'static/',
      tmpPath:    '.tmp/',
      cssPath:    'stylesheets/',
      jsPath:     'javascripts/',
      imagePath:  'images/',
      fontPath:   'fonts/'
    },

    ////
    // Clear current compiled assets for a given task
    //
    clean: {
      stylesheets:   ["<%= meta.buildPath + meta.cssPath %>"],
      javascripts:   ["<%= meta.buildPath + meta.jsPath %>"],
      static_assets: ["<%= meta.buildPath + meta.fontPath %>", "<%= meta.buildPath + meta.imagePath %>"]
    },

    ////
    // Sass
    //
    sass: {
      options: {
        style: 'compressed',
        require: './<%= meta.sourcePath + meta.cssPath %>sass.rb'
      },
      dist: {
        files: {
          '<%= meta.buildPath + meta.cssPath %>application.css': '<%= meta.sourcePath + meta.cssPath %>application.scss'
        }
      }
    },

    ////
    // JSHint
    //
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      javascripts: {
        files: {
          src: ['<%= meta.sourcePath + meta.jsPath %>*/*.js']
        },
        options: {
          ignores: [
            '<%= meta.sourcePath + meta.jsPath %>vendor/**/*.js',
            '<%= meta.sourcePath + meta.jsPath %>bower_components/**/*.js'
          ]
        }
      }
    },

    ////
    // Snockets - combine unminified JS into tmp file
    //
    snockets: {
      app: {
        src: '<%= meta.sourcePath + meta.jsPath %>application.js',
        dest: '<%= meta.tmpPath + meta.jsPath %>application.js'
      }
    },

    ////
    // Neuter - combine pre-minified vendor JS into tmp file
    //
    neuter: {
      options: {
        filepathTransform: function (filepath) {
          return 'assets/javascripts/' + filepath;
        },
        template: "{%= src %}"
      },
      vendor: {
        src: '<%= meta.sourcePath + meta.jsPath %>vendor.js',
        dest: '<%= meta.tmpPath + meta.jsPath %>vendor.js'
      }
    },

    ////
    // Concat - combine both vendor & app JS into production file
    //
    concat: {
      dist: {
        src: [
          '<%= meta.tmpPath + meta.jsPath %>vendor.js',
          '<%= meta.tmpPath + meta.jsPath %>application.js'
        ],
        dest: '<%= meta.buildPath + meta.jsPath %>application.js'
      }
    },

    ////
    // Copy static assets: images, fonts
    //
    copy: {
      static_assets: {
        files: [
          {
            expand: true,
            cwd:  '<%= meta.sourcePath %>',
            src:  ['<%= meta.imagePath %>**/*', '<%= meta.fontPath %>**/*'],
            dest: '<%= meta.buildPath %>'
          }
        ]
      },
      javascripts: {
        files: [
          {
            expand: true,
            cwd:  '<%= meta.sourcePath + meta.jsPath %>vendor/',
            src:  ['modernizr.min.js', 'selectivizr.js'],
            dest: '<%= meta.buildPath + meta.jsPath %>'
          }
        ]
      }
    },

    ////
    // Files to watch for a given task
    //
    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['default']
      },
      stylesheets: {
        files: [
          '<%= meta.sourcePath %>/**/*.scss',
          '<%= meta.sourcePath %>/**/*.css'
        ],
        tasks: ['stylesheets', 'notify:stylesheets', 'log:stylesheets'],
      },
      javascripts: {
        files: [
          '<%= meta.sourcePath %>/**/*.coffee',
          '<%= meta.sourcePath %>/**/*.js'
        ],
        tasks: ['javascripts', 'notify:javascripts', 'log:javascripts'],
      },
      static_assets: {
        files: [
          '<%= meta.sourcePath + meta.fontPath %>**/*',
          '<%= meta.sourcePath + meta.imagePath %>**/*'
        ],
        tasks: ['static_assets', 'notify:static_assets', 'log:static_assets']
      },
      livereload: {
        files: [
          '<%= meta.buildPath + meta.cssPath %>*.css'
        ],
        options: {
          livereload: true
        }
      }
    },

    ////
    // Tests
    //
    casperjs: {
      options: {
        pre: ['test/test_helper.js']
      },
      files: ['test/integration/**/*_test.js']
    },

    ////
    // Notifications
    //
    notify: {
      assets: {
        options: {
          title: 'Observing Assets',
          message: 'Assets compiled, watching for changes',
        }
      },
      compile: {
        options: {
          title: 'Assets Updated',
          message: 'All assets have been compiled',
        }
      },
      stylesheets: {
        options: {
          title: 'Stylesheets Updated',
          message: 'Stylesheets have been compiled'
        }
      },
      javascripts: {
        options: {
          title: 'JavaScripts Updated',
          message: 'JavaScripts have been compiled'
        }
      },
      jshint: {
        options: {
          title: 'JavaScripts Linted',
          message: 'JavaScripts have been linted'
        }
      },
      static_assets: {
        options: {
          title: 'Static Assets Updated',
          message: 'Static assets have changed'
        }
      },
      test: {
        options: {
          title: 'Tests Complete',
          message: 'Acceptance tests have finished'
        }
      },
      generic_tasks: {
        options: {
          title: 'Tasks Complete',
          message: 'All tasks have properly finished'
        }
      }
    },

    log: {
      assets: {
        message: "Assets compiled, watching for changes"
      },
      compile: {
        message: 'All assets have been compiled',
      },
      stylesheets: {
        message: 'Stylesheets have been compiled'
      },
      javascripts: {
        message: 'JavaScripts have been compiled'
      },
      jshint: {
        message: 'JavaScripts have been linted'
      },
      static_assets: {
        message: 'Static assets have changed'
      },
      test: {
        message: 'Acceptance tests have finished'
      },
      generic_tasks: {
        message: 'All tasks have properly finished'
      }
    }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-snockets');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-casperjs');

  // Loggin task
  grunt.registerMultiTask('log', 'Logging task', function(arg1, arg2) {
    if (undefined !== this.data.message) {
      grunt.log.writeln();
      grunt.log.writeln((' ' + this.data.message + ' ').blue.inverse);
    }
  });

  // Grouped tasks
  grunt.registerTask('stylesheets',   ['clean:stylesheets', 'sass']);
  grunt.registerTask('javascripts',   [
    'clean:javascripts',
    'jshint:javascripts',
    'snockets:app',
    'neuter:vendor',
    'concat:dist',
    'copy:javascripts'
  ]);
  grunt.registerTask('static_assets', ['clean:static_assets', 'copy:static_assets']);

  // Common tasks
  grunt.registerTask('compile', ['stylesheets', 'javascripts', 'static_assets', 'notify:compile', 'log:compile']);
  grunt.registerTask('assets',  ['stylesheets', 'javascripts', 'static_assets', 'notify:assets', 'log:assets', 'watch']);
  grunt.registerTask('test',    ['casperjs', 'notify:test', 'log:test']);

  // Default task
  grunt.registerTask('default', ['stylesheets', 'javascripts', 'static_assets', 'notify:generic_tasks', 'log:generic_tasks']);

};
