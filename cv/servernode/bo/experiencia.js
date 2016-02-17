var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";

function StartPaths(app){
	
	app.post('/experiencia/getUserExp', function(req, res) {getUserExp(req,res);});
	app.post('/experiencia/insertUserExp', function(req, res) {insertUserExp(req,res);});
	app.post('/experiencia/updatetUserExp', function(req, res) {updatetUserExp(req,res);});
	app.post('/experiencia/deleteUserExp', function(req, res) {deleteUserExp(req,res);});
	
}

/*
* Funciones, Estudios
*/
function getUserExp(req, res) {
	var partidas = [];
	//var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("experiencia").find({'userid': req.body.userid, 'practicas':false},  function(err, docs) {
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


function insertUserExp(req, res) {
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("experiencia").insert(req.body.estudio,  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}


function updatetUserExp(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	console.log(req.body)
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("experiencia").findOne({ '_id':ObjectId( req.body.partida._id )} ,function(err, docs) {
			delete req.body.partida._id;
			db.collection("experiencia").update(docs, req.body.partida , function(){
				res.send(true);
				res.end();
			});
		});
	});
}


function deleteUserExp(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("experiencia").remove({'_id':ObjectId(req.body._id)},  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}


exports.startPaths = StartPaths;
