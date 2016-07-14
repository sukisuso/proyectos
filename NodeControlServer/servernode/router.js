
/*
 * Router 
 * Jesus Juan Aguilar 07/2016
 * */

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});

}

exports.redirect = route;