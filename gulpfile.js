/*/////////////////////////////////////////////////////////////////////////////
//// Para escribir una tarea de gulp en la terminal $ 'gulp [nombre tarea]' ///
////////////////////////////////////////////////////////////////////////////*/

/*
* Este archivo compila los estilos sass [index.scss] porcesándolos en sass devolviendo un archivo [index.css] que guardará
* en la carpeta "/public".
*/

var gulp 			= require("gulp"); // Busca dentro de la carpeta node_module el archivo gulp y lo devuelve
var sass 			= require("gulp-sass");
var rename 			= require("gulp-rename");
var preset 			= require("babel-preset-es2015");
var browserify 		= require("browserify");				// Package bundler o paquete instalador??
var source 			= require("vinyl-source-stream");
var babel 			= require('babelify');	
var watchify		= require('watchify');				

/* 
* Le decimos a Gulp que tome los estilos del archivo index.scss los procese con sass, los renombre como 'app.css'
* y los copie en la carpeta public
*/
gulp.task('styles', function ()
{
	gulp
		.src('index.scss') 			// Obtener los estilos
		.pipe(sass())				// Procesarlos en sass
		.pipe(rename('app.css'))	// Renombrar "index.css" (ya es un archivo .css no .scss) a "app.css"
		.pipe(gulp.dest('public'))  // Copia el archivo y lo pega en la carpeta public
});

/*
* Hacemos que gulp cree una carpeta 'public' y que se traiga todos los archivos de assets
*/
gulp.task('assets', function () 
{
	gulp 
		.src('assets/*')
		.pipe(gulp.dest('public'));
});


/*
* Compila los script js una vez y en caso de que watch este activado
* vigila los cambios en el documento index.js y lanza 'rebundle()'
* @param {Boolean} watch
*/

function compile(watch) 
{
	var bundle = watchify(browserify('./src/index.js')); // Browserify requiere un archivo empezando por '.' de ahí './src/index.js' y watch vigila si existen cambios

	/*
	* Compilamos los scripts js y los guardamos 
	* en la carpeta 'public'
	*/
	function rebundle() 
	{		
		  console.log('Compilando ECMA16 a commons...');
		  bundle										
		    .transform(babel, {presets: ["es2015"]}) 	// Func Babel complia el archivo index.js y lo hace compatible con el cliente
		    .bundle()
		    .on('error', function (err) { console.log(err); this.emit('end'); })									// Compilamos el bundle
		    .pipe(source('index.js'))					// 
		    .pipe(rename('app.js'))
		    .pipe(gulp.dest('public'));
		    

	}
	if(watch) 
	{
		bundle.on('update', function() // Cuando el bundle se actualice
		{				
			console.log('--> Bundling...');
			rebundle();
			console.log('--> Bundled...');

		});
	}
	console.log('--> Bundling...');
	rebundle();
	console.log('--> Bundled...');
}

/*
*	Compila los scripts con gulp
*/
gulp.task('build', function() 
{
	return compile(); 
});

/*
* Vigila los cambios en los archivos de script y si hay cambios los recompila
* automaticamente
**/
gulp.task('watch', function()
{
	return compile(true);

});



/*
* Esta línea ejecuta por defecto el resto de las tareas de este archivo. 
* Cada vez que se ejecuta en terminal en la carpeta del proyecto $ gulp 
* (previamente ha debido ser intalado de forma global '$ npm i gulp -g')
*/
gulp.task('default', ['styles', 'assets','build']);  // 





