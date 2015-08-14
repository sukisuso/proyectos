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

	$sql = 'UPDATE t_update SET tup_activo = 0 where tu_id = ' . $_GET["userId"] ;
    var_dump($sql);
    $resultado = mysql_query($sql, $enlace);
?>