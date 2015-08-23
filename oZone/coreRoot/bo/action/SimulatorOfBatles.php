<?php
require '../config.php';
require 'chechMaxAlmacen.php';

if(!$_GET["atacanteId"]){
	echo '{result:fail}';
    exit;
}

if(!$_GET["defensorId"]){
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

    //get datos atacante
    $sql = 'SELECT ts.ts_escudos, ta.tar_potencial, tu.tu_id, tu.tu_nick , tr.tr_u_metal,tr.tr_u_cristal, tr.tr_u_ozone, tr.tr_damage FROM t_recursos tr, t_shield ts, t_usuarios tu , t_army ta where tr.tu_id = ' . $_GET["atacanteId"] .' AND ts.tupt_id = 4 AND ts.ts_nivel =  tr.tr_n_s_parallax AND tu.tu_id = tr.tu_id AND
        ta.tupt_id = 5 AND ta.tar_nivel =  tr.tr_n_a_cannonlaser ';
    $resultado = mysql_query($sql, $enlace);
    $atacante = mysql_fetch_assoc($resultado);

    $sql = 'SELECT ts.ts_escudos, ta.tar_potencial, tu.tu_id, tu.tu_nick , tr.tr_u_metal,tr.tr_u_cristal, tr.tr_u_ozone, tr.tr_damage FROM t_recursos tr, t_shield ts, t_usuarios tu , t_army ta where tr.tu_id = ' . $_GET["defensorId"] .' AND ts.tupt_id = 4 AND ts.ts_nivel =  tr.tr_n_s_parallax AND tu.tu_id = tr.tu_id AND
        ta.tupt_id = 5 AND ta.tar_nivel =  tr.tr_n_a_cannonlaser ';
    $resultado = mysql_query($sql, $enlace);
    $defensor = mysql_fetch_assoc($resultado);

    $batalla = array();
    $batalla["idAtacante"] = $_GET["atacanteId"];
    $batalla["idDefensa"] = $_GET["defensorId"];
    $batalla["nombreAtacante"] = $atacante['tu_nick'];
    $batalla["nombreDefensa"] = $defensor['tu_nick'];
    $countBatle = 0;
    
    //RONDA 1 
    $suplementoAtaque = mt_rand  ( 1 , 25 );
    $suplementoDefensa = mt_rand  ( 1 , 30 );
    $valorAtaque = $atacante['tar_potencial']+(( $atacante['tar_potencial'] * $suplementoAtaque ) / 100);
    $valorDefensa = $defensor['ts_escudos']-(( $defensor['ts_escudos'] * $suplementoDefensa ) / 100);

    if($valorAtaque > $valorDefensa )
        $countBatle++;
    else
        $countBatle--;
    $batalla["ronda1_ataque"] = $valorAtaque;
    $batalla["ronda1_defensa"] = $valorDefensa;


    //RONDA 2
    $suplementoAtaque = mt_rand  ( 1 , 20 );
    $suplementoDefensa = mt_rand  ( 1 , 20 );
    $valorAtaque = $atacante['ts_escudos']-(( $atacante['ts_escudos'] * $suplementoAtaque ) / 100);
    $valorDefensa = $defensor['tar_potencial']+(( $defensor['tar_potencial'] * $suplementoDefensa ) / 100);

    if($valorAtaque > $valorDefensa )
        $countBatle++;
    else
        $countBatle--;
    $batalla["ronda2_ataque"] = $valorAtaque;
    $batalla["ronda2_defensa"] = $valorDefensa;


    //RONDA 3
    $suplementoAtaque = mt_rand  ( 1 , 45 );
    $suplementoDefensa = mt_rand  ( 1 , 25 );
    $valorAtaque = $atacante['tar_potencial']+(( $atacante['tar_potencial'] * $suplementoAtaque ) / 100);
    $valorDefensa = $defensor['ts_escudos']-(( $defensor['ts_escudos'] * $suplementoDefensa ) / 100);

    if($valorAtaque > $valorDefensa )
        $countBatle++;
    else
        $countBatle--;
    $batalla["ronda3_ataque"] = $valorAtaque;
    $batalla["ronda3_defensa"] = $valorDefensa;

    $idWin = 0;
    //ANALIZAMOS EL RESULTADO
    if($countBatle > 0){//Atacante gana
        $idWin = $batalla["idAtacante"];
        $MetalWIN = $defensor['tr_u_metal'] / 2;
        $CristalWIN = $defensor['tr_u_cristal'] / 2;
        $OzoneWIN = $defensor['tr_u_ozone'] / 2;

        $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone+'. $OzoneWIN .   ', tr_u_metal = tr_u_metal+'.      $MetalWIN . ', tr_u_cristal = tr_u_cristal+'. $CristalWIN .' where tu_id = ' . $_GET["atacanteId"] ;
        $re = mysql_query($sql, $enlace);
        $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'. $OzoneWIN .   ', tr_u_metal = tr_u_metal-'.      $MetalWIN . ', tr_u_cristal = tr_u_cristal-'. $CristalWIN .' where tu_id = ' . $_GET["defensorId"] ;
        $re = mysql_query($sql, $enlace);
        chechMaxAlmacen($enlace,  $_GET["atacanteId"]);

        //Daños
        $dañoatacante = $atacante['tr_damage']- rand ( 1 , 5 );
        $dañodefensor = $defensor['tr_damage']-rand ( 2 , 15 );

    }else{//defensor gana
        $idWin = $batalla["idDefensa"];
        $MetalWIN = $atacante['tr_u_metal'] / 2;
        $CristalWIN = $atacante['tr_u_cristal'] / 2;
        $OzoneWIN = $atacante['tr_u_ozone'] / 2;

        $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone+'. $OzoneWIN .   ', tr_u_metal = tr_u_metal+'.      $MetalWIN . ', tr_u_cristal = tr_u_cristal+'. $CristalWIN .' where tu_id = ' . $_GET["defensorId"] ;
        $re = mysql_query($sql, $enlace);
        $sql = 'UPDATE t_recursos SET tr_u_ozone = tr_u_ozone-'. $OzoneWIN .   ', tr_u_metal = tr_u_metal-'.      $MetalWIN . ', tr_u_cristal = tr_u_cristal-'. $CristalWIN .' where tu_id = ' . $_GET["atacanteId"] ;
        $re = mysql_query($sql, $enlace);
        chechMaxAlmacen($enlace,  $_GET["defensorId"]);

        //Daños
        $dañoatacante = $atacante['tr_damage']-rand ( 3 , 17 );
        $dañodefensor = $defensor['tr_damage']-rand ( 1 , 5 );
    }

    if($dañoatacante < 0){$dañoatacante  = 0;}
    if($dañodefensor < 0){$dañodefensor  = 0;}

    $sql = 'UPDATE t_recursos SET tr_damage = '. $dañoatacante . ' where tu_id = ' . $_GET["atacanteId"] ;
    $re = mysql_query($sql, $enlace); 
    $sql = 'UPDATE t_recursos SET tr_damage = '. $dañodefensor . ' where tu_id = ' . $_GET["defensorId"] ;
    $re = mysql_query($sql, $enlace); 

    //INSERT BATALLA
    $fecha = new DateTime();
    $fecha=date_format($fecha, "Y-m-d H:i:s");
    var_dump($fecha);

    $sql1 = "INSERT INTO `t_report`(`trep_atacanteid`, `trep_defensorid`, `trep_nombreatacante`, `trep_nombredefensor`, `ronda1_ataque`, `ronda1_defensa`, `ronda2_ataque`, `ronda2_defensa`, `ronda3_ataque`, `ronda3defensa`, `trep_id_ganador`, `trep_lector`, `trep_metal`, `trep_cristal`, `trep_ozone`, `trep_fecha`)  
    VALUES ('".$batalla["idAtacante"]."', '".$batalla["idDefensa"] ."', '". $batalla["nombreAtacante"]."', '".$batalla["nombreDefensa"]."' , '" .$batalla["ronda1_ataque"]."', '" .$batalla["ronda1_defensa"]."', '". $batalla["ronda2_ataque"]."' , '". $batalla["ronda2_defensa"]."', '". $batalla["ronda3_ataque"]."', '" .$batalla["ronda3_defensa"]."', '".$idWin."', '".$batalla["idAtacante"]."', '".$MetalWIN."', '".$CristalWIN."', '".$OzoneWIN."', '".$fecha."' )";
    $sql2 = "INSERT INTO `t_report`(`trep_atacanteid`, `trep_defensorid`, `trep_nombreatacante`, `trep_nombredefensor`, `ronda1_ataque`, `ronda1_defensa`, `ronda2_ataque`, `ronda2_defensa`, `ronda3_ataque`, `ronda3defensa`, `trep_id_ganador`, `trep_lector`, `trep_metal`, `trep_cristal`, `trep_ozone`, `trep_fecha`)
    VALUES ('".$batalla["idAtacante"]."', '".$batalla["idDefensa"] ."', '". $batalla["nombreAtacante"]."', '".$batalla["nombreDefensa"]."' , '". $batalla["ronda1_ataque"]."', '" .$batalla["ronda1_defensa"]."', '". $batalla["ronda2_ataque"]."' , '". $batalla["ronda2_defensa"]."', '". $batalla["ronda3_ataque"]."', '" .$batalla["ronda3_defensa"]."', '".$idWin."', '".$batalla["idDefensa"]."', '".$MetalWIN."', '".$CristalWIN."', '".$OzoneWIN."', '".$fecha."'  )";
    $re = mysql_query($sql1, $enlace); 
    $re = mysql_query($sql2, $enlace); 


//finalizamos la mision del atacante.
$sql = 'UPDATE t_action SET ta_activo = 0 where tu_id = ' . $_GET["atacanteId"] ;
$res = mysql_query($sql, $enlace);

mysql_free_result($resultado);
?>