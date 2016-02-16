
/*
 * Router 
 * Jesús Juan Aguilar 12/2015
 * */
var login = require('./bo/login');
var user = require('./bo/user');
var estudios = require('./bo/estudios');
/*var agenda = require('./nodeserver/bo/agenda');
var chart = require('./nodeserver/bo/chart');*/

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	login.startPaths(app);
	user.startPaths(app);
	estudios.startPaths(app);
	/*tareas.startPaths(app);
	agenda.startPaths(app);
	chart.startPaths(app);*/
}

exports.redirect = route;