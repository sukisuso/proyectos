<?php
require '../config.php';

if(!$_GET["nivelId"]){
	$nivel = 0;
}else{
	$nivel = $_GET['nivelId'];
}

if(!$_GET["updateType"]){
	echo '{result:fail2}';
    exit;
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fai3l}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail4}';
    exit;
}

$rows = array();

if($_GET["updateType"] == 4){  //ESCUDOS PARALLAx
	$sql       = 'SELECT tupt_descripcion FROM t_update_type tipo 
					where tupt_id = ' . $_GET["updateType"] . " ";
	$resultado = mysql_query($sql, $enlace);
	$r1 = mysql_fetch_assoc($resultado);
	$rows["nombre"] = $r1["tupt_descripcion"];

	$nivel = $_GET["nivelId"]+1;
	$sql       = 'SELECT tal_coste_metal, tal_coste_cristal, tal_coste_ozone, tal_coste_temporal FROM t_shield 
					where tupt_id = ' . $_GET["updateType"] . ' AND ts_nivel = ' . $nivel . " ";
	$resultado = mysql_query($sql, $enlace);
	$r2 = mysql_fetch_assoc($resultado);
	$rows["coste_metal"] = $r2["tal_coste_metal"];
	$rows["coste_cristal"] = $r2["tal_coste_cristal"];
	$rows["coste_ozone"] = $r2["tal_coste_ozone"];
	$rows["tiempo"] = $r2["tal_coste_temporal"];

	$sql= 'SELECT ts_escudos FROM t_shield 
			where tupt_id = ' . $_GET["updateType"] . ' AND ts_nivel = ' . $_GET["nivelId"] . " ";
	$resultado = mysql_query($sql, $enlace);
	$r3 = mysql_fetch_assoc($resultado);
	$rows["potencial"] = $r3["ts_escudos"];
}

 else if($_GET["updateType"] == 5){  //Cañon Laser
	$sql       = 'SELECT tupt_descripcion FROM t_update_type tipo 
					where tupt_id = ' . $_GET["updateType"] . " ";
	$resultado = mysql_query($sql, $enlace);
	$r1 = mysql_fetch_assoc($resultado);
	$rows["nombre"] = utf8_encode($r1["tupt_descripcion"]);

	$nivel = $_GET["nivelId"]+1;
	$sql       = 'SELECT tal_coste_metal, tal_coste_cristal, tal_coste_ozone, tal_coste_temporal FROM t_army 
					where tupt_id = ' . $_GET["updateType"] . ' AND tar_nivel = ' . $nivel . " ";
	$resultado = mysql_query($sql, $enlace);
	$r2 = mysql_fetch_assoc($resultado);
	$rows["coste_metal"] = $r2["tal_coste_metal"];
	$rows["coste_cristal"] = $r2["tal_coste_cristal"];
	$rows["coste_ozone"] = $r2["tal_coste_ozone"];
	$rows["tiempo"] = $r2["tal_coste_temporal"];

	$sql= 'SELECT tar_potencial FROM t_army
			where tupt_id = ' . $_GET["updateType"] . ' AND tar_nivel = ' . $_GET["nivelId"] . " ";
	$resultado = mysql_query($sql, $enlace);
	$r3 = mysql_fetch_assoc($resultado);
	$rows["potencial"] = $r3["tar_potencial"];
}




print json_encode($rows);

mysql_free_result($resultado);

?>