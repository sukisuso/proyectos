var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";

function StartPaths(app){
	
	app.post('/user/getUser', function(req, res) {getUser(req,res);});
	app.post('/user/updateUser', function(req, res) {updateUser(req,res);});
}

function getUser(req, res) {
	var partidas = [];
	var ObjectId = require('mongodb').ObjectID;

	MongoClient.connect(dataBase, function(err, db) {
		db.collection("user").findOne({'_id': ObjectId(req.body._id)},  function(err, docs) {
			//docs.each(function(err, doc) {
				if(docs) {
					delete docs.login;
				    delete docs.pass;
				    partidas.push(docs);
					res.json(partidas);
					res.end();
					return;
				}else{
					db.close();
					res.status(500).send(false);
					res.end();
				}
			});
		//});
	});
}


function updateUser(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	console.log(req.body)
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("user").findOne({ '_id':ObjectId( req.body.user._id )} ,function(err, docs) {
			delete req.body.user._id;
			req.body.user.login = docs.login;
			req.body.user.pass = docs.pass;
			db.collection("user").update(docs, req.body.user , function(){
				res.send(true);
				res.end();
			});
		});
	});
}
exports.startPaths = StartPaths;
