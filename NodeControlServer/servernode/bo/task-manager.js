
function StartPaths(app){
	
	app.post('/task/startServer', function(req, res) {startServer(req,res);});
	app.post('/task/killServer', function(req, res) {killServer(req,res);});
	app.post('/task/isAliveServer', function(req, res) {isAliveServer(req,res);});
}

function startServer(req, res) {
	res.send(true);
	res.end();
}
						
function killServer(req, res) {
	res.send(true);
	res.end();
}

function isAliveServer(req, res) {
	res.send(true);
	res.end();
}

exports.startPaths = StartPaths;