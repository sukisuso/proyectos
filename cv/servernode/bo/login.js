var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";

function StartPaths(app){
	
	app.post('/fwk/login', function(req, res) {checkLogin(req,res);});
	
}

function checkLogin(req, res) {
	var partidas = [];

	MongoClient.connect(dataBase, function(err, db) {
		db.collection("user").findOne({login:req.body.login, pass:req.body.pass},  function(err, docs) {
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

exports.startPaths = StartPaths;
