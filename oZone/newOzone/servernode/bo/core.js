/*
 * core new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var mysql = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'ozone',
    }
);

//checkMaxAlmacen
function checkMaxAlmacen(userId, response){
	
	//check Metal
	var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_metal ) " +
			" SET tr_u_metal = (CASE WHEN rec.tr_u_metal > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_metal END)" +
			" WHERE rec.tu_id = " + userId + ' ' ;
    connection.query(queryString, function(){
    
    	//check Cristal
        var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_cristal ) " +
    			" SET tr_u_cristal = (CASE WHEN rec.tr_u_cristal > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_cristal END)" +
    			" WHERE rec.tu_id = " + userId + ' ' ;
        connection.query(queryString, function(){
        	 //check Ozone
            var queryString =  "UPDATE t_recursos AS rec JOIN t_almacen as cost on( cost.tal_nivel = rec.tr_na_ozone ) " +
            		" SET tr_u_ozone = (CASE WHEN rec.tr_u_ozone > cost.tal_capacidad THEN cost.tal_capacidad ELSE rec.tr_u_ozone END)" +
            		" WHERE rec.tu_id = " + userId + ' ' ;
            connection.query(queryString, function(){
            	 response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"}); 
            		response.write("");
            		response.end();
            });
        });
    });
}

//comprobarMinimoOzone
function simularbatalla(response, get) {
	
	var queryString = "SELECT ts.ts_escudos, ta.tar_potencial, tu.tu_id, tu.tu_nick , tr.tr_u_metal,tr.tr_u_cristal, tr.tr_u_ozone, tr.tr_damage " +
			"FROM t_recursos tr, t_shield ts, t_usuarios tu , t_army ta where tr.tu_id = " + get["atacanteId"] +" AND ts.tupt_id = 4 AND ts.ts_nivel =  tr.tr_n_s_parallax "+
			"AND tu.tu_id = tr.tu_id AND ta.tupt_id = 5 AND ta.tar_nivel =  tr.tr_n_a_cannonlaser LIMIT 1"  ;
    connection.query(queryString, function(err, atacante, fields) {
	    if (err) throw err;
	    
	    var queryString = "SELECT ts.ts_escudos, ta.tar_potencial, tu.tu_id, tu.tu_nick , tr.tr_u_metal,tr.tr_u_cristal, tr.tr_u_ozone, tr.tr_damage " +
			"FROM t_recursos tr, t_shield ts, t_usuarios tu , t_army ta where tr.tu_id = " + get["defensorId"] +" AND ts.tupt_id = 4 AND ts.ts_nivel =  tr.tr_n_s_parallax "+
			"AND tu.tu_id = tr.tu_id AND ta.tupt_id = 5 AND ta.tar_nivel =  tr.tr_n_a_cannonlaser LIMIT 1"  ;
	    connection.query(queryString, function(err, defensor, fields) {
	    	if (err) throw err;
		    
		    var batalla = {};
		    var danoatacante;
		    var danodefensor;
		    batalla["idAtacante"] = get["atacanteId"];
		    batalla["idDefensa"] = get["defensorId"];
		    batalla["nombreAtacante"] = atacante[0]['tu_nick'];
		    batalla["nombreDefensa"] = defensor[0]['tu_nick'];
		    countBatle = 0;
		    
		    //Ronda 1
		    var supAt = Math.floor((Math.random() * 25) + 1);
		    var supDef = Math.floor((Math.random() * 5) + 1);
		    var valorAtaque = parseInt(atacante[0]['tar_potencial'])+(( atacante[0]['tar_potencial'] * supAt ) / 100);
		    var valorDefensa = parseInt(defensor[0]['ts_escudos'])-(( defensor[0]['ts_escudos'] * supDef ) / 100);
		    if(valorAtaque > valorDefensa )
		        countBatle++;
		    else
		        countBatle--;
		    batalla["ronda1_ataque"] = valorAtaque;
		    batalla["ronda1_defensa"] = valorDefensa;
		    
		   //Ronda 2
		    supAt = Math.floor((Math.random() * 15) + 1);
		    supDef = Math.floor((Math.random() * 25) + 1);
		    valorAtaque = parseInt(atacante[0]['ts_escudos'])-(( atacante[0]['ts_escudos'] * supAt ) / 100);
		    valorDefensa = parseInt(defensor[0]['tar_potencial'])+(( defensor[0]['tar_potencial'] * supDef ) / 100);
		    if(valorAtaque > valorDefensa )
		        countBatle++;
		    else
		        countBatle--;
		    batalla["ronda2_ataque"] = valorAtaque;
		    batalla["ronda2_defensa"] = valorDefensa;
		    
		  //Ronda 3
		    supAt = Math.floor((Math.random() * 45) + 1);
		    supDef = Math.floor((Math.random() * 10) + 1);
		    valorAtaque = parseInt(atacante[0]['tar_potencial'])+(( atacante[0]['tar_potencial'] * supAt ) / 100);
		    valorDefensa = parseInt(defensor[0]['ts_escudos'])-(( defensor[0]['ts_escudos'] * supDef ) / 100);
		    if(valorAtaque > valorDefensa )
		        countBatle++;
		    else
		        countBatle--;
		    batalla["ronda3_ataque"] = valorAtaque;
		    batalla["ronda3_defensa"] = valorDefensa;
		    
		    
		    var idWin = 0;
		    //ANALIZAMOS EL RESULTADO
		    if(countBatle > 0){//Atacante gana
		        idWin = batalla["idAtacante"];
		        var MetalWIN = defensor[0]['tr_u_metal'] / 2;
		        var CristalWIN = defensor[0]['tr_u_cristal'] / 2;
		        var OzoneWIN = defensor[0]['tr_u_ozone'] / 2;

		        //Daños
		        danoatacante = atacante[0]['tr_damage']- Math.floor((Math.random() * 5) + 1)
		        danodefensor = defensor[0]['tr_damage']- Math.floor((Math.random() * 15) + 2); 

		        if(danoatacante < 0){danoatacante  = 0;}
			    if(danodefensor < 0){danodefensor  = 0;}
		        
		        var queryString = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone+'+ OzoneWIN+', tr_u_metal = tr_u_metal+'+MetalWIN+
		        ', tr_u_cristal = tr_u_cristal+'+CristalWIN +',tr_damage = '+danoatacante+' where tu_id = ' +get["atacanteId"] ;
		        connection.query(queryString);
		        var queryString = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'+ OzoneWIN+', tr_u_metal = tr_u_metal-'+MetalWIN+
		        ', tr_u_cristal = tr_u_cristal-'+CristalWIN +', tr_damage = '+danodefensor+' where tu_id = ' +get["defensorId"] ;
		        connection.query(queryString);
		        
		        checkMaxAlmacen(get["atacanteId"]);

		    }else{//defensor gana
		    	idWin = batalla["defensorId"];
		        var MetalWIN = atacante[0]['tr_u_metal'] / 2;
		        var CristalWIN = atacante[0]['tr_u_cristal'] / 2;
		        var OzoneWIN = atacante[0]['tr_u_ozone'] / 2;

		        //Daños
		        danoatacante = atacante[0]['tr_damage']- Math.floor((Math.random() * 17) + 3)
		        danodefensor = defensor[0]['tr_damage']- Math.floor((Math.random() * 5) + 1); 

		        if(danoatacante < 0){danoatacante  = 0;}
			    if(danodefensor < 0){danodefensor  = 0;}
		        
		        var queryString = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone+'+ OzoneWIN+', tr_u_metal = tr_u_metal+'+MetalWIN+
		        ', tr_u_cristal = tr_u_cristal+'+CristalWIN +', tr_damage = '+danodefensor+'  where tu_id = ' +get["defensorId"] ;
		        connection.query(queryString);
		        var queryString = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'+ OzoneWIN+', tr_u_metal = tr_u_metal-'+MetalWIN+
		        ', tr_u_cristal = tr_u_cristal-'+CristalWIN +',tr_damage = '+danoatacante+' where tu_id = ' +get["atacanteId"] ;
		        checkMaxAlmacen(get["defensorId"]);
		    }
		    
		    var fecha = moment().format("YYYY-MM-DD H:m:s");
		    
		    var queryString = "INSERT INTO `t_report`(`trep_atacanteid`, `trep_defensorid`, `trep_nombreatacante`, `trep_nombredefensor`, `ronda1_ataque`, `ronda1_defensa`, `ronda2_ataque`, `ronda2_defensa`, `ronda3_ataque`, `ronda3defensa`, `trep_id_ganador`, `trep_lector`, `trep_metal`, `trep_cristal`, `trep_ozone`, `trep_fecha`)  "+
		        " VALUES ('"+batalla["idAtacante"]+"', '"+batalla["idDefensa"]+"', '"+batalla["nombreAtacante"]+"', '"+batalla["nombreDefensa"]+"' , '" +batalla["ronda1_ataque"]+"', '" +batalla["ronda1_defensa"]+"', '"+batalla["ronda2_ataque"]+"' , '"+batalla["ronda2_defensa"]+"', '"+batalla["ronda3_ataque"]+"', '"+batalla["ronda3_defensa"]+"', '"+idWin+"', '"+batalla["idAtacante"]+"', '"+MetalWIN+"', '"+CristalWIN+"', '"+OzoneWIN+"', '"+fecha+"' )";
		    connection.query(queryString);
		    
		    var queryString = "INSERT INTO `t_report`(`trep_atacanteid`, `trep_defensorid`, `trep_nombreatacante`, `trep_nombredefensor`, `ronda1_ataque`, `ronda1_defensa`, `ronda2_ataque`, `ronda2_defensa`, `ronda3_ataque`, `ronda3defensa`, `trep_id_ganador`, `trep_lector`, `trep_metal`, `trep_cristal`, `trep_ozone`, `trep_fecha`)  "+
	        	" VALUES ('"+batalla["idAtacante"]+"', '"+batalla["idDefensa"]+"', '"+batalla["nombreAtacante"]+"', '"+batalla["nombreDefensa"]+"' , '" +batalla["ronda1_ataque"]+"', '" +batalla["ronda1_defensa"]+"', '"+batalla["ronda2_ataque"]+"' , '"+batalla["ronda2_defensa"]+"', '"+batalla["ronda3_ataque"]+"', '"+batalla["ronda3_defensa"]+"', '"+idWin+"', '"+batalla["idDefensa"]+"', '"+MetalWIN+"', '"+CristalWIN+"', '"+OzoneWIN+"', '"+fecha+"' )";
		    connection.query(queryString);

		    var queryString = 'UPDATE t_action SET ta_activo = 0 where tu_id = ' + get["atacanteId"] + ' ' ;
		    connection.query(queryString);
		});
	});
}


// ozone Exports
exports.simularbatalla = simularbatalla;
