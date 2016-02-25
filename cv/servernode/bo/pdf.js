var MongoClient = require('mongodb').MongoClient;
var dataBase= "mongodb://localhost/cv";
var PDF = require('pdfkit');            //including the pdfkit module
var fs = require('fs');
var text = 'ANY_TEXT_YOU_WANT_TO_WRITE_IN_PDF_DOC';
var ObjectId = require('mongodb').ObjectID;

var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function StartPaths(app){
	
	app.post('/pdf/getCV', function(req, res) {getCV(req,res);});
	
}

function getCV(req, res) {
	var ram = new Date().getTime();
	var userId= req.body._id;
	var url = './app/pdfOutput/'+userId+"_"+ram+".pdf";
	var file = fs.createWriteStream(url);
	doc = new PDF();
	doc.pipe(file);
	
	
	createDocument(doc, req.body._id);
	
	
	/*addTitle("Curriculum Jesus Juan Aguilar", doc);
	addModulo("Datos Personales",doc);
	addText("Nombre: Jesús", doc);
	addText("Apellidos: Juan Aguilar", doc);
	addText("Email: suso_mdo@hotmail.com", doc);*/
	

	
	file.on('finish', function () {
    	res.send(userId+"_"+ram+".pdf");
		res.end();
	});
	
}


function addTitle(text, doc){
	
	doc.font('Times-Roman')
		.fontSize(18)
 		.text(text, 280, 80)
 		.moveDown(0.5);
	
}

function addModulo(text, doc){
	
	doc.fontSize(14).fillColor("#A4A4A4")
 	 	.text(text, 100)
 		.moveDown(0.5);
	
}

function addText(text, doc){
	
	doc.font('Times-Roman')
		.fontSize(10)
		.fillColor("#000000")
 		.text(text, 120)
 		.moveDown(0.5);
	
}

function addDate(text, doc){
	
	doc.font('Times-Roman')
		.fontSize(10)
		.fillColor("#5858FA")
 		.text(text, 120)
 		.moveDown(0.5);
	
}


function createDocument(document, id){
	
	MongoClient.connect(dataBase, function(err, db) {
		db.collection("user").findOne({'_id': ObjectId(id)},  function(err, docs) {
				if(docs) {
					
					addTitle("Curriculum " + getName(docs) , document);
					addModulo("Datos Personales",document);
					setPersonalData(docs, document);
					
					db.collection("estudios").find({'userid': id, 'curso':false},  function(err, docs) {
						if(docs!= null)
							addModulo("Estudios",document);
						
						docs.each(function(err, est) {
							if(est) {
							  	addEstudio(est, document);
							}else{
								addDocumentExperiencia(db ,document,id);
							}
						});
					});
				}
			});
	});
}

function addDocumentExperiencia(db, document,id){
	
	
	db.collection("experiencia").find({'userid': id, 'practicas':false},  function(err, docs) {
			if(docs!= null)
				addModulo("Experiencia Laboral",document);
			docs.each(function(err, est) {
				if(est) {
				   addExperiencia(est, document);
				}else{
					document.end();
				}
			});
		});
	
}

exports.startPaths = StartPaths;

function getName(doc){
	var name = "", sur1 = "", sur2 = "";
	
	if(doc.name)
		name = doc.name;
	if(doc.surname1)
		sur1 = doc.surname1;
	if(doc.surname2)
		sur2 = doc.surname2;
return name + " " + sur1 + " "+ sur2;
}

function setPersonalData(row, document){
	
	if(row.name)
		addText("Nombre: "+row.name, document);
	
	if(row.surname1 || row.surname2)
		addText("Apellidos : "+row.surname1+" "+ row.surname2, document);
	
	if(row.email)
		addText("Email: "+row.email, document);
	
	if(row.dir)
		addText("Direccion: "+row.dir, document);
	
	var phones = "";
	for(var i = 0; i < row.phones.length; i++){
		phones += row.phones[i]+((i+1)!=  row.phones.length?" - ":"");
	}
	
	if(phones)
		addText("Telefono: "+phones, document);
}

function addEstudio(doc, document){
	
	var end = "Actualidad";
	if(doc.endDate)
		end = ""+monthNames[new Date(doc.endDate).getMonth()]+"/" + new Date(doc.endDate).getFullYear();
	var start = ""+monthNames[new Date(doc.initDate).getMonth()]+"/" + new Date(doc.initDate).getFullYear();
	
	addDate(start+ " - " + end,document);
	addText(""+doc.titulo+ " - " +doc.centro+" ["+doc.nota+"]", document);
}


function addExperiencia(est, document){
	var end = "Actualidad";
	if(est.endDate)
		end = ""+monthNames[new Date(est.endDate).getMonth()]+"/" + new Date(est.endDate).getFullYear();
	var start = ""+monthNames[new Date(est.initDate).getMonth()]+"/" + new Date(est.initDate).getFullYear();
	
	addDate(start+ " - " + end,document);
	addText(""+est.puesto+ " - " +est.empresa+" ["+est.lugar+"]", document);
	addText(""+est.desc, document);
	
}


