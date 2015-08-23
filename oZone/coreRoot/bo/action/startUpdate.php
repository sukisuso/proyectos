<?php
require '../config.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["updateId"]){
    echo '{result:fail2}';
    exit;
}

if(!$_GET["timeSec"]){
	echo '{result:fail3}';
    exit;
}

if(!$_GET["costeMetal"]){
    echo '{result:fail4}';
    exit;
}

if(!$_GET["costeCristal"]){
    echo '{result:fail5}';
    exit;
}

if(!$_GET["costeOzone"]){
    $costeOzone = 0;
}else{
    $costeOzone = $_GET["costeOzone"];
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail7}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail8}';
    exit;
}

//Comprobar si tiene mision activa

$sql       = 'SELECT * FROM t_update where tu_id = ' . $_GET["userId"] . ' AND tup_activo = 1';
$resultado = mysql_query($sql, $enlace);

if (mysql_num_rows($resultado) != 0) {
	echo '{result:fail9}';
    exit;
} 
//sino
else{

    $fecha = new DateTime();
    $fecha->add(new DateInterval('PT'.$_GET["timeSec"].'S'));
    $fecha=date_format($fecha, "Y-m-d H:i:s");

	$sql = 'UPDATE t_update SET tup_tipo = '. $_GET["updateId"] . ' ,
                                tup_activo = 1,
                                tup_fechafin = "'.$fecha. '" 
                                where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);

    $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'. $costeOzone . 
                                ', tr_u_metal = tr_u_metal-'. $_GET["costeMetal"] .
                                ', tr_u_cristal = tr_u_cristal-'. $_GET["costeCristal"] . 
                                ' where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);
    $value = 0;
    $value += $costeOzone/10;
    $value += $_GET["costeMetal"] /10;
    $value += $_GET["costeCristal"]/10;

    $sql = 'UPDATE t_recursos SET tr_puntos = tr_puntos+'. $value . ' where tu_id = ' . $_GET["userId"] ;
    $re = mysql_query($sql, $enlace);
} 

mysql_free_result($resultado);
?>