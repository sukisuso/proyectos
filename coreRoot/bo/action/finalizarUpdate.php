<?php
require '../config.php';
require 'chechMaxAlmacen.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["tipoUpdate"]){
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

$sql = 'UPDATE t_update SET tup_activo = 0 where tu_id = ' . $_GET["userId"] ;
$resultado = mysql_query($sql, $enlace);

if($_GET["tipoUpdate"] == 1){ //Almacen de Metal
    $sql = 'UPDATE t_recursos SET tr_na_metal = tr_na_metal+1 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
} else if($_GET["tipoUpdate"] == 2){ //Almacen de Cristal
    $sql = 'UPDATE t_recursos SET tr_na_cristal = tr_na_cristal+1 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
} else if($_GET["tipoUpdate"] == 3){ //Almacen de Ozone
    $sql = 'UPDATE t_recursos SET tr_na_ozone = tr_na_ozone+1 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
}else if($_GET["tipoUpdate"] == 4){ //Escudos Parallax!!
    $sql = 'UPDATE t_recursos SET tr_n_s_parallax = tr_n_s_parallax+1 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
}else if($_GET["tipoUpdate"] == 5){ //Cañon Laser!!
    $sql = 'UPDATE t_recursos SET tr_n_a_cannonlaser = tr_n_a_cannonlaser+1 where tu_id = ' . $_GET["userId"] ;
    $res = mysql_query($sql, $enlace);
}
?>