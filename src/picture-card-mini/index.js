var yo = require('yo-yo');


module.exports = function templatePCM(user) 
{

	var el = yo`<div class="col s12 m3 l3 picture-card-mini">
				<img src="user.picture" id="${id}" class="picture-card-min-image"/>
				

				<div class="overlay-hover">
					<div class="filtered-likes">30 likes</div>
				</div>
			</div>`;


	return el;
}



