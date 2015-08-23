<?php
require '../config.php';

if(!$_GET["nivelMetal"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["nivelCristal"]){
    echo '{result:fail}';
    exit;
}

if(!$_GET["nivelOzone"]){
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

$sql       = 'SELECT tal_coste_metal, tal_coste_cristal, tal_coste_ozone,tal_costeTemporal FROM t_almacen 
                                    where tal_nivel = ' . $_GET["nivelMetal"] . " ";
$sql2       = 'SELECT tal_coste_metal, tal_coste_cristal, tal_coste_ozone,tal_costeTemporal FROM t_almacen 
                                    where tal_nivel = ' . $_GET["nivelCristal"] . " ";
$sql3       = 'SELECT tal_coste_metal, tal_coste_cristal, tal_coste_ozone,tal_costeTemporal FROM t_almacen 
                                    where tal_nivel = ' . $_GET["nivelOzone"] . " ";
$resultado = mysql_query($sql, $enlace);
$resultado2 = mysql_query($sql2, $enlace);
$resultado3 = mysql_query($sql3, $enlace);

if (!$resultado || !$resultado2 || !$resultado3) {
    echo '{result:fail}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
    $rows["costeMetal"] = $r;
}
while($r = mysql_fetch_assoc($resultado2)) {
    $rows["costeCristal"] = $r;
}
while($r = mysql_fetch_assoc($resultado3)) {
    $rows["costeOzone"] = $r;
}

print json_encode($rows);

mysql_free_result($resultado);

?>