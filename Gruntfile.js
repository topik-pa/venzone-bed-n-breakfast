module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		path: './public',
		destPath: './temp',

        cssmin: {
			desktop: {
				src: '<%=path%>/stylesheets/custom.css', 
				dest: '<%=path%>/stylesheets/custom.min.css'
			},		
            options: {
                'banner': null,
                'keepSpecialComments': '*',
                'report': 'min'
            }
        },


        uglify: {
            options: {
                compress: {
                    //drop_console: true
                },
                mangle: false
            },
            dist: {
				files: [{
                    src: '<%=path%>/javascripts/custom.js',
                    dest: '<%=path%>/javascripts/custom.min.js'
                }]
            }
        },


        jshint: { 
            files: ['<%=path%>/javascripts/custom.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: false,
                    console: true,
                    module: true,
                    document: true,
					'$': false
                }
            }
        },
		
		sass: {
			desktop: {
				src: '<%=path%>/stylesheets/custom.scss', 
				dest: '<%=path%>/stylesheets/custom.css'
			},
			options: {
				'sourcemap': 'auto',
				'trace': false,
				'unixNewlines': false,
				'check': false,
				'style': 'nested',
				'precision': 3,
				'quiet': false,
				'compass': false,
				'debugInfo': false,
				'lineNumbers': false,
				'loadPath': [],
				'require': [],
				'cacheLocation': '.sass-cache',
				'noCache': false,
				'bundleExec': false,
				'update': false
			}
		},
		
		
		prettify: {
		  options: {
			indent_size: 2
		  },
		  all: {
			expand: true,
			cwd: '<%=path%>',
			ext: '.html',
			src: ['*.html'],
			dest: '<%=path%>'
		  },
		},
		
		
		prettysass: {
		  options: {
			indent: 2
		  },
		  app: {
			src: ['<%=path%>/scss/**/*.scss']
		  },
		},
		
		
		"jsbeautifier" : {
			files : ["<%=path%>/js/**/!(*.min*).js"],
			options : {
				indentSize: 2
			}
		},
		
		/*copy: {
			html: {
			  src: '<%=path%>/index.html',
			  dest: '<%=destPath%>/index.html'
			},
			css: {
			  src: '<%=path%>/css/styles.min.css',
			  dest: '<%=destPath%>/css/styles.min.css'
			},
			js: {
			  src: '<%=path%>/js/scripts.min.js',
			  dest: '<%=destPath%>/js/scripts.min.js'
			}
		  },*/

		
        watch: {
			files: ['<%=path%>/javascripts/custom.js', '<%=path%>/stylesheets/custom.scss'],
			tasks: ['sass', 'cssmin', 'jshint', 'uglify', /*'copy',*/ 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');	
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-prettysass');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', /*'copy',*/ 'watch']);
	/*grunt.registerTask('pretty-all', ['prettify', 'prettysass', 'jsbeautifier']);*/
};
