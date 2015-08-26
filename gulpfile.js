var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gutil = require('gulp-util'),
    ftp = require( 'vinyl-ftp' );
    
 
//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('app/css/'));
});

//Compress img
gulp.task('imagePng',function(){
            return gulp.src('app/img/*.png')
                .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [pngquant({quality: '40', speed: 4})]
                }))
                .pipe(gulp.dest('dist/img/'));
});

//Compress imgJpg
gulp.task('imageJpg',function(){
            return gulp.src('app/img/*.jpg')
            .pipe(imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    use: [imageminMozjpeg({quality: '60', speed: 11})]
                }))
            .pipe(gulp.dest('dist/img/'));
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
gulp.task('html', function () {
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
        host:     'mosbuscon.ru',
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
        .pipe( conn.newer( 'httpdocs/mosbuscon.ru/' ) )
        .pipe( conn.dest( 'httpdocs/mosbuscon.ru/' ) );

} );

//default
gulp.task('use',[ 'prefix' , 'bower']);
gulp.task('img',[ 'imagePng' , 'imageJpg']);
