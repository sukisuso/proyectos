<?php
require '../config.php';

if(!$_GET["user"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["passwd"]){
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

//Comprobar si tiene mision activa

$sql='SELECT tu_id FROM t_usuarios where tu_nick = "' . $_GET["user"] . '" AND tu_passwd = "'. $_GET["passwd"] .'"';
$resultado = mysql_query($sql, $enlace);
$row=mysql_fetch_assoc($resultado);
$nr = mysql_num_rows($resultado);


if($nr == 1){
echo $row["tu_id"];
}
else if($nr == 0) {
echo "-1";
} 

mysql_free_result($resultado);
?>