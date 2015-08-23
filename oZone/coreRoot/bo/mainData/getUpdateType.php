<?php
require '../config.php';

if(!$_GET["updateId"]){
	echo '{result:fail1}';
    exit;
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail2}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail3}';
    exit;
}

$sql       = 'SELECT tupt_descripcion FROM t_update_type where tupt_id = ' . $_GET["updateId"] . " ";
$resultado = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail4}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
    $rows = $r;
}
echo utf8_encode($rows['tupt_descripcion']);

mysql_free_result($resultado);
?>