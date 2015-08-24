

/*
 * index new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * 
 * **
 * Instalar mysql en node. -> #npm install mysql 
 * Instalar Moment en node. -> #nom install moment
 * Instalar cron en node. -> #npm install cron
 * */

//#IMPORTS
var CronJob = require('cron').CronJob;
var server = require("./server");
var router = require("./router");
var mainData = require("./bo/mainData");
var login = require("./bo/login");
var action = require("./bo/action");
var core = require("./bo/core");
var hora_cron = require("./bo/cron/hora_cron");


//# OZONE Services
var handle = {}
handle["/bo/login/checkUser"] = login.checkuser;
handle["/bo/login/addNewUser"] = login.addnewuser;

handle["/bo/mainData/getAllPlanets"] = mainData.getallplanets;
handle["/bo/mainData/getAction"] = mainData.getaction;
handle["/bo/mainData/getAllCostesAlmacen"] = mainData.getallcostesalamacen;
handle["/bo/mainData/getArmys"] = mainData.getarmys;
handle["/bo/mainData/getClasificacion"] = mainData.getclasificacion;
handle["/bo/mainData/getMyReports"] = mainData.getmyreports;
handle["/bo/mainData/getNickById"] = mainData.getnickbyid;
handle["/bo/mainData/getPlanetaById"] = mainData.getplanetabyid;
handle["/bo/mainData/getRecursos"] = mainData.getrecursos;
handle["/bo/mainData/getReport"] = mainData.getreport;
handle["/bo/mainData/getShields"] = mainData.getshields;
handle["/bo/mainData/getUpdate"] = mainData.getupdate;
handle["/bo/mainData/getUpdateType"] = mainData.getupdatetype;
handle["/bo/mainData/getCapacidadAlmacen"] = mainData.getcapacidadalmacen;
handle["/bo/mainData/getComputoGloval"] = mainData.getcomputogloval;
handle["/bo/mainData/getCostesAlmacenesUp"] = mainData.getgostesalmacenesup;
handle["/bo/mainData/getUpdateById"] = mainData.getupdatebyid;

handle["/bo/action/cancelMision"] = action.cancelmision;
handle["/bo/action/cancelUpdate"] = action.cancelupdate;
handle["/bo/action/finalizarUpdate"] = action.finalizarupdate;
handle["/bo/action/repararNave"] = action.repararnave;
handle["/bo/action/finalizarMision"] = action.finalizarmision;
handle["/bo/action/startAtaque"] = action.startataque;
handle["/bo/action/startRecoleccion"] = action.startrecoleccion;
handle["/bo/action/startUpdate"] = action.startupdate;

handle["/bo/action/SimulatorOfBatles"] = core.simularbatalla;

//#Start Server
server.iniciar(router.route, handle);


//# CRON
new CronJob('00 00 * * * *', function() {
	console.log('> hora_cron: ');
  	hora_cron.run();
}, null, true, 'America/Los_Angeles');
