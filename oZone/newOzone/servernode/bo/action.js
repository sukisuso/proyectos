/*
 * Action new_ozone v_1.0
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

//cancelMision
function cancelmision(response, get) {
   
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var queryString = 'UPDATE t_action SET ta_activo = 0 where tu_id = ' + get["userId"] + ' ' ;
    connection.query(queryString);
}

//cancelUpdate
function cancelupdate(response, get) {

	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var queryString = 'UPDATE t_update SET tup_activo = 0 where tu_id = ' + get["userId"] + ' ' ;
    connection.query(queryString);
}

//checkMaxAlmacen
function checkMaxAlmacen(userId){
	
	//check Metal
	var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_metal ) " +
			" SET tr_u_metal = (CASE WHEN rec.tr_u_metal > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_metal END)" +
			" WHERE rec.tu_id = " + userId + ' ' ;
    connection.query(queryString);
    
    //check Cristal
    var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_cristal ) " +
			" SET tr_u_cristal = (CASE WHEN rec.tr_u_cristal > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_cristal END)" +
			" WHERE rec.tu_id = " + userId + ' ' ;
    connection.query(queryString);

    //check Ozone
    var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_ozone ) " +
    		" SET tr_u_ozone = (CASE WHEN rec.tr_u_ozone > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_ozone END)" +
    		" WHERE rec.tu_id = " + userId + ' ' ;
    connection.query(queryString);
}

//finalizarMision
function finalizarmision(response, get){
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	if(get["tipoMision"]==1){
		
		var tanto = Math.floor((Math.random() * 20) + 1);
		var tanto2 = Math.floor((Math.random() * 20) + 1);
		var tanto3 = Math.floor((Math.random() * 20) + 1);
				
		var queryString =  "UPDATE t_recursos tr JOIN t_planetas tp SET tr_u_metal = tr_u_metal+(tp.tp_r_size-((tp.tp_r_size*"+tanto+") / 100) ) " +
				", tr_u_cristal = tr_u_cristal+(tp.tp_r_size-((tp.tp_r_size*"+tanto2+") / 100) ) ," +
				" tr_u_ozone = tr_u_ozone+(tp.tp_r_size-((tp.tp_r_size*"+tanto3+") / 100) ) " +
				" WHERE tp.tp_id= " +get["targetId"]+
				" AND tr.tu_id = " + get["userId"] + ' ' ;
		connection.query(queryString);
		
		var queryString =  'UPDATE t_action SET ta_activo = 0 where tu_id = ' + get["userId"] + ' ' ;
		connection.query(queryString);
	}
	
	checkMaxAlmacen(get["userId"]);
}

//finalizarUpdate
function finalizarupdate(response, get){
	
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var queryString =  'UPDATE t_update SET tup_activo = 0 where tu_id = ' + get["userId"] + ' ' ;
    connection.query(queryString);
    
    var campo = "";
    
    if(get["tipoUpdate"] == 1){
    	campo = "tr_na_metal";
    } else if(get["tipoUpdate"] == 2){
    	campo = "tr_na_cristal";
    } else if(get["tipoUpdate"] == 3){
    	campo = "tr_na_ozone";
    } else if(get["tipoUpdate"] == 4){
    	campo = "tr_n_s_parallax";
    } else if(get["tipoUpdate"] == 5){
    	campo = "tr_n_a_cannonlaser";
    } 
	
    var queryString =  'UPDATE t_recursos SET '+ campo +' = '+campo+'+1 where tu_id = '+ get["userId"] + ' ' ;
    connection.query(queryString);
}

//repararNave
function repararnave(response, get){
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var subida = Math.floor((Math.random() * 25) + 1);
	var queryString = "UPDATE t_recursos SET tr_damage = CASE WHEN (tr_damage+"+subida+") < 100 " +
			" THEN (tr_damage+"+subida+") ELSE 100 END," +
			" tr_u_ozone = tr_u_ozone- 100, tr_u_metal = tr_u_metal-100, tr_u_cristal = tr_u_cristal-100 WHERE tr_damage IS NOT NULL" +
			" AND tu_id=" + get["userId"] + " " ;
    connection.query(queryString);
}

//startAtaque
function startataque(response, get){
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var fecha = moment().add('seconds', get["timeSec"]).format("YYYY-MM-DD H:m:s");
	var value = get["timeSec"] /10;
	
	var queryString =  "UPDATE t_action SET ta_target = "+ get["maloId"] + " ,   ta_activo = 1, ta_tipo = 2 ," +
	 		" ta_fechafin = '"+fecha+"' where tu_id = " + get["userId"]+ " " ;
	connection.query(queryString);
	
	var queryString =  "UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-"+ get["timeSec"] +"" +
			",  tr_puntos = tr_puntos+"+ value +" where tu_id = "+ get["userId"]+ " " ;
	connection.query(queryString);
}

//startRecoleccion
function startrecoleccion(response, get){
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var fecha = moment().add('seconds', get["timeSec"]).format("YYYY-MM-DD H:m:s");
	var value = get["timeSec"] /10;
	
	var queryString =  "UPDATE t_action SET ta_target = "+ get["planetId"] + " ,   ta_activo = 1, ta_tipo = 1," +
	 		" ta_fechafin = '"+fecha+"' where tu_id = " + get["userId"]+ " " ;
	connection.query(queryString);
	
	var queryString =  "UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-"+ get["timeSec"] +"" +
			",  tr_puntos = tr_puntos+"+ value +" where tu_id = "+ get["userId"]+ " " ;
	connection.query(queryString);
}

//startUpdate
function startupdate(response, get){
	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
	response.write("");
	response.end();
	
	var fecha = moment().add('seconds', get["timeSec"]).format("YYYY-MM-DD H:m:s");
	var value = 0;
	value = get["timeSec"] /10;
	value += get["costeOzone"]/10;
	value += get["costeMetal"] /10;
	value += get["costeCristal"]/10;
	
	var queryString =  "UPDATE t_update SET tup_tipo = "+ get["updateId"] + " ,   tup_activo = 1," +
		" tup_fechafin = '"+fecha+"' where tu_id = " + get["userId"]+ " " ;
	connection.query(queryString);

	var queryString =  "UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-"+ get["timeSec"] +"" +
		",  tr_puntos = tr_puntos+"+ value +" where tu_id = "+ get["userId"]+ " " ;
	connection.query(queryString);
}

// ozone Exports
exports.cancelmision = cancelmision;
exports.cancelupdate = cancelupdate;
exports.finalizarupdate = finalizarupdate;
exports.repararnave = repararnave;
exports.finalizarmision = finalizarmision;
exports.startataque = startataque;
exports.startrecoleccion = startrecoleccion;
exports.startupdate = startupdate;