
/*
 * Router 
 * Jesus Juan Aguilar 07/2016
 * */
var sp =  require('./bo/servers-persistence');
var task =  require('./bo/task-manager');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});

	
	sp.startPaths(app);
	task.startPaths(app);
}

exports.redirect = route;