var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var ftp = require( 'vinyl-ftp' );
var reload = browserSync.reload;
var rupture = require('rupture');
var data = require('gulp-data');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var pngquant = require('imagemin-pngquant');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var newer = require('gulp-newer');
var remember = require('gulp-remember');
var spritesmith = require('gulp.spritesmith');
var runSequence = require('run-sequence');
var progeny = require('gulp-progeny');
var filter = require('gulp-filter');
var fs = require('fs');
var prettify = require('gulp-prettify');
var combineMq = require('gulp-combine-mq');
var webshot=require('gulp-webshot');
var createFile = require('create-file');
var jadeGlobbing  = require('gulp-jade-globbing');
var wiredep = require('wiredep').stream;
var clean = require('gulp-clean');
var shell  = require('gulp-shell');
var svgSprite = require('gulp-svg-sprite');
var svgSpriteTempl = require('gulp-svg-sprites');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');
var zip = require('gulp-zip');


// Build styleguide.
gulp.task('guide', shell.task([
	'kss --source app/css/ --destination template/ --css ../app/css/style.css'
]));


// ########## make img ###############
gulp.task('imageCompress',function(){
return gulp.src(['app/img/**/**.*','!app/img/svg/**.*','!app/img/svg'])
	.pipe(newer('dist/img/'))
	.pipe(gulpif("*.png",
		imagemin({
			progressive: true,
			use: [pngquant({quality: '80', speed: 5})]
		})
	))
	.pipe(gulpif("*.jpg",
		imagemin({
			progressive: true,
			use: [imageminMozjpeg({quality: '80', speed: 5})]
		})
	))
	.pipe(gulp.dest('dist/img/'));
});


//sprite SVG
gulp.task('svg', function () {
	var svgSrc = gulp.src(['app/img/svg/**.*','!app/img/svg/defs.svg','!app/img/svg/sprite.svg']);
	svgSrc
	.pipe(svgmin({
		js2svg: {
		pretty: true
		}
	}))
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill'); //remove if need color icon
			$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true }
	}))
	.pipe(svgSprite( {
		mode:{
			symbol: true,
		}
	}))
	.pipe(rename("pack.html"))
	.pipe(gulp.dest('app/img/'))

	svgSrc
	.pipe(svgSpriteTempl())
	.pipe(gulp.dest('app/img/'))
});


//Sprite
gulp.task('sprite', function () {
	var spriteData = gulp.src('app/img/sprites/*.png').pipe(spritesmith({
	imgName: '../img/sprite.png',
	cssName: 'sprite.css',
	cssOpts: {
			cssSelector: function (item) {
				// If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
				if (item.name.indexOf('-hover') !== -1) {
					return '.icon-' + item.name.replace('-hover', ':hover');
					// Otherwise, use the name as the selector (e.g. 'home' -> 'home')
				}
				else {
					return '.icon-' + item.name;
				}
			}
		}
	}));
	spriteData.img.pipe(gulp.dest('app/img/')); // путь, куда сохраняем картинку
	spriteData.css.pipe(gulp.dest('app/css/icon/')); // путь, куда сохраняем стили
});

//ScreenShot
gulp.task('screenshot', function() {
	return gulp.src('app/*.html')
	.pipe(webshot(
		{ 
			dest:'app/img/screen/',
			root:'.',
			windowSize:{
				width: 1920,
				height: 1024
			},
			userAgent: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		}
	));
})
// ########## make img  end ###############

// ########## make css ###############

//Prefix my css
gulp.task('prefix', function () {
	return gulp.src('app/css/style.css')
		.pipe(cache('prefix'))
		.pipe(autoprefixer({
			browsers: ['last 15 versions']
	}))
	.pipe(gulp.dest('app/css/'));
});

//Stylus
gulp.task('stylus', function () {
	return gulp.src(['app/css/**/*.styl','app/module/**/*.styl'])
	.pipe(cache('stylus'))
	.pipe(progeny({
		regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
	}))
	.pipe(filter(['**/*.styl', '!**/_*.styl']))
	.pipe(stylus({
		use:[rupture()],
		'include css': true
	})).on('error', errorhandler)
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css/'))
});

