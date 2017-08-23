var yo = require('yo-yo');
var translate = require('../translate');


var el = yo`<footer class="site-footer">
		<div class="container">
				<div class="row">
				<div class="col s12 l3 center-align">
					<ul id="dropdown2" class="dropdown-content">
					    <li><a href="#!" onclick=${lang.bind(null,'es')}>${translate.message('spanish')}</a></li>
					    <li><a href="#!" onclick=${lang.bind(null,'en-US')}>${translate.message('english')}</a></li>
					 </ul>
					 <a class="btn dropdown-button btn-flat" href="#!" data-activates="dropdown2">${translate.message('language')}<i class="mdi-navigation-arrow-drop-down right"></i></a>
            
				</div>
				<div class="col s12 l3 push-l6 center-align">
					© 2016 Plaztigram
				</div>
			</div>
		</div>
		
	</footer>`;

function lang(locale) 
{
	console.log('Cambiando idoma...');
	if(localStorage.locale != locale)
	{

		localStorage.locale = locale;
		location.reload();	
		console.log('Idioma cambiado a ' + locale);
		return false;
	}
	else 
	{
		console.log("El idioma seleccionado es el idioma actual");
		return false;

	}	
	
}

document.body.appendChild(el);



			