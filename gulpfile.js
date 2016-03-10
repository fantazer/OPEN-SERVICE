var ftpConf = {
  "user":"",
  "pass":"",
  "name":"catalog"
}

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
var cache = require('gulp-cached');
var newer = require('gulp-newer');


// ########## make img ###############
gulp.task('imagePng',function(){
 return gulp.src('app/img/*.png')
     .pipe(newer('dist/img/'))
     .pipe(imagemin({
         progressive: true,
         svgoPlugins: [{removeViewBox: false}],
         use: [pngquant({quality: '70', speed: 11})]
     }))
     .pipe(gulp.dest('dist/img/'));
 });

gulp.task('imageJpg',function(){
  return gulp.src('app/img/*.jpg')
  .pipe(newer('dist/img/'))
  .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [imageminMozjpeg({quality: '70', speed: 11})]
      }))
  .pipe(gulp.dest('dist/img/'));
});

// ########## make css ###############

//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//Stylus
gulp.task('stylus', function () {
  return gulp.src('./app/css/*.styl')
    .pipe(cache('stylus'))
    .pipe(stylus({
        use:[rupture(),axis(),jeet()]
        })).on('error', errorhandler)
    .pipe(gulp.dest('./app/css/'))
  
});

//Source map
gulp.task('sourcemaps', function () {
  return gulp.src('./app/css/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
        use:[rupture(),axis(),jeet()]
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css/'))
});

// ########## make css end ###############

// ########## make html ###############

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
  return gulp.src('./app/html/**/**.jade')
    .pipe(cache('jade'))
    .pipe(data( function(file) {
            return require('./app/html/data.json');
    } ))
    .pipe(jade({
      pretty: true
    }).on('error', errorhandler))
    .pipe(gulp.dest('./app/'))
});

gulp.task('include',function(){
        gulp.watch('app/html/**/*.html',['fileinclude'])
})
// ########## make html end###############


// ########## make service###############
//copy file
gulp.task('copy:font',function(){
  return gulp.src('./app/fonts/**.*')
         .pipe(gulp.dest('./dist/fonts/'))
  })

gulp.task('copy:js',function(){
  return gulp.src('./app/js/script.js')
         .pipe(gulp.dest('./dist/js/'))
  })

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

//useref
gulp.task('make', function () {
  var assets = useref.assets();
   gulp.src('app/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));

   gulp.src('app/css/style.css')
  .pipe(minifyCss())
  .pipe(gulp.dest('dist/css/'));
  return gulp.src('app/*.html')
      .pipe(assets)
      .pipe(gulpif('*.js', uglify()))
      //.pipe(gulpif('*.css', minifyCss()))
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('dist'));
});

//Ftp
gulp.task( 'ftp', function() {
    var conn = ftp.create( {
        host:     'one.web-kuznetcov.ru',
        user:     ftpConf.user,
        password: ftpConf.pass,
        parallel: 21,
    } );
    var globs = [
        'dist/**',
        'dist/*.html'
    ];
   return gulp.src(globs)
        .pipe( conn.newer( 'httpdocs/one.web-kuznetcov.ru/'+ftpConf.name) )
        .pipe( conn.dest( 'httpdocs/one.web-kuznetcov.ru/'+ftpConf.name) );

} );

//LiveReload
gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app/",
        }
    });
    browserSync.watch(["./app/css/**/*.css","./app/*.html","./app/js/**.*"]).on("change", browserSync.reload);
});

// ########## make service end ###############

//Watcher
gulp.task('see',function(){
        gulp.watch('app/html/**/*.jade',['jade'])
        gulp.watch('app/css/*.styl',['stylus'])
})

//default
gulp.task('img',['imagePng' , 'imageJpg']);
gulp.task('default', ['serve','see']);
gulp.task('build',['sourcemaps','copy:font','prefix','img','make']);
gulp.task('fast-build',['stylus','prefix','jade','copy:js','ftp']);



gulp.task('fast-see',function(){
        gulp.watch(["./app/css/**/**.styl","./app/html/**.jade","./app/js/**.*"] ,gulp.series('fast-build'))
})


//gulp.task('default', function() {
//  runSequence('see');
//});