//css beautify 
gulp.task('css-beautify',function(){
	return gulp.src('app/css/style.css')
	.pipe(combineMq({
		beautify: true
	}))
	.pipe(gulp.dest('dist/css/'));
})

//min css
gulp.task('min:css',function(){
	return gulp.src('./app/css/style.css')
	.pipe(minifyCss())
	.pipe(rename("style-min.css"))
	.pipe(gulp.dest('./dist/css/'))
})

//min js
gulp.task('min:js',function(){
	return gulp.src('./app/js/script.js')
	.pipe(uglify())
	.pipe(rename("script-min.js"))
	.pipe(gulp.dest('./dist/js/'))
})

// ########## make css end ###############

// ########## make html ###############

gulp.task('jade', function() {
	gulp.src(['app/html/*.jade','app/module/**/*.jade',])
	.pipe(progeny({
		regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
	}))
	.pipe(filter(['**/*.jade', '!**/_*.jade']))
	.pipe(jadeGlobbing())
	.pipe(jade({
		pretty: '\t',
	cache:'true'
	})
	.on('error', errorhandler))
	.pipe(prettify({
		'unformatted': ['pre', 'code'],
		'indent_with_tabs': true,
		'preserve_newlines': true,
		'brace_style': 'expand',
		'end_with_newline': true
	}))
	.pipe(gulp.dest('app/'))
	.on('end', browserSync.reload);
});

//wiredep
gulp.task('bower', function () {
	gulp.src('app/html/block_html/*.jade')
	.pipe(wiredep())
	.pipe(gulp.dest('app/html/block_html/'));
});

// ########## make html end###############

// ########## make service###############

//copy fonts
gulp.task('copy:font',function(){
	return gulp.src('./app/fonts/**/**.*')
		.pipe(newer('./dist/fonts/'))
		.pipe(gulp.dest('./dist/fonts/'))
})

//copy js
gulp.task('copy:js',function(){
	return gulp.src(['./app/js/script.js','./app/js/script-edit.js'])
	.pipe(gulp.dest('./dist/js/'))
})

//copy css
gulp.task('copy:css',function(){
	return gulp.src(['./app/css/style.css','./app/css/style-edit.css'])
	.pipe(gulp.dest('./dist/css/'))
})

//Show error
function errorhandler(a) {
	var args = Array.prototype.slice.call(arguments);
	// Send error to notification center with gulp-notify
	notify.onError({
		title: 'Compile Error',
		message: a,
	}).apply(this, args);
	this.emit('end');
};

//useref
gulp.task('make', function () {
	var assets = useref.assets();
	return gulp.src('app/*.html')
		.pipe(cache('make'))
		.pipe(assets)
		.pipe(remember('make'))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});


//Ftp
gulp.task( 'ftp', function() {
	var ftpConf = JSON.parse(fs.readFileSync('./ftp.json'));
	var conn = ftp.create( {
		host: 'kuznetcov.org',
		user: ftpConf.user,
		password: ftpConf.pass,
		parallel: 1,
		maxConnections:1
	});
	var globs = [
		'dist/**/**/**.*'
	];
	return gulp.src(globs, {buffer: false})
	.pipe( conn.newer( 'kuznetcov.org/'+ftpConf.name) )
	.pipe( conn.dest( 'kuznetcov.org/'+ftpConf.name) );
});

//LiveReload
gulp.task('serve', function () {
	browserSync.init({
			notify: false,
			reloadDelay: 300,
			//tunnel: true,
			//tunnel: "webpage",
			server: {
			baseDir: "app/",
		}
	});
	browserSync.watch(["app/css/**/*.css" ,"app/js/**.*"]).on("change", browserSync.reload);
});

// ########## make service end ###############

