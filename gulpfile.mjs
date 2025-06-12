import { src, dest, watch, series, parallel } from 'gulp'
import pug from 'gulp-pug'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import browserSync from 'browser-sync'
import { deleteAsync } from 'del'
import gulpIf from 'gulp-if'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const sass = gulpSass(dartSass)
const argv = yargs(hideBin(process.argv)).argv
const isProd = !!argv.prod

// Пути
const paths = {
  pug: {
    src: 'src/**/*.pug',
    dest: 'dist/',
  },
  styles: {
    src: 'src/**/*.scss',
    dest: 'dist/',
  },
  scripts: {
    src: 'src/**/*.js',
    dest: 'dist/',
  },
  images: {
    src: 'src/assets/images/**/*.{jpg,jpeg,png,svg,webp}',
    dest: 'dist/assets/images',
  },
  icons: {
    src: 'src/assets/icons/**/*.{png,svg}',
    dest: 'dist/assets/icons',
  },
  fonts: {
    src: 'src/assets/fonts/**/*',
    dest: 'dist/assets/fonts',
  },
}

// Очистка dist
const clean = () => deleteAsync(['dist'])

// Pug -> HTML
const compilePug = () => {
  return src(paths.pug.src)
    .pipe(pug({ pretty: !isProd }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream())
}

// SCSS -> CSS
const compileStyles = () => {
  return src(paths.styles.src)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulpIf(isProd, postcss([cssnano()])))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream())
}

// JS
const compileScripts = () => {
  return src(paths.scripts.src)
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream())
}

// Images
const compileImages = () => {
  return src(paths.images.src, { encoding: false }).pipe(
    dest(paths.images.dest)
  )
}

const compileIcons = () => {
  return src(paths.icons.src, { encoding: false }).pipe(dest(paths.icons.dest))
}

// Fonts
const compileFonts = () => {
  return src(paths.fonts.src, { encoding: false }).pipe(dest(paths.fonts.dest))
}

// Сервер
function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  })

  watch(paths.pug.src, compilePug)
  watch(paths.styles.src, compileStyles)
  watch(paths.scripts.src, compileScripts)
  watch(paths.images.src, compileImages)
  watch(paths.icons.src, compileIcons)
  watch(paths.fonts.src, compileFonts)
}

// Сборка
const build = series(
  clean,
  parallel(
    compilePug,
    compileStyles,
    compileScripts,
    compileImages,
    compileIcons,
    compileFonts
  )
)
const dev = series(build, serve)

// Экспорт
export { clean, build, dev }
export default dev
