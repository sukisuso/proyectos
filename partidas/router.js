
/*
 * Router partidas
 * Jesús Juan Aguilar 12/2015
 * */
var partidas = require('./nodeserver/bo/partidas');
var proyectos = require('./nodeserver/bo/proyectos');
var tareas = require('./nodeserver/bo/tareas');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	partidas.startPaths(app);
	proyectos.startPaths(app);
	tareas.startPaths(app);
}

exports.redirect = route;