var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
// var request = require('superagent'); // Realiza Peticiones http al servidor
var header = require('../header');
var axios = require('axios');


// Page recibe una serie de funciones que ejecuta de isquierda a derecha. 
// @ Header : inserta el header en la página
// @ loadPicturesFetch : realiza una petición a '/api/pictures' la cual devuelve el objeto pictures y lo imprieme, a través de 'page' en la plantilla de la página
page('/', header, loadPicturesFetch , function(ctx,next)
{
	title('Platzigram');
	var main = document.getElementById('main-container');
	
	console.log("Añadiendo template home...");
	empty(main).appendChild(template(ctx.pictures));    // aquí imprimimos la plantilla de la card con las propiedades del objeto pictures obtenido por una petición en loadPictures
	//empty(main).appendChild(template); //vaciamos el main con empty-element y luego añadimos el template ubicado en ./src/signup/template.js

});

/*
** Aquí podemos ver diferentes métodos para hacer peticiones al servidor
** @ Superagent $ npm i superagent --save
** @ Axios $ npm i axios --save
** @ Fetch que es una librería nativa del navegador
*/


/*
* Axios está basado en un método que se llama 'promesas', surgen como una forma de
* librarse del 'callback hell' dónde los calbacks terminan anindándose unos dentros de otros
* y el código termina convirtiéndose en un galimatías inteligible. 
*/
function loadPicturesAxios(ctx, next)
{
	// Objeto axio requerido más arriba
	axios 
		.get('/api/pictures')    // Hacemos la petición a la ruta de la que deseamos obtener una respuesta
		.then(function(res)      // Mediante la promesa obtenemos el resultado de la petición en un objeto JSON
		{
			ctx.pictures = res.data;    // El objeto dónde se encuentra el detalle de la petición es '.data' y se lo pasamos al contecto por medio de la varaible global pictures que creamos exprofeso
			next();    			// Dejamos que la siguiente acción se realice
		})
		.catch(function(err)  	// En el caso de que haya algun erro lo devolvemos por consola
		{
			console.log(err);
		})

};

/*
* Fetch es una librería nativa de los navegadores (excepto safari) que utiliza al igual que axio
* promesas para realizar las peticiones al navegador
*/

function loadPicturesFetch (ctx, next) 
{
	fetch('/api/pictures')
		.then(function(res)
		{
			return res.json();     // En este caso en la primera promesa llamamos al método json() que nos devuelve un objeto
		})
		.then(function(pictures)  // La segunda promesa recoge este objeto
		{
			ctx.pictures = pictures;   // Asignamos el objeto al contexto por medio de una variable global 'pictures'
			next();						// Terminamos la petición para que otros procesos puedan darse
		})

}

// function loadPictures(ctx, next)
// {

// 	request 
// 		.get('/api/pictures')
// 		.end(function(err,res)
// 		{
// 			if(err) return console.log("REQUEST ERROR://" + err);
// 			console.log("Mostrando objeto context de la petición por consola")
// 			console.log(JSON.stringify(ctx.pictures));
// 			ctx.pictures = res.body;
// 			console.log(JSON.stringify(ctx.pictures));
// 			console.log('yay got ' + JSON.stringify(res.body));
// 			next();
// 		})

// };