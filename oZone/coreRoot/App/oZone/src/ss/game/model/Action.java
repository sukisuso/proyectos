package ss.game.model;

import java.util.Date;

public class Action{
	public int ta_id;
	public int ta_target;
	public int ta_tipo;
	public boolean ta_activo;
	public Date ta_fechafin;
	public String tat_descripcion;
	
	Action(){
		 ta_id = 0;
	     ta_target = 0;
	     ta_tipo = 0;
		 ta_activo = false;
		 ta_fechafin = new Date();
		 tat_descripcion = "";
	}
}