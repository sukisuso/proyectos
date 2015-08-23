<?php
require '../config.php';
require 'chechMaxAlmacen.php';

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

    $tantoPorCien = rand ( 1 , 20 );
    $tantoPorCien2 = rand ( 1 , 20 );
    $tantoPorCien3 = rand ( 1 , 20 );
    $size1 = $size['tp_r_size']-(( $size['tp_r_size'] * $tantoPorCien ) / 100);
    $size2 = $size['tp_r_size']-(( $size['tp_r_size'] * $tantoPorCien2 ) / 100);
    $size3 = $size['tp_r_size']-(( $size['tp_r_size'] * $tantoPorCien3 ) / 100);

    $sql = 'UPDATE t_recursos SET tr_u_metal = tr_u_metal+'. $size1 . ' , 
                                tr_u_cristal = tr_u_cristal+'. $size2  . ' ,
                                tr_u_ozone = tr_u_ozone+'. $size3  . ' 
                                where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);

    $sql = 'UPDATE t_action SET ta_activo = 0 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
}

chechMaxAlmacen($enlace,  $_GET["userId"]);
mysql_free_result($resultado);
?>