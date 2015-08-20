var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    autoprefixer = require('gulp-autoprefixer');
    

//Prefix my css
gulp.task('prefix', function () {
    return gulp.src('wp-content/themes/app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 15 versions']
        }))
        .pipe(gulp.dest('wp-content/themes/app/'));
});




//wiredep
gulp.task('bower', function () {
    
  gulp.src('*.html')
    .pipe(wiredep({
      'directory' : "bower_components/",
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
        .pipe(gulp.dest(''));
});



