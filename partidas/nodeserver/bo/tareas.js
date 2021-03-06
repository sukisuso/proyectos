var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/pdb";

function StartPaths(app){
	
	app.post('/tareas/getAllTareas', function(req, res) {getTareas(req,res);});
	app.post('/tareas/saveAllTareas', function(req, res) {saveTareas(req,res);});
	app.post('/tareas/updateTarea', function(req, res) {updateTarea(req,res);});
}

function getTareas(req, res) {
	var partidas = [];
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("tareas").find({idProyecto:req.body.idProyecto},  function(err, docs) {
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
						
function saveTareas(req, res) {
	
	var data = req.body.dataTareas;
	var stringId = req.body.idProyecto+"";
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("tareas").remove({idProyecto:stringId},  function(err, docs) {
			for(var i = 0; i < data.length; i++){
				delete data[i]._id;
				db.collection("tareas").insert(data[i]);
			}
			res.send(true);
			res.end();
		});
	});
}

function updateTarea(req,res){
	var ObjectId = require('mongodb').ObjectID;
	console.log( req.body.tarea._id);
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("tareas").findOne({ '_id': ObjectId(req.body.tarea._id) } ,function(err, docs) {
			delete req.body.tarea._id;
			console.log(docs);
			db.collection("tareas").update(docs, req.body.tarea , function(){
				res.send(true);
				res.end();
			});
		});
	});
}

exports.startPaths = StartPaths;
