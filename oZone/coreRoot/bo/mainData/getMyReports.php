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

$sql       = 'SELECT trep_id, trep_fecha FROM t_report where trep_lector = ' . $_GET["userId"] . " ";
$resultado = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail2}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
    $rows[] = $r;
}
print json_encode($rows);

mysql_free_result($resultado);

?>