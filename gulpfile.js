var 
    gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    concatCss       = require('gulp-concat-css'),
    replace         = require('gulp-replace'),
    cleanCSS        = require('gulp-clean-css'),
    imagemin        = require('gulp-imagemin'),
    fileinclude     = require('gulp-file-include'),
    htmlmin         = require ('gulp-htmlmin'),
    uglify          = require('gulp-uglify');
// --

// Соблюдаем последовательность подключения!
var scripts = [

    // ------------------------ Библиотеки ------------------------
    './node_modules/underscore/underscore-min.js',
    './node_modules/backbone/backbone-min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './src/js/pace-config.js',
    './node_modules/pace-js/pace.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
 
    // ------------------------  Файлы приложения ------------------------
    
    './src/js/app/app.js',
    './src/js/app/router.js',

    // Module Managers
    './src/js/app/moduleManagers/**/*.js',
    
    // Components
    './src/js/app/components/**/*.js',
    
    // Widgets
    './src/js/app/widgets/**/*.js',
    
    // Views
    './src/js/app/views/**/*.js',
    
    // Models
    './src/js/app/models/**/*.js',
    
    // Controllers
    './src/js/app/controllers/**/*.js',
    
    // Запуск приложения
    './src/js/app/autorun.js'
    
];

var css = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/pace-js/themes/red/pace-theme-minimal.css',
    './src/css/style.css'
];

var fonts = [
    './node_modules/bootstrap/dist/fonts/**/*'
];

var html = [
    './src/html_templates/index.html'
];

var imgs = [
    './imgs/**/*'
];

gulp.task('js', function() {
    return gulp.src(scripts)
    .pipe(uglify())
    .pipe(concat('./bundle.js'))
    .pipe(gulp.dest('./web/assets/js/'));
});

gulp.task('css', function () {
    return gulp.src(css)
    //.pipe(replace('../fonts/', 'assets/fonts/'))
    .pipe(concatCss("./bundle.css"))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./web/assets/css/'));
});

gulp.task('fonts', function () {
    return gulp
    .src(fonts)
    .pipe(gulp.dest('./web/assets/fonts'));
});

gulp.task('html', function () {
    return gulp.src(html)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./web'));
});
/*
gulp.task('images', function () {
    return gulp
    .src(imgs)
    .pipe(imagemin())
    .pipe(gulp.dest('../uploads/images'));
});
*/
gulp.task('default', [
    'js',
    'css',
    'fonts',
    'html'
]);