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

$sql       = 'SELECT * FROM t_planetas order by tp_distancia';
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