<?php
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_NAME', 'ozone');

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail}';
    exit;
}

//Comprobar si tiene mision activa

    $sql = 'UPDATE t_recursos SET tr_u_ozone= tr_u_ozone + 2 where tr_u_ozone < 60' ;
    $re = mysql_query($sql, $enlace);
?>