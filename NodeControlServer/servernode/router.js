
/*
 * Router 
 * Jesus Juan Aguilar 07/2016
 * */
var sp =  require('./bo/servers-persistence');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});

	
	sp.startPaths(app);
}

exports.redirect = route;