
/*
 * Router 
 * Jesús Juan Aguilar 02/2016
 * */
var login = require('./bo/login');
var user = require('./bo/user');
var estudios = require('./bo/estudios');
var experiencia = require('./bo/experiencia');
var aditionalinfo = require('./bo/aditionalinfo');
var pdf = require('./bo/pdf');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	login.startPaths(app);
	user.startPaths(app);
	estudios.startPaths(app);
	experiencia.startPaths(app);
	aditionalinfo.startPaths(app);
	pdf.startPaths(app);
}

exports.redirect = route;