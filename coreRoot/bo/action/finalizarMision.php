<?php
require '../config.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["tipoMision"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["targetId"]){
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

if($_GET["tipoMision"] == 1){ //RECOLECTAR DE PLANETA
    $sql       = 'SELECT tp_r_size FROM t_planetas where tp_id = ' . $_GET["targetId"] ;
    $resultado = mysql_query($sql, $enlace);
    $size = mysql_fetch_assoc($resultado);

    $sql = 'UPDATE t_recursos SET tr_u_metal = tr_u_metal+'. $size['tp_r_size'] . ' , 
                                tr_u_cristal = tr_u_cristal+'. $size['tp_r_size']  . ' ,
                                tr_u_ozone = tr_u_ozone+'. $size['tp_r_size']  . ' 
                                where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);

    $sql = 'UPDATE t_action SET ta_activo = 0 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
}

mysql_free_result($resultado);
?>