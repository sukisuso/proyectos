/*
 * HORA_CRON new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var mysql = require('mysql');
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
	var queryString = 'UPDATE t_recursos SET tr_u_ozone= tr_u_ozone + 30 where tr_u_ozone < 60' ;
    connection.query(queryString);
}


function run(){
	console.log(">> run");
	comprobarminimoozone();
}


// ozone Exports
exports.run = run;
