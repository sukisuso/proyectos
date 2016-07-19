/**
* Mongo CRUD Servers - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/nodeservers");
var Server = require('../models/Server')(mongoose);
var ObjectId = mongoose.Types.ObjectId;

function StartPaths(app){
	
	app.post('/servers/getAllServers', function(req, res) {getServers(req,res);});
	app.post('/servers/insertServer', function(req, res) {insertServer(req,res);});
	app.post('/servers/deleteServer', function(req, res) {deleteServer(req,res);});
	app.post('/servers/updateServer', function(req, res) {updateServer(req,res);});
}

function getServers(req, res) {

	Server.find(function (err, docs) {
		if (!err) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs));
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
			res.end();
		}
	});
}
						
function insertServer(req, res) {
	var sv = new Server({
		name: req.body.server_name,
    	path: req.body.server_path,
    	file: req.body.server_file,
    	port: req.body.server_port
	});
	
	sv.save(function (err) {
		if (!err) {
			res.send(true);
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido insertar.'});
			res.end();
		}
	});
	
}

function deleteServer(req, res) {
	Server.findOneAndRemove({ _id: ObjectId(req.body._id) }, function(err) {
	  if (err) throw err;

	  	res.send(true);
		res.end();
	});
}

function updateServer(req, res) {
	Server.findOneAndUpdate({ _id: ObjectId(req.body._id) },
	 { 
	 	name: req.body.server_name,
	 	path: req.body.server_path,
	 	file: req.body.server_file,
	 	rt: req.body.server_port
	 }
	, function(err, user) {
	  if (err) throw err;
	  	res.send(true);
		res.end();
	});
}

exports.startPaths = StartPaths;
