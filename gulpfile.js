var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    ftp = require( 'vinyl-ftp' ),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;
    
 
//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//Compress img
//gulp.task('imagePng',function(){
//            return gulp.src('app/img/*.png')
//                .pipe(imagemin({
//                    progressive: true,
//                    svgoPlugins: [{removeViewBox: false}],
//                    use: [pngquant({quality: '40', speed: 4})]
//                }))
//                .pipe(gulp.dest('dist/img/'));
//});

//Compress imgJpg
//gulp.task('imageJpg',function(){
//            return gulp.src('app/img/*.jpg')
//            .pipe(imagemin({
//                    progressive: true,
//                    svgoPlugins: [{removeViewBox: false}],
//                    use: [imageminMozjpeg({quality: '60', speed: 11})]
//                }))
//            .pipe(gulp.dest('dist/img/'));
//});


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


gulp.task( 'ftp', function() {
    var conn = ftp.create( {
        host:     'ineed.site',
        user:     'u6929655',
        password: 'YDW2wJI4',
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
    .pipe(stylus())
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

gulp.task('see',function(){
        gulp.watch('app/css/*.styl',['stylus'])
        gulp.watch('app/css/*.styl',['sourcemaps'])
})


gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
    gulp.watch("./app/**/**.*").on("change", browserSync.reload);
});

//default
gulp.task('use',[ 'prefix' , 'bower']);
gulp.task('img',[ 'imagePng' , 'imageJpg']);
gulp.task('default',[  'see' , 'serve' ]);
 