//create File
gulp.task('file',function(){
	var FileCreate = JSON.parse(fs.readFileSync('./file.json'));
	for (var key in FileCreate) {
		var obj = FileCreate[key];
		if(key=="block"){
			for (var prop in obj) {
				createFile(
					'app/module/'+obj[prop]+'/_'+obj[prop]+'.jade' ,
					"mixin " +obj[prop]+"()"+"\n\t//block "+obj[prop]+"\n\t//block "+obj[prop]+' end',
					function (err) { }
					);
				createFile(
					'app/module/'+obj[prop]+'/_'+obj[prop]+'.styl',
					"/*! block "+obj[prop]+"*/"+"\n/*!block "+obj[prop]+' end */',
					function (err) { }
					);
			}
		}
		if(key=="page"){
			for (var prop in obj) {
			createFile('app/html/'+ obj[prop]+'.jade'  ,"", function (err) { });
			}
		}
	}
})

// Return timestamp
function correctNumber(number) {
	return number < 10 ? '0' + number : number;
}

function getDateTime() {
	var now = new Date();
	var year = now.getFullYear();
	var month = correctNumber(now.getMonth() + 1);
	var day = correctNumber(now.getDate());
	var hours = correctNumber(now.getHours());
	var minutes = correctNumber(now.getMinutes());
	return year + '-' + month + '-' + day + '-' + hours + minutes;
}

// make zip archive
gulp.task('zip', function() {
	var datetime = '-' + getDateTime();
	var zipName = 'dist' + datetime + '.zip';

	return gulp.src('dist/**/**/**/*')
		.pipe(zip(zipName))
		.pipe(gulp.dest('zip'));
});


// ########## make backend template ###############
gulp.task('template-clean', function () {
return gulp.src('dist/module/', {read: false})
	.pipe(clean());
});

gulp.task('template-style', function () {
	return gulp.src('app/module/**/*.styl')
	.pipe(gulp.dest('dist/module/'))
});

gulp.task('template-file',function(){
	var FileCreate = JSON.parse(fs.readFileSync('./file.json'));
	for (var key in FileCreate) {
		var obj = FileCreate[key];
		if(key=="block"){
				for (var prop in obj) {
						createFile('dist/module/'+obj[prop]+'/_'+obj[prop]+'.jade' ,"include ../../../app/html/block_html/_const.jade\n"+"include ../../../app/module/**/*.jade\n"+"+" +obj[prop]+"()", function (err) { });
				}
		}
	}
})

gulp.task('template-module', function() {
	setTimeout(function() {
		gulp.src(['dist/module/**/*.jade'])
			.pipe(jadeGlobbing())
			.pipe(jade({
				pretty: '\t',
				cache:'true'
		}).on('error', errorhandler))
		.pipe(prettify({
			'unformatted': ['pre', 'code'],
			'indent_with_tabs': true,
			'preserve_newlines': true,
			'brace_style': 'expand',
			'end_with_newline': true
		}))
		.pipe(gulp.dest('dist/module/'))
	},2000);
});
// ########## make backend template  end###############


//Watcher
gulp.task('see',function(){
	gulp.watch(['app/html/**/*.jade','app/module/**/*.jade',], ['jade']);
	gulp.watch(['app/css/**/*.styl','app/module/**/*.styl'],['stylus']);
	gulp.watch(['./file.json'],['file']);
})

//default
gulp.task('img',['imageCompress']);
gulp.task('default',['see','serve'] );

gulp.task('template',function(){
	runSequence(
		'template-clean',
		'template-style',
		'template-file',
		'template-module'
		)
});

gulp.task('build',function(){
	runSequence(
		'jade',
		'stylus',
		'prefix',
		'copy:font',
		'copy:js',
		'copy:css',
		'min:css',
		'min:js',
		'img',
		'svg',
		'make'
		//'zip'
	)
});


gulp.task('build:ftp',function(){
	runSequence(
		'jade',
		'stylus',
		'prefix',
		'copy:font',
		'copy:js',
		'copy:css',
		'min:css',
		'min:js',
		'img',
		'svg',
		'make',
		//'zip',
		//'screenshot',
		//'guide',
		'ftp'
		//'template'
	)
});

