var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    fileinclude = require('gulp-file-include'),
    axis = require('axis'),
    jeet = require('jeet'),
    htmlhint = require("gulp-htmlhint"),
    rupture = require('rupture'),
    jade = require('gulp-jade');    
    

//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});


//wiredep
gulp.task('bower', function () {

  gulp.src('./app/index.html')
    .pipe(wiredep({
      'directory' : "app/bower/",
        "overrides":{
            "bootstrap":{
                "main":[
                "./dist/css/bootstrap.min.css",
                "./dist/js/bootstrap.min.js"

                ]
            },
            "owlcar":{
                "main":[
                "./owl-carousel/owl.carousel.css",
                "./owl-carousel/owl.carousel.min.js"

                ]
            }
        }
        }))
        .pipe(gulp.dest('./app'));
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
        host:     '',
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
        .pipe( conn.newer( 'httpdocs/ineed.site/' ) )
        .pipe( conn.dest( 'httpdocs/ineed.site/' ) );

} );


//Stylus
gulp.task('stylus', function () {
  gulp.src('./app/css/*.styl')
    .pipe(stylus({
        use:[rupture(),axis(),jeet()]
        }))
    .pipe(gulp.dest('./app/css/'))
});

//Source map
gulp.task('sourcemaps', function () {
  gulp.src('./app/css/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
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
    .pipe(jade({
      pretty: true
    }))
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
        server: {
            baseDir: "./app/"
        }
    });
    gulp.watch(["./app/**.*","./app/css/**.*","./app/js/**.*","./app/html/**/**.*"]).on("change", browserSync.reload);
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
gulp.task('default',[  'see' , 'serve' ]);

