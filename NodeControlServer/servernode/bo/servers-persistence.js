var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/nodeservers";

function StartPaths(app){
	
	app.post('/servers/getAllServers', function(req, res) {getServers(req,res);});
	app.post('/servers/insertServer', function(req, res) {insertServer(req,res);});
	app.post('/servers/deleteServer', function(req, res) {deleteServer(req,res);});
	app.post('/servers/updateServer', function(req, res) {updateServer(req,res);});
}

function getServers(req, res) {
	
}
						
function insertPartida(req, res) {
	
	
}

function deletePartida(req, res) {
	
}

function updatePartida(req, res) {
	
}

function filterPartidas(req, res) {
	
}


exports.startPaths = StartPaths;
