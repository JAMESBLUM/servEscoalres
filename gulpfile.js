//GULP Y SASS NOS VA A AYUDAR PARA AUTOMATIZAR TAREAS CON UNAS PROPIEDADES DE CODIGO
const { series, src, dest, watch }= require('gulp'); //Importa gulp del node_modules, "series" nos permite ejecutar una funcion y luego otra
const sass = require('gulp-sass'); //Cuando no hay llaves quiere decir que solo existe un solo paquete y cuando las hay tiene varios paquetes.
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//Utilidades CSS
const autoprefixer = require("autoprefixer"); //Nos permite agregar prefijos
const postcss = require("gulp-postcss"); //Nos agrega un cierto procesamiento a nuestro CSS
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

//Utilidades Js
const terser = require("gulp-terser-js"); //Minifica el codigo de JS
const rename = require("gulp-rename");

//---------- RUTAS ----------
const paths={
  imagenes: 'src/img/**/*',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
}

/*---------- FUNCION DE COMPILA SASS ----------*/
function css(  ){
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe( sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('./build/css') )
}

//JAVASCRIPT
function javascript(){
  return src(paths.js)
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest("./build/js"))
}

//Compresor de imagenes
function compresorImg(){
  return src(paths.imagenes) /*Va a leer todo el contenido de la carpeta img*/
  .pipe( imagemin() )
  .pipe( dest('./build/img')) //dest es el destino donde se importa gracias a la API de gulp
  .pipe(notify({message:'Imagen comprimida'}));
}
//Coversor a imagenes webp
function versionWebp(){
  return src(paths.imagenes)
  .pipe(webp())
  .pipe(dest('./build/img'))
  .pipe(notify({message:"Conversion webp realizada con exito"}))

}

/*Cuando haces una modificacion en el archivo SASS la funcion watch compilara la tarea que le especifiques,
cuando quieras dejar de compilarlo solo presiona: ctrl + c */
function refresh(){
  watch(paths.scss, css) //* = a la carpeta actual y **/* = todos los archivos con esa extension
  watch(paths.js, javascript)
}

exports.css = css; //exporta hacer disponible nuestro codigo de forma externa
exports.refresh = refresh;
exports.compresorImg = compresorImg; 

exports.default = series(css, javascript,compresorImg, versionWebp,refresh); //Compila dos tareas asignadas por default a Gulp