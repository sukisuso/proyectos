/*
 * HORA_CRON new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var mysql = require('mysql');
var Chance = require('chance');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'ozone',
    }
);

//comprobarMinimoOzone
function comprobarminimoozone() {
	console.log(">>> Minimo Ozone");
	var queryString = 'UPDATE t_recursos SET tr_u_ozone= tr_u_ozone + 30 where tr_u_ozone < 200' ;
    connection.query(queryString);
}


//alterarGalaxia
function alterarGalaxia() {

	var chance = new Chance();
	console.log(">>> Refrescando la galaxia");
	var queryString = 'DELETE FROM t_planetas WHERE tp_id NOT IN (SELECT ta_target FROM t_action) LIMIT 15' ;
    connection.query(queryString);
	
    var planet = {};
	planet["tp_nombre"] = chance.city() ;
	planet["tp_distancia"] = chance.integer({min: 40, max: 100});
	planet["tp_r_metal"] = 0;
	planet["tp_r_cristal"] = 0;
	planet["tp_r_ozone"] = 0;
	planet["tp_r_size"] = chance.integer({min: 40, max: 1920});
	
	var queryString = "INSERT INTO `t_planetas`( `tp_nombre`, `tp_distancia`, `tp_r_metal`, `tp_r_cristal`, `tp_r_ozone`, `tp_r_size`)" +
			" VALUES ('"+planet["tp_nombre"]+"','"+planet["tp_distancia"]+"','"+planet["tp_r_metal"]+"','"+planet["tp_r_cristal"]+"'" +
					",'"+planet["tp_r_ozone"]+"','"+planet["tp_r_size"]+"')" ;
    connection.query(queryString);
    
    
	for(var i = 0 ;i < 14 ; i++){
		planet["tp_nombre"] = chance.city() ;
		planet["tp_distancia"] = chance.integer({min: 40, max: 920});
		planet["tp_r_metal"] = 0;
		planet["tp_r_cristal"] = 0;
		planet["tp_r_ozone"] = 0;
		planet["tp_r_size"] = chance.integer({min: 40, max: 1920});
		
		var queryString = "INSERT INTO `t_planetas`( `tp_nombre`, `tp_distancia`, `tp_r_metal`, `tp_r_cristal`, `tp_r_ozone`, `tp_r_size`)" +
				" VALUES ('"+planet["tp_nombre"]+"','"+planet["tp_distancia"]+"','"+planet["tp_r_metal"]+"','"+planet["tp_r_cristal"]+"'" +
						",'"+planet["tp_r_ozone"]+"','"+planet["tp_r_size"]+"')" ;
	    connection.query(queryString);
	}
}


function run(){
	console.log(">> run");
	comprobarminimoozone();
	alterarGalaxia();
}


// ozone Exports
exports.run = run;
