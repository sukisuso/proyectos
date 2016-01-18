var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/pdb";

function StartPaths(app){
	
	app.post('/chart/getChart', function(req, res) {getChart(req,res);});

}

function getChart(req, res) {
	var partidas = {};
	var startDate = new Date(req.body.startDate);
	var endDate = new Date(req.body.endDate);
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("partidas").find({partidaId:1},  function(err, docs) {
			docs.each(function(err, doc) {
				if(doc) {
				   recalculateData(partidas, doc,startDate, endDate);
				}else{
					db.close();
					res.json(partidas);
					res.end();
				}
			});
		});
	});
}


function recalculateData(partidas, doc, startDate, endDate){
	
	var dd = new Date(doc.fecha);
	var name= mesTostring(dd.getMonth())+dd.getFullYear();
	
	if(dd < startDate )
		return;
	
	if(dd > endDate)
		return;
	
	if(partidas[name] == null){
		partidas[name] = {};
		
		if(doc.tipo=="Gasto"){
			partidas[name].gastos = doc.cantidad;
			partidas[name].reserva = 0;
		}
		if (doc.tipo=="Reserva"){
			partidas[name].reserva = doc.cantidad;
			partidas[name].gastos = 0;
		}
		
	}else{
		if(doc.tipo=="Gasto"){
			partidas[name].gastos += doc.cantidad;
		}
		if (doc.tipo=="Reserva"){
			partidas[name].reserva  += doc.cantidad;
		}
	}
	
}

function mesTostring(month){
	if(month == 0){
		return "Enero, ";
	}else if(month == 1){
		return "Febrero, ";
	}else if(month == 2){
		return "Marzo, ";
	}else if(month == 3){
		return "Abril, ";
	}else if(month == 4){
		return "Mayo, ";
	}else if(month == 5){
		return "Junio, ";
	}else if(month == 6){
		return "Julio, ";
	}else if(month == 7){
		return "Agosto, ";
	}else if(month == 8){
		return "Septiembre, ";
	}else if(month == 9){
		return "Octubre, ";
	}else if(month == 10){
		return "Noviembre, ";
	}else {
		return "Diciembre, ";
	}
}

exports.startPaths = StartPaths;
