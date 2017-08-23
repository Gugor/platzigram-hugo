var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');   // HTML de la card
var translate = require('../translate');
var request = require('superagent');

console.log('Exportando template Home');
module.exports = function templateHome (pictures) 
{
	
	var el = yo`<div class="conatiner timeline">
					<div class="row">
						<div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
							<form enctype="multipart/form-data" class="form-upload" id="form-upload" onsubmit=${onSubmit}>
								<div id="fileName" class="fileUpload btn btn-flat cyan">
									<span> <i class="small material-icons">input</i>${translate.message('upload-picture')}</span>
									<input name="picture" id="file" type="file" class="upload" onchange=${onChange}/>
								</div> 
								<button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
								<button id="btnCancel" tpye="button" class="btn btn-flat red hide" onclick=${cancel}><i class="small material-icons">delete</i></button>
							</form>
					</div>
					<div class="row">
						<div class="col s12 m10 offset-m1 l6 offset-l3">
							${pictures.map(function (pic) 
										{
											console.log('Ensamblando pic...');
											return picture(pic);
										})
							}
						</div>
					</div>
  				</div>`;

  	function toggleButtons()
  	{
  		document.getElementById('fileName').classList.toggle('hide');
  		document.getElementById('btnUpload').classList.toggle('hide');
  		document.getElementById('btnCancel').classList.toggle('hide');
  	}
  	function onChange() 
  	{
  		toggleButtons();
  		console.log("Toggling");
  	}

  	function cancel() 
  	{
  		toggleButtons();
  		console.log("Untoggling");
  		document.getElementById('form-upload').reset();
  	}

  	function onSubmit(env) 
  	{
  		env.preventDefault(); // Canvelamos el evento antes de que ocurra para poderlo modificar a nuestro antojo

  		var data = new FormData(this);    // Recuperamos los datos del formulario 'this' se refiere al formulario enviado

  		// Realizamos una petición a '/api/pictures' y le enviamos los datos del fromulario por post
  		request
  			.post('/api/pictures')
  			.send(data)
  			.end(function(err,res)
  			{
  				toggleButtons();
      			document.getElementById('form-upload').reset();
  				console.log(arguments); // Variable que recibe tódos los parámetros de una función
  			})

  	}

	
	return layout(el);

}



