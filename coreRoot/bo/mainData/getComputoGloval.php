<?php
require '../config.php';

if(!$_GET["userId"]){
	echo '{result:fail}';
    exit;
}

if (!$enlace = mysql_connect(DB_HOST, DB_USER, '')) {
    echo '{result:fail1}';
    exit;
}

if (!mysql_select_db(DB_NAME, $enlace)) {
    echo '{result:fail2}';
    exit;
}

$sql       = 'SELECT ts.ts_escudos as escudos FROM t_recursos tr, t_shield ts 
			where ts.tupt_id = 4 AND ts.ts_nivel = tr.tr_n_s_parallax AND tr.tu_id = ' .$_GET["userId"] ;
$resultado = mysql_query($sql, $enlace);
$sql       = 'SELECT ta.tar_potencial as potencia FROM t_recursos tr, t_army ta 
			where ta.tupt_id = 5 AND ta.tar_nivel = tr.tr_n_a_cannonlaser AND tr.tu_id = ' .$_GET["userId"] ;
$res = mysql_query($sql, $enlace);

if (!$resultado) {
    echo '{result:fail3}';
    exit;
}

$rows = array();
$r = mysql_fetch_assoc($resultado);
$r2 = mysql_fetch_assoc($res);
$rows["escudos"] = $r["escudos"];
$rows["potencia"] = $r2["potencia"];

print json_encode($rows);

mysql_free_result($resultado);

?>