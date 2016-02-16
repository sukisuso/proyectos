var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";

function StartPaths(app){
	
	app.post('/estudios/getUserEstudios', function(req, res) {getUserEstudios(req,res);});
	app.post('/estudios/insertUserEstudios', function(req, res) {insertUserEstudios(req,res);});
	app.post('/estudios/updatetUserEstudios', function(req, res) {updateUserEstudios(req,res);});
	app.post('/estudios/deleteUserEstudios', function(req, res) {deleteUserEstudios(req,res);});
}

function getUserEstudios(req, res) {
	var partidas = [];
	//var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("estudios").find({'userid': req.body.userid, 'curso':false},  function(err, docs) {
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


function insertUserEstudios(req, res) {
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("estudios").insert(req.body.estudio,  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}


function updateUserEstudios(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	console.log(req.body)
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("estudios").findOne({ '_id':ObjectId( req.body.partida._id )} ,function(err, docs) {
			delete req.body.partida._id;
			db.collection("estudios").update(docs, req.body.partida , function(){
				res.send(true);
				res.end();
			});
		});
	});
}


function deleteUserEstudios(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("estudios").remove({'_id':ObjectId(req.body._id)},  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}
exports.startPaths = StartPaths;
