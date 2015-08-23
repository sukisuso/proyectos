<?php
require '../config.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail7}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail8}';
    exit;
}

//              SELECT tr_damage FROM `t_recursos` WHERE tu_id = 1
$sql       = 'SELECT * FROM t_recursos where tu_id = ' . $_GET["userId"] ;
$resultado = mysql_query($sql, $enlace);
$r = mysql_fetch_assoc($resultado);
if (!$resultado) {
	echo '{result:fail9}';
    exit;
} 
//sino
else{
    $better = intval($r['tr_damage']);
    $tantoPorCien = rand ( 1 , 25 );
    $better = $tantoPorCien + $better;

    if($better > 100)
        $better = 100;

	$sql = 'UPDATE t_recursos SET tr_damage = '. $better . ' where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);

    $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone- 100, tr_u_metal = tr_u_metal-100, 
                            tr_u_cristal = tr_u_cristal-100 where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);

} 

mysql_free_result($resultado);
?>