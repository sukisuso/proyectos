<?php
require '../config.php';

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail}';
    exit;
}

$sql       = 'SELECT tu.tu_nick as tu_nick , tu.tu_id as tu_id, tr.tr_puntos as tr_puntos  
			FROM t_usuarios tu, t_recursos tr
			where tu.tu_id = tr.tu_id
			order by tr.tr_puntos DESC';
$resultado = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail}';
    exit;
}

$rows = array();
while($r = mysql_fetch_assoc($resultado)) {
    $rows[] = $r;
}
print json_encode($rows);

mysql_free_result($resultado);

?>