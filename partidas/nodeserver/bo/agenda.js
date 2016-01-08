var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/pdb";

function StartPaths(app){
	
	app.post('/agenda/getAgenda', function(req, res) {getAgenda(req,res);});
	app.post('/agenda/insertAgenda', function(req, res) {insertAgenda(req,res);});
	app.post('/agenda/deleteCita', function(req, res) {deleteCita(req,res);});
}

function getAgenda(req, res) {
	var partidas = [];
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").find({partidaId:1},  function(err, docs) {
			docs.each(function(err, doc) {
				if(doc) {
				   partidas.push(partidaToAgenda(doc));
				}else{
					db.collection("agenda").find({},  function(err, docs2) {
						docs2.each(function(err, doc2) {
							if(doc2) {
							   partidas.push(doc2);
							}else{
								db.close();
								res.json(partidas);
								res.end();
							}
						});
					});
				}
			});
		});
	});
}

function insertAgenda(req, res) {
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("agenda").insert(req.body.agenda,  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}


function deleteCita(req, res) {
	var ObjectId = require('mongodb').ObjectID;
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("agenda").remove({'_id':ObjectId(req.body._id)},  function(err, docs) {
			res.send(true);
			res.end();
		});
	});
}

function partidaToAgenda(doc){
	var obj= {};
	obj["constraint"] = 'availableForMeeting';
	var dd = new Date(doc.fecha);
	obj["start"] = dd.getFullYear()+"-"+(dd.getMonth()+1)+"-"+dd.getDate();
	
	if(doc.tipo=="Gasto"){
		obj["title"] = doc.tag+ " [ -"+doc.cantidad+" ]";
		obj["color"] = '#FA5858';
	} else if(doc.tipo == "Ingreso"){
		obj["title"] = doc.tag+ " [ +"+doc.cantidad+" ]";
		obj["color"] = '#04B404';
	}else{
		obj["title"] = doc.tag+ " [ =="+doc.cantidad+" ]";
		obj["color"] = '#FF00FF';
	}
	
	
	return obj;
	
}

exports.startPaths = StartPaths;


/*

{// Economia
					title: 'Meeting',
					start: '2016-01-13',
					constraint: 'availableForMeeting', // defined below
					color: '#257e4a'
				}
*/