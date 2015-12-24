var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/pdb";

function StartPaths(app){
	
	app.post('/partidas/getAllPartidas', function(req, res) {getPartidas(req,res);});
	app.post('/partidas/insertPartida', function(req, res) {insertPartida(req,res);});
	app.post('/partidas/deletePartida', function(req, res) {deletePartida(req,res);});
	app.post('/partidas/updatePartida', function(req, res) {updatePartida(req,res);});
	app.post('/partidas/filterPartida', function(req, res) {filterPartidas(req,res);});
}

function getPartidas(req, res) {
	var partidas = [];
	var id = parseInt(req.body.idPartida);
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").find({partidaId:id},  function(err, docs) {
			docs.each(function(err, doc) {
				if(doc) {
				   partidas.push(doc);
				}else{
					db.close();
					res.json(partidas);
					res.end();
				}
			});
		});
	});
}
						
function insertPartida(req, res) {
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").insert(req.body.partida,  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}

function deletePartida(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").remove({'_id':ObjectId(req.body._id)},  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}

function updatePartida(req, res) {
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

function filterPartidas(req, res) {
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
}

function filterDate(startDate, endDate, row){
	
	var rowDate = new Date(row.fecha);
	if(startDate != null)
		if(rowDate < startDate )
			return false;
	
	if(endDate != null)
		if(rowDate > endDate)
			return false;
	
	return true;
}

exports.startPaths = StartPaths;
