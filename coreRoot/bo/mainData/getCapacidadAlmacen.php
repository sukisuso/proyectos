<?php
require '../config.php';

if(!$_GET["userId"]){
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

 $sql = 'SELECT * FROM t_recursos where tu_id = ' . $_GET["userId"] . " ";
    $res = mysql_query($sql, $enlace);

    $rows = array();
    while($r = mysql_fetch_assoc($res)) {
        $rows = $r;
    }

    $sql = 'SELECT tal_capacidad FROM t_almacen where tal_nivel = ' . $rows['tr_na_metal'] . " ";
    $sql2 = 'SELECT tal_capacidad FROM t_almacen where tal_nivel = ' . $rows['tr_na_cristal'] . " ";
    $sql3 = 'SELECT tal_capacidad FROM t_almacen where tal_nivel = ' . $rows['tr_na_ozone'] . " ";

    $resultado = mysql_query($sql, $enlace);
    $resultado2 = mysql_query($sql2, $enlace);
    $resultado3 = mysql_query($sql3, $enlace);

    if (!$resultado || !$resultado2 || !$resultado3) {
        echo '{result:fail}';
        exit;
    }

    $rows = array();
    while($r = mysql_fetch_assoc($resultado)) {
        $rows["capacidadMetal"] = $r["tal_capacidad"];
    }
    while($r = mysql_fetch_assoc($resultado2)) {
        $rows["capacidadCristal"] = $r["tal_capacidad"];
    }
    while($r = mysql_fetch_assoc($resultado3)) {
        $rows["capacidadOzone"] = $r["tal_capacidad"];
    }

print json_encode($rows);

mysql_free_result($resultado);

?>