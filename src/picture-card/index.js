var yo = require('yo-yo');
var translate = require ('../translate');


module.exports = function pictureCard(pic)
{		
	var el;			
	function render(picture) {
					console.log("Ensamblando template car con objeto de array pictures");
					return yo`<div class="card ${picture.liked ? 'liked' : ''} ${console.log(picture.liked)}">
							    
							    <div class="card-image">
							      <img class="activator" src="${picture.url}">
							    </div>
							    
							    <div class="card-content">
							      <a href="/${picture.user.username}" class="card-title">
										
									<img src="${picture.user.avatar}" class="avatar"/>
									<span class="username">${picture.user.username}</span>	
							      </a>
							      
							      <small class="right time">${translate.date.format(picture.createdAt)}</small>
							      
							      <p> 
									<a class="left" href="#" onclick=${like.bind(null, true)}><img src="heart2.png" class="likes-ico heart1"/></a>
									<a class="left" href="#" onclick=${like.bind(null, false)}><img src="heart.png" class="likes-ico heart2"/></a>
									<span class="left likes"> ${translate.message('likes', {likes : picture.likes})}</span>
							      </p>
							    </div>

						    </div>`;

	}


	function like(liked) 
	{
		console.log("Sumando likes...")
		pic.liked = liked;
		pic.likes += liked ? 1 : -1;
		let newEl = render(pic);
		yo.update(el, newEl);
		return false;
	}


	el = render(pic);

	return el;
}