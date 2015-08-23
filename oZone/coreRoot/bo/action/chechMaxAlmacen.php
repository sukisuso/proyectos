<?php
function chechMaxAlmacen($enlace, $userId){
    $sql = 'SELECT * FROM t_recursos where tu_id = ' . $userId . " ";
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


    $sql = 'SELECT tr_u_metal FROM t_recursos where tu_id = ' . $userId . " ";
    $sql2 = 'SELECT tr_u_cristal FROM t_recursos where tu_id = ' . $userId . " ";
    $sql3 = 'SELECT tr_u_ozone FROM t_recursos where tu_id = ' . $userId . " ";

    $resultado = mysql_query($sql, $enlace);
    $resultado2 = mysql_query($sql2, $enlace);
    $resultado3 = mysql_query($sql3, $enlace);

    if (!$resultado || !$resultado2 || !$resultado3) {
        echo '{result:fail}';
        exit;
    }

    while($r = mysql_fetch_assoc($resultado)) {
        $intMetal = $r["tr_u_metal"];
    }
    while($r = mysql_fetch_assoc($resultado2)) {
        $intCristal = $r["tr_u_cristal"];
    }
    while($r = mysql_fetch_assoc($resultado3)) {
        $intOzone = $r["tr_u_ozone"];
    }


    if($intMetal > $rows["capacidadMetal"]){
        $sql = 'UPDATE t_recursos SET tr_u_metal = '. $rows["capacidadMetal"] . '                               
                                where tu_id = ' . $userId ;
        $res = mysql_query($sql, $enlace);
    }
    if($intCristal > $rows["capacidadCristal"]){
        $sql = 'UPDATE t_recursos SET tr_u_cristal = '. $rows["capacidadCristal"] . '                               
                                where tu_id = ' . $userId ;
        $res = mysql_query($sql, $enlace);
    }
    if($intOzone > $rows["capacidadOzone"] ){
        $sql = 'UPDATE t_recursos SET tr_u_ozone = '. $rows["capacidadOzone"] . '                               
                                where tu_id = ' . $userId ;
        $res = mysql_query($sql, $enlace);
    }
}
?>