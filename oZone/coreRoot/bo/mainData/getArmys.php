<?php
require '../config.php';

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail1}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail2}';
    exit;
}

$sql       = 'SELECT * FROM t_update_type where tupt_seccion = 2';
$resultado = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail3}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
	$r["tupt_descripcion"] = utf8_encode($r["tupt_descripcion"]);
    $rows[] = $r;
}
print json_encode($rows);

mysql_free_result($resultado);

?>