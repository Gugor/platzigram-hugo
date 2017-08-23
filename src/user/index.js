var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
// var request = require('superagent'); // Realiza Peticiones http al servidorvar header = require('../header');
//var axios = require('axios');


// Page recibe una serie de funciones que ejecuta de isquierda a derecha. 
// @ Header : inserta el header en la página
// @ loadPicturesFetch : realiza una petición a '/api/pictures' la cual devuelve el objeto pictures y lo imprieme, a través de 'page' en la plantilla de la página
page('/:username', header, loadUser, function(ctx,next)
{
	//if(err) console.log(err);
	title(`Platz¡gram - ${ctx.params.username} `);
	var main = document.getElementById('main-container');
	// if(main != 'undefined') { return console.log('El main ha sido obtenido')}
	console.log("Añadiendo template user...");
	empty(main).appendChild(template(ctx.user));    // aquí imprimimos la plantilla de la card con las propiedades del objeto pictures obtenido por una petición en loadPictures
	//empty(main).appendChild(template); //vaciamos el main con empty-element y luego añadimos el template ubicado en ./src/signup/template.js


});

async function loadUser (ctx, next)
{
	try 
	{
		ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(function fetchingJSONUSER(res) 
		{
		 	return res.json();
		});
		
		console.log("JSON error: ")
		console.log(JSON.parse(ctx.user));
		next();
	}
	catch (err) 
	{
		console.log(err);
	}
} 

