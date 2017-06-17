var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var tsc = require('gulp-typescript');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = tsc.createProject('src/tsconfig.json');

var jsFiles = ['*.js','src/**/*.js'];

var config = {
		allTs: './src/**/*.ts',
		typings: './src/typings/**/*.d.ts',
		tsOutputPath: './src/'
	};

gulp.task('style',function(){
	return gulp.src(jsFiles).pipe(jshint());
});

gulp.task('ts-lint', function() {
	return gulp.src(config.allTs)
		.pipe(tslint())
		.pipe(tslint.report('prose', {
			emitError: false
	    }))
});

gulp.task('compile-ts', function(){
	var sourceTsFiles = [
		config.typings,
		config.allTs
	];
		
	var tsResult = gulp
		.src(sourceTsFiles)
		.pipe(sourcemaps.init())
		.pipe(tsc(tsProject));
	
	//var tsResult = tsProject.src(sourceTsFiles) // instead of gulp.src(...)
    //   .pipe(sourcemaps.init())
	//   .pipe(tsc(tsProject));
		
		return tsResult.js
		    .pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(config.tsOutputPath));
			
});

gulp.task('serveServer',['style'], function(){
	var options = {script:'server.js',
	delayTime:1,
	watch: jsFiles};
	return nodemon(options).on('restart',function(){
		console.log('Server Restarting ...');
	});
});

gulp.task('serveClient', ['ts-lint', 'compile-ts'], function(){
	gulp.watch([config.allTs], ['ts-lint', 'compile-ts']);
	return console.log('TypeScript Recompiling');
});

gulp.task('default', ['serveServer','serveClient']);