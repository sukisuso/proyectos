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

$sql="SELECT tu_id FROM t_usuarios where tu_nick = '" . $_GET["user"] . "'";
$resultado = mysql_query($sql, $enlace);
$row=mysql_fetch_assoc($resultado);
$nr = mysql_num_rows($resultado);


if($nr == 0){
	$sql1 = "INSERT INTO `t_usuarios`(`tu_nick`, `tu_passwd`)  
    VALUES ('".$_GET["user"]."', '".$_GET["passwd"] ."' )";
	$re = mysql_query($sql1, $enlace);   	
	$id = mysql_insert_id();
	
	$sql1 = "INSERT INTO `t_update`(`tu_id`)  
    VALUES ('".$id."')";
    $re = mysql_query($sql1, $enlace);   

    $sql1 = "INSERT INTO `t_action`(`tu_id`, `ta_tipo`)  
    VALUES ('".$id."', 1)";
    $re = mysql_query($sql1, $enlace);

    $sql1 = "INSERT INTO `t_recursos`(`tu_id`, `tr_u_metal`, `tr_u_cristal`, `tr_u_ozone`, `tr_damage`)  
    VALUES ('".$id."', 100,100,100,100)";
    var_dump($sql1);
    $re = mysql_query($sql1, $enlace);
}
else {
	echo "error_login";
	mysql_free_result($resultado);
	exit;
} 

mysql_free_result($resultado);
?>