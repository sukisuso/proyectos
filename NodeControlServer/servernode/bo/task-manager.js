/**
* Task manager for Servers - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*/

var run = require('../run-server');


function StartPaths(app){
	
	app.post('/task/startServer', function(req, res) {startServer(req,res);});
	app.post('/task/killServer', function(req, res) {killServer(req,res);});
	app.post('/task/isAliveServer', function(req, res) {isAliveServer(req,res);});
}

function startServer(req, res) {
	
	res.send(run.start(req.body.server_path, req.body.server_file));
	res.end();
}
						
function killServer(req, res) {
	run.kill(req.body.process_id);
	res.send(true);
	res.end();
}

function isAliveServer(req, res) {
	run.alive(req.body.process_id, res);
}

exports.startPaths = StartPaths;