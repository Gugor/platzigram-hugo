var yo 			= require('yo-yo');
var layout		= require('../layout');
var pictureMini = require('../picture-card-mini');


console.log("Exportando template user");
module.exports = function templateUser (user) 
				{
					var el = yo`<div class="container">

								<div class="row user-profile-data">

									<div class="col s12 m2 avatar-box">
										<img src="/${user.avatar}" class="avatar-big" />
									</div>
									<div class="col s12 m10">
								
										<ul class="user-header"> 

											<li class="user-item-name">${user.username}</li>
											<li class="user-item-follow "><a href="#" class="btn btn-flat">Le sigues</a></li>
											<li class="user-item-more">...</li>
										</ul>
										<div class="decripcion">
											<p>Super descripción del mi perfil para que todo el mundo en Platzi lo lea... #platzi #noidejs</p>
										</div>
										<ul class="user-social row">
											<li>34 publicaciones</li>
											<li>4.000 seguidores</li>
											<li>25 seguidos</li>
										</ul>

									</div>

								</div>
								<div class="user-profile-pictures row">
									${user.pictures.map(function(pict) 
									{
										return yo`
											<div class="col s12 m6 l4">
												<div class="picture-container">
													<img src="/${pict.src}" class="picture" />
													<div class="likes">${pict.likes}</div>

												</div>
											</div>


										`;


									})};
								</div>								

			
							</div>`;
					
					return layout(el);
				}

