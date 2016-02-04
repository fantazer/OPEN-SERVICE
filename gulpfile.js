var projName ='';

var gulp = require("gulp");
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var ftp = require( 'vinyl-ftp' );
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');
var axis = require('axis');
var jeet = require('jeet');
var htmlhint = require("gulp-htmlhint");
var rupture = require('rupture');
var data = require('gulp-data');
var jade = require('gulp-jade');
var notify = require('gulp-notify');
var pngquant = require('imagemin-pngquant');
var imageminMozjpeg = require('imagemin-mozjpeg');
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');


//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//Show error
function errorhandler(a) {
    var args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: a,
        // sound: true можно даже со звуком!
    }).apply(this, args);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('imagePng',function(){
             return gulp.src('app/img/*.png')
                 .pipe(imagemin({
                     progressive: true,
                     svgoPlugins: [{removeViewBox: false}],
                     use: [pngquant({quality: '40', speed: 4})]
                 }))
                 .pipe(gulp.dest('dist/img/'));
 });

gulp.task('imageJpg',function(){
            return gulp.src('app/img/*.jpg')
            .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [imageminMozjpeg({quality: '60', speed: 11})]
                }))
            .pipe(gulp.dest('dist/img/'));
});


//useref
gulp.task('make', function () {
    var assets = useref.assets();
     gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js/'));
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

//Ftp
gulp.task( 'ftp', function() {
    var conn = ftp.create( {
        host:     'one.web-kuznetcov.ru',
        user:     '',
        password: '',
        parallel: 21,
        log:      gutil.log
    } );

    var globs = [
        'dist/**',
        'dist/*.html'
    ];
   return gulp.src(globs)
        .pipe( conn.newer( 'httpdocs/one.web-kuznetcov.ru/'+projName ) )
        .pipe( conn.dest( 'httpdocs/one.web-kuznetcov.ru/'+projName ) );

} );


//Stylus
gulp.task('stylus', function () {
  gulp.src('./app/css/*.styl')
    .pipe(stylus({
        use:[rupture(),axis(),jeet()]
        })).on('error', errorhandler)
    .pipe(gulp.dest('./app/css/'))
});

//Source map
gulp.task('sourcemaps', function () {
  gulp.src('./app/css/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
        use:[rupture(),axis(),jeet()]
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css/'))
});

//Include html
gulp.task('fileinclude', function() {
  gulp.src('./app/html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './app/html/block_html/'
    }))
    .pipe(gulp.dest('./app/'));
});

//Jade
gulp.task('jade', function() {
  gulp.src('./app/html/*.jade')
    .pipe(data( function(file) {
            return require('./app/html/data.json');
    } ))
    .pipe(jade({
      pretty: true
    }).on('error', errorhandler))
    .pipe(gulp.dest('./app/'))
});

//Watcher
gulp.task('see',function(){
        gulp.watch('app/html/**/*.jade',['jade'])
        gulp.watch('app/css/*.styl',['stylus'])
})

gulp.task('include',function(){
        gulp.watch('app/html/**/*.html',['fileinclude'])
})


//Watcher server
gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        //reloadDelay: 300,
        server: {
            baseDir: "./app/",

        }
    });
    gulp.watch(["./app/**/**.*","!./app/bower/"]).on("change", browserSync.reload);
});

//Linters
gulp.task('html-lint', function() {
    gulp.src("./app/*.html")
      .pipe(htmlhint())
      .pipe(htmlhint.reporter("htmlhint-stylish"))
})



//default
gulp.task('use',[ 'prefix' , 'bower']);
gulp.task('img',[ 'imagePng' , 'imageJpg']);
//gulp.task('default',[  'see' , 'serve' ]);

gulp.task('default', function() {
  runSequence('see');
});

gulp.task('build', function() {
  runSequence('sourcemaps','prefix','imagePng','imageJpg','make');
});