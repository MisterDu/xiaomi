const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')
const webserver = require('gulp-webserver')

const sassHandler = () => {
  return gulp
  .src('./src/sass/*.scss')
  .pipe(sass())
  // .pipe(autoprefixer())
  // .pipe(cssmin())
  .pipe(gulp.dest('./dist/sass/'))
}
const cssHandler = () => {
  return gulp
  .src('./src/css/*.css')
  // .pipe(sass())
  .pipe(gulp.dest('./dist/css/'))
}
const htmlHandler = () => {
  return gulp
  .src('./src/pages/*.html')
  // .pipe()
  .pipe(gulp.dest('./dist/pages/'))
}
const jsHandler = () => {
  return gulp
  .src('./src/js/*.js')
  // .pipe(babel({presets:['@babel/env']}))
  // .pipe(uglify())
  .pipe(gulp.dest('./dist/js/'))
}
const imgHandler = () => {
  return gulp
  .src('./src/img/*.**')
  .pipe(gulp.dest('./dist/img/'))
}
const assetsHandler = () => {
  return gulp
  .src('./src/assets/*/**')
  .pipe(gulp.dest('./dist/assets/'))
}
const fontHandler = () => {
  return gulp
  .src('./src/font/*.**')
  .pipe(gulp.dest('./dist/font/'))
}
const phpHandler = () => {
  return gulp
  .src('./src/server/*.php')
  .pipe(gulp.dest('./dist/server/'))
}
const delHandler = () => {
  return del('./dist')
}
const webHandler = () => {
  return gulp
  .src('./dist/')
  .pipe(webserver({
    host: 'www.shadouyou.com',
    port: 8080,
    open: './pages/index.html',
    livereload: true,
    proxies:[
      {
        source:'/gx',
        target:'http://localhost:80/server/login.php'
      },
      {
        source:'/gx2',
        target:'http://localhost:80/server/getGoodsList.php'
      },
      {
        source:'/gx3',
        target:'http://localhost:80/server/getGoodsInfo.php'
      },
      {
        source:'/gx4',
        target:'http://localhost:80/server/getTotalPage.php'
      },
      {
        source:'/gx5',
        target:'http://localhost:80/server/getCateOne.php'
      },
      {
        source:'/gx6',
        target:'http://localhost:80/server/getCateTwo.php'
      },
      {
        source:'/gx7',
        target:'http://localhost:80/server/getCateThree.php'
      }
      
    ]
  }))
}
const watchHandler = () => {
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/sass/*.scss', sassHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/pages/*.html', htmlHandler)
}
const defaultHandler = gulp.series(
  delHandler,
  gulp.parallel(sassHandler, cssHandler, jsHandler, htmlHandler, imgHandler, phpHandler, assetsHandler, fontHandler),
  webHandler,
  watchHandler
)


module.exports.sassHandler = sassHandler
module.exports.cssHandler = cssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imgHandler = imgHandler
module.exports.assetsHandler = assetsHandler
module.exports.fontHandler = fontHandler
module.exports.phpHandler = phpHandler
module.exports.delHandler = delHandler
module.exports.default = defaultHandler