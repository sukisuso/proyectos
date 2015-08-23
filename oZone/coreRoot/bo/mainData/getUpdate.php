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

$sql       = 'SELECT * FROM t_update WHERE tu_id = ' . $_GET["userId"] . " ";
$resultado = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
    $rows = $r;
}

if($rows['tup_activo'] == "1"){
	$rows['tup_activo'] = "true";
}else{
	$rows['tup_activo'] = "false";
}

print json_encode($rows);

mysql_free_result($resultado);

?>