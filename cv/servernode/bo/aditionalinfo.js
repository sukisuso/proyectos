var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";

function StartPaths(app){
	
	app.post('/aditionalinfo/getUserInfo', function(req, res) {getUserInfo(req,res);});
	app.post('/aditionalinfo/updatetUserInfo', function(req, res) {updatetUserInfo(req,res);});
}

/*
* Funciones, Estudios
*/
function getUserInfo(req, res) {
	var partidas = [];
	//var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("aditionalinfo").findOne({'userid': req.body.userid},  function(err, docs) {
			//docs.each(function(err, doc) {
				if(docs) {
				   partidas.push(docs);
					db.close();
					res.json(partidas);
					res.end();
				}else{
					db.close();
					res.send(false);
					res.end();
				}
			//});
		});
	});
}

function updatetUserInfo(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	console.log(req.body)
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("aditionalinfo").findOne({ 'userid': req.body.partida.userid } ,function(err, docs) {
			console.log(docs);
			 if (docs == null) {
				 console.log("error");
				 db.collection("aditionalinfo").insert(req.body.partida,  function(err, docs) {
					res.send(true);
					res.end();
				});
			 }else{
				delete req.body.partida._id;
				db.collection("aditionalinfo").update(docs, req.body.partida , function(){
					res.send(true);
					res.end();
				});
			}
		});
	});
}



exports.startPaths = StartPaths;
