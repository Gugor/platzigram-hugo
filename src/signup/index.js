var page 				= require('page');
var empty 				= require('empty-element');
var template 			= require('./template');
var title 				= require('title');


page('/signup', function(err,ctx,next)
{
	if(err) console.log(err);
	title('Platzigram - Signup');
	console.log(ctx);
	console.log('buscando main...');
	const main = document.getElementById('main-container');
	
	console.log('vaciando main y aplicando template...');
	empty(main).appendChild(template); //vaciamos el main con empty-element y luego añadimos el template ubicado en ./src/signup/template.js

});
