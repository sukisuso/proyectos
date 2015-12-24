var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/pdb";

function StartPaths(app){
	
	app.post('/proyectos/getAllProyectos', function(req, res) {getProyectos(req,res);});
	app.post('/proyectos/insertProyectos', function(req, res) {insertProyectos(req,res);});
	app.post('/proyectos/deleteProyectos', function(req, res) {deleteProyectos(req,res);});
	app.post('/proyectos/updateProyectos', function(req, res) {updateProyectos(req,res);});
	//app.post('/proyectos/filterProyectos', function(req, res) {filterPartidas(req,res);});
}

function getProyectos(req, res) {
	var proyectos = [];
	//var id = parseInt(req.body.idPartida);
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("proyectos").find({},  function(err, docs) {
			docs.each(function(err, doc) {
				if(doc) {
				   proyectos.push(doc);
				}else{
					db.close();
					res.json(proyectos);
					res.end();
				}
			});
		});
	});
}
						
function insertProyectos(req, res) {
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").insert(req.body.partida,  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}

function deleteProyectos(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").remove({'_id':ObjectId(req.body._id)},  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}

function updateProyectos(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	console.log(req.body)
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").findOne({ '_id':ObjectId( req.body.partida._id )} ,function(err, docs) {
			delete req.body.partida._id;
			db.collection("partidas").update(docs, req.body.partida , function(){
				res.send(true);
				res.end();
			});
		});
	});
}

/*function filterPartidas(req, res) {
	var partidas = [],
	 	tag = req.body._tag+"",
		startDate = null,
		endDate = null;
	
	if(req.body.startDate != undefined){
		startDate = new Date(req.body.startDate);
	}
	
	if(req.body.endDate != undefined){
		endDate = new Date(req.body.endDate);
	}
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").find({tag:{$regex:tag} },  function(err, docs) {
			docs.each(function(err, doc) {
				if(doc) {
					if(filterDate(startDate,endDate,doc))
				   		partidas.push(doc);
				}else{
					db.close();
					res.json(partidas);
					res.end();
				}
			});
		});
	});
}*/


exports.startPaths = StartPaths;
