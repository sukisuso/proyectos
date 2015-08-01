<?php
require '../config.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["planetId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["timeSec"]){
	echo '{result:fail}';
    exit;
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail}';
    exit;
}

//Comprobar si tiene mision activa

$sql       = 'SELECT * FROM t_action where tu_id = ' . $_GET["userId"] . ' AND ta_activo = 1';
$resultado = mysql_query($sql, $enlace);

if (mysql_num_rows($resultado) != 0) {
	echo '{result:fail}';
    exit;
} 
//sino
else{

    $fecha = new DateTime();
    $fecha->add(new DateInterval('PT'.$_GET["timeSec"].'S'));
    $fecha=date_format($fecha, "Y-m-d H:i:s");

	$sql = 'UPDATE t_action SET ta_target = '. $_GET["planetId"] . ' , 
                                ta_activo = 1, ta_tipo = 1 ,
                                ta_fechafin = "'.$fecha. '" 
                                where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);

    $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'. $_GET["timeSec"] . 
                                ' where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);
} 

mysql_free_result($resultado);
?>