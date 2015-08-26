/*
 * MainData new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var mysql = require('mysql');
var moment = require('moment');
var utf8 = '';
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'ozone',
    }
);

//GetAllPlanets
function getallplanets(response) {
    var queryString = 'SELECT * FROM t_planetas order by tp_distancia';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//GetAction
function getaction(response, get) {
    var queryString = 'SELECT * FROM t_action ta, t_action_type tat where tat.tat_id = ta.ta_tipo AND tu_id = ' + get["userId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    if(rows[0]['ta_activo'] == "1")
	    	rows[0]['ta_activo'] = "true";
	    else
	    	rows[0]['ta_activo'] ="false";
	    
	    rows[0]["ta_fechafin"] = moment(rows[0]["ta_fechafin"]).format("YYYY-MM-DD H:m:ss");
	    
	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows[0]));
		response.end();
	});
}

// getAllCostesAlmacen
function getallcostesalamacen(response) {
    var queryString = 'SELECT * FROM t_almacen WHERE tal_nivel > 0';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//getArmys
function getarmys(response) {
    var queryString = 'SELECT * FROM t_update_type where tupt_seccion = 2';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//getCapacidadAlmacen
function getcapacidadalmacen(response, get){
	
	var queryString = 'SELECT tr_na_metal, tr_na_cristal, tr_na_ozone FROM t_recursos where tu_id = ' + get["userId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    var salida = {};
	    queryString="SELECT t1.tal_capacidad as metal,  t2.tal_capacidad as cristal, t3.tal_capacidad as ozone " +
	    		"FROM t_almacen t1, t_almacen t2, t_almacen t3" +
	    		" where t1.tal_nivel = "+ rows[0]['tr_na_metal'] +
	    		" AND t2.tal_nivel = "+ rows[0]['tr_na_cristal']+
	    		" AND t3.tal_nivel = "+ rows[0]['tr_na_ozone'] + "  LIMIT 1";
	    connection.query(queryString, function(err, costes, fields) {
		    if (err) throw err;

		    salida["capacidadMetal"] = costes[0]["metal"];
		    salida["capacidadCristal"] = costes[0]["cristal"];
		    salida["capacidadOzone"] = costes[0]["ozone"];
		    
		    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(salida));
			response.end();
	    });
	});
}

//getClasificación
function getclasificacion(response) {
    var queryString = 'SELECT tu.tu_nick as tu_nick , tu.tu_id as tu_id, tr.tr_puntos as tr_puntos FROM t_usuarios tu, t_recursos tr where tu.tu_id = tr.tu_id '
    		+'order by tr.tr_puntos DESC';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//getComputoGloval
function getcomputogloval(response, get){
	var query = "SELECT ts.ts_escudos as escudos, ta.tar_potencial as potencia FROM t_recursos tr, t_shield ts ,t_army ta " +
			" where ts.tupt_id = 4 AND ts.ts_nivel = tr.tr_n_s_parallax AND tr.tu_id = " +get["userId"]+
			" AND ta.tupt_id = 5 AND ta.tar_nivel = tr.tr_n_a_cannonlaser AND tr.tu_id = "+get["userId"]+" LIMIT 1";
	connection.query(query, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows[0]));
		response.end();
	});
}

//getCostesAlmacenesUp
function getgostesalmacenesup (response, get){
	
	var query = "SELECT tm.tal_coste_metal as Mmetal, tm.tal_coste_cristal as Mcristal, tm.tal_coste_ozone as Mozone ,tm.tal_costeTemporal Mtiempo , " +
			" tc.tal_coste_metal as Cmetal, tc.tal_coste_cristal as Ccristal, tc.tal_coste_ozone as Cozone ,tc.tal_costeTemporal Ctiempo ," +
			" toz.tal_coste_metal as Ometal, toz.tal_coste_cristal as Ocristal, toz.tal_coste_ozone as Oozone ,toz.tal_costeTemporal Otiempo" +
			" FROM t_almacen tm, t_almacen tc, t_almacen toz" +
			" where tm.tal_nivel = "+get["nivelMetal"]+" AND tc.tal_nivel = "+get["nivelCristal"]+" AND toz.tal_nivel= "+get["nivelOzone"]+" LIMIT 1";
	connection.query(query, function(err, rows, fields) {
	    if (err) throw err;

	    var Array = {};
	    var metal = {};
	    var cristal = {};
	    var ozone = {};
	    
	    metal["tal_coste_metal"] = rows[0]["Mmetal"];
	    metal["tal_coste_cristal"] = rows[0]["Mcristal"];
	    metal["tal_coste_ozone"] = rows[0]["Mozone"];
	    metal["tal_costeTemporal"] = rows[0]["Mtiempo"];
	    
	    cristal["tal_coste_metal"] = rows[0]["Cmetal"];
	    cristal["tal_coste_cristal"] = rows[0]["Ccristal"];
	    cristal["tal_coste_ozone"] = rows[0]["Cozone"];
	    cristal["tal_costeTemporal"] = rows[0]["Ctiempo"];
	    
	    ozone["tal_coste_metal"] = rows[0]["Ometal"];
	    ozone["tal_coste_cristal"] = rows[0]["Ocristal"];
	    ozone["tal_coste_ozone"] = rows[0]["Oozone"];
	    ozone["tal_costeTemporal"] = rows[0]["Otiempo"];
	    
	    Array["costeMetal"] = metal;
	    Array["costeCristal"] = cristal;
	    Array["costeOzone"] = ozone;
	    
	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(Array));
		response.end();
	});
}

//getMyReports
function getmyreports(response, get) {
    var queryString = 'SELECT trep_id, trep_fecha FROM t_report where trep_lector = ' + get["userId"] + " ";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    for(var i = 0; i< rows.length ; i++){
	    	rows[i]["trep_fecha"] = moment(rows[i]["trep_fecha"]).format("YYYY-MM-DD H:m:ss");
	    }
	    
	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//getNickById
function getnickbyid(response, get) {
    var queryString = 'SELECT tu_nick as tp_nombre FROM t_usuarios where tu_id = ' + get["userId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    var queryString = 'SELECT ta_fechafin FROM t_action where tu_id = ' + get["myId"] + "  LIMIT 1";
	    connection.query(queryString, function(err, time, fields) {
		    if (err) throw err;
		    
		    var t1 = new Date().getTime();
		    var t2 = moment(time[0]["ta_fechafin"]).valueOf();
		    console.log(time[0]["ta_fechafin"]);
		    rows[0]["seconds"]  = (t2 -t1 )/1000;
		    
		    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
		});
	});
}

//getPlanetaById
function getplanetabyid(response, get) {
    var queryString = 'SELECT tp_nombre FROM t_planetas where tp_id = ' + get["planetaId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    var queryString = 'SELECT ta_fechafin FROM t_action where tu_id = ' + get["userId"] + "  LIMIT 1";
	    connection.query(queryString, function(err, time, fields) {
		    if (err) throw err;
		    
		    var t1 = new Date().getTime();
		    var t2 = moment(time[0]["ta_fechafin"]).valueOf();
		    rows[0]["seconds"]  = (t2 -t1 )/1000;
		    
		    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
		});
	});
}

//getRecursos
function getrecursos(response, get) {
    var queryString = 'SELECT * FROM t_recursos where tu_id = ' + get["userId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows[0]));
		response.end();
	});
}

//getReport
function getreport(response, get) {
    var queryString = 'SELECT * FROM t_report where trep_lector = ' + get["userId"] + '  AND trep_id = ' + get["reportId"]+ '  LIMIT 1' ;
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    rows[0]["trep_fecha"] = moment(rows[0]["trep_fecha"]).format("YYYY-MM-DD H:m:ss");
	    
	    
		//Eliminamos el reporte.
		var queryString = 'DELETE FROM t_report where trep_lector = ' + get["userId"] + '  AND trep_id = ' + get["reportId"]+ ' ' ;
	    connection.query(queryString, function(){
	    	
	    	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
			
	    });
	});
}

//getShields
function getshields(response) {
    var queryString = 'SELECT * FROM t_update_type where tupt_seccion = 1 ';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows));
		response.end();
	});
}

//getUpdate
function getupdate(response, get) {
    var queryString = 'SELECT * FROM t_update WHERE tu_id = ' + get["userId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    if(rows[0]['tup_activo'] == "1")
	    	rows[0]['tup_activo'] = "true";
	    else
	    	rows[0]['tup_activo'] ="false";
	    
	    rows[0]["tup_fechafin"] = moment(rows[0]["tup_fechafin"]).format("YYYY-MM-DD H:m:ss");
	    
	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + JSON.stringify(rows[0]));
		response.end();
	});
}

//getUpdateById
function getupdatebyid(response, get){
	
	var nivel =  parseInt(get["nivelId"])+1;
	if(get["updateType"] == 4){  //ESCUDOS PARALLAx
		var query = "SELECT tipo.tupt_descripcion as nombre ,ts.tal_coste_metal as coste_metal," +
				" ts.tal_coste_cristal as coste_cristal, ts.tal_coste_ozone as coste_ozone , ts.tal_coste_temporal as tiempo, " +
				" ts2.ts_escudos as potencial " +
				"FROM t_update_type tipo, t_shield ts,  t_shield ts2 " +
				"where tipo.tupt_id = 4 AND ts.tupt_id = 4 " +
				"AND ts.ts_nivel = "+nivel+" AND ts2.ts_nivel = "+ get["nivelId"] + " LIMIT 1";
		connection.query(query, function(err, rows, fields) {
		    if (err) throw err;
		    
		    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
		});
	}else if(get["updateType"] == 5){ //Cañon laser
		var query = "SELECT tipo.tupt_descripcion as nombre ,ts.tal_coste_metal as coste_metal," +
			" ts.tal_coste_cristal as coste_cristal, ts.tal_coste_ozone as coste_ozone , ts.tal_coste_temporal as tiempo, " +
			" ts2.tar_potencial as potencial " +
			"FROM t_update_type tipo, t_army ts,  t_army ts2 " +
			"where tipo.tupt_id = 5 AND ts.tupt_id = 5 " +
			"AND ts.tar_nivel = "+nivel+" AND ts2.tar_nivel = "+ get["nivelId"] + " LIMIT 1";
		connection.query(query, function(err, rows, fields) {
			if (err) throw err;
    
			response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
		});
	}
}

//getUpdateType
function getupdatetype(response, get) {
    var queryString = 'SELECT tupt_descripcion FROM t_update_type where tupt_id = ' + get["updateId"] + "  LIMIT 1";
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

    
	    var queryString = 'SELECT tup_fechafin FROM t_update where tu_id = ' + get["userId"] + "  LIMIT 1";
	    connection.query(queryString, function(err, time, fields) {
		    if (err) throw err;
		    
		    var t1 = new Date().getTime();
		    var t2 = moment(time[0]["tup_fechafin"]).valueOf();
		    rows[0]["seconds"]  = (t2 -t1 )/1000;
		    
		    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			response.write(utf8 + JSON.stringify(rows[0]));
			response.end();
		});
    });
}


// ozone Exports
exports.getallplanets = getallplanets;
exports.getaction = getaction;
exports.getallcostesalamacen = getallcostesalamacen;
exports.getarmys = getarmys;
exports.getclasificacion = getclasificacion;
exports.getmyreports = getmyreports;
exports.getnickbyid = getnickbyid;
exports.getplanetabyid = getplanetabyid;
exports.getrecursos = getrecursos;
exports.getreport = getreport;
exports.getshields = getshields;
exports.getupdate = getupdate;
exports.getupdatetype = getupdatetype;
exports.getcapacidadalmacen = getcapacidadalmacen;
exports.getcomputogloval = getcomputogloval;
exports.getgostesalmacenesup = getgostesalmacenesup;
exports.getupdatebyid = getupdatebyid;
