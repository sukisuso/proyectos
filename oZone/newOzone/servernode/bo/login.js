/*
 * login new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var mysql = require('mysql');
var utf8 = '';
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'ozone',
    }
);

//checkUser
function checkuser(response, get) {
    var queryString = 'SELECT tu_id FROM t_usuarios where tu_nick = "' + get["user"] + '" AND tu_passwd = "'+ get["passwd"] +'"';
    connection.query(queryString, function(err, rows, fields) {
	    if (err) throw err;

	    var resp;
	    if(rows.length == 1)
	    	resp = rows[0]["tu_id"];
	    else
	    	resp = -1;
	    
	    response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
		response.write(utf8 + resp);
		response.end();
	});
}

//addNewUsuario
function addnewuser(response, get){
	 var queryString = "SELECT tu_id FROM t_usuarios where tu_nick = '" + get["user"] + "'";
	    connection.query(queryString, function(err, rows, fields) {
		    if (err) throw err;

		    var resp = "";
		    if(rows.length ==0){
		    	

				 var querynewuser= "INSERT INTO `t_usuarios`(`tu_nick`, `tu_passwd`) VALUES ('"+ get["user"]+"', '"+get["passwd"] +"' )";
				 console.log(querynewuser);
				 connection.query(querynewuser, function(err, info) {
					 
					 response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
					 response.write("");
					 response.end();
					 
					 var querynewup= "INSERT INTO `t_update`(`tu_id`, `tup_fechafin`) VALUES ('" + info.insertId + "', now())";
					 connection.query(querynewup);
					 querynewup= "INSERT INTO `t_action`(`tu_id`, `ta_tipo`, `ta_fechafin`) VALUES ('"+ info.insertId + "', 1, now())";
					 connection.query(querynewup);
					 querynewup= "INSERT INTO `t_recursos`(`tu_id`,`tr_u_metal`,`tr_u_cristal`,`tr_u_ozone`,`tr_damage`) VALUES ('"+ info.insertId +
					 				"', 100,100,100,100)";
					 connection.query(querynewup);
				 });
		    }else{
		    	resp = "error_login";
		    	response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
			    response.write(utf8 + resp);
			    response.end();
		    }
		});
}

// ozone Exports
exports.checkuser = checkuser;
exports.addnewuser=addnewuser;
