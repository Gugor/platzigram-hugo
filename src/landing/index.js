var yo = require('yo-yo');

console.log('Exportando Modulo landing...');
module.exports =  function landing(box) 
{
	return yo`<div class="container landing">
						<div class="row">
							
							<div class="col s10 push-s1">
								
								<div class="row">
									
									<div class="col m5 hide-on-small-only">

										<img class="iphone" src="iphone.png" alt=""/>

									</div>
									
									
										
										${box}

									

								</div>

							</div>

						</div>

				</div>`;
}
