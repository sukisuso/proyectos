
/*
 * Router partidas
 * Jesús Juan Aguilar 12/2015
 * */
var partidas = require('./nodeserver/bo/partidas');
var proyectos = require('./nodeserver/bo/proyectos');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	partidas.startPaths(app);
	proyectos.startPaths(app);
}

exports.redirect = route;