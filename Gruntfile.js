/*jshint node:true*/

"use strict";

module.exports = function(grunt) {

	// Time how long tasks take. Can help when optimizing build times
	require("time-grunt")(grunt);
	// Load grunt tasks automatically
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		concurrent: {
			serve: [
				'less:serve',
				"autoprefixer:serve"
			]
		},
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'safari >= 4'],
				map: {
					prev: '.tmp/styles/'
				}
			},
			serve: {
				files: {
					"assets/css/styles.css" : "assets/css/styles.css"
				}
			}
		},
		less: {
			serve: {
				options: {
					sourceMap: false,
				},
				files: {
					"assets/css/styles.css" : "assets/less/styles.less"
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				open: "http://localhost:9000",
				livereload: 35729,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static(".tmp"),
							connect().use("/bower_components", connect.static("./bower_components")),
							connect.static("./")
						];
					}
				}
			}
		},
		watch: {
			bower: {
				files: ["bower.json"],
				tasks: ["wiredep"]
			},
			js: {
				files: ["assets/js/**/*.js"],
				tasks: [],
				options: {
					livereload: "<%= connect.options.livereload %>"
				}
			},
			gruntfile: {
				files: ["Gruntfile.js"]
			},
			less: {
				files: ["assets/less/**/*.less"],
				tasks: ["less:serve", "autoprefixer:serve"]
			},
			// styles: {
			// 	files: ["<%= config.app %>/styles/{,*/}*.css"],
			// 	tasks: ["newer:copy:styles", "autoprefixer:dist"]
			// },
			livereload: {
				options: {
					livereload: true
				},
				files: ["index.html",
					"assets/{,*/}*.css",
					"assets/images/**"
				]
			}
		}
	});

	grunt.registerTask("serve", [
		"concurrent:serve",
		"autoprefixer:serve",
		"connect:livereload",
		"watch"
	]);

};
