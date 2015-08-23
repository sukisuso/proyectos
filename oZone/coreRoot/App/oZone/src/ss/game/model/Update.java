package ss.game.model;

import java.util.Date;

public class Update{
	public int tup_id;
	public int tu_id;
	public int tup_tipo;
	public boolean tup_activo;
	public Date tup_fechafin;
	
	Update(){
		tup_id = 0;
		tu_id = 0;
		tup_tipo = 0;
		tup_activo = false;
		tup_fechafin = new Date();
	}
}