package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

public class Reparar_activity extends ActionBarActivity {

	ProgressBar barra;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_reparar_activity);
		
		((TextView) findViewById(R.id.estadoNave)).setText(""+((NameSpace) this.getApplication()).data.tr_damage + " / 100");
		barra = (ProgressBar) findViewById(R.id.progressBar1);
		 barra.setProgress(((NameSpace) this.getApplication()).data.tr_damage);
		 Button boton = (Button) findViewById(R.id.sbutton_Reparar);
		 
		 if(((NameSpace) this.getApplication()).data.tr_u_metal < 100 ||((NameSpace) this.getApplication()).data.tr_u_cristal < 100
				 || ((NameSpace) this.getApplication()).data.tr_u_ozone < 100){
			 
			 boton.setVisibility(View.INVISIBLE);
		 }
		 
		 boton.setOnClickListener(new OnClickListener() {
				
				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub
					AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Reparar_activity.this);  
			        dialogo1.setMessage("¿Desea reparar la nave?");            
			        dialogo1.setCancelable(false);  
			        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
			            public void onClick(DialogInterface dialogo1, int id) {  
			            	return;
			            }  
			        });  
			        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
			            public void onClick(DialogInterface dialogo1, int id) {  
			                //realizar peticion http
			            	sendPet peticion = new sendPet("/bo/action/repararNave.php?userId="+
			            			((NameSpace) Reparar_activity.this.getApplication()).getUserId(),
			            			((NameSpace) Reparar_activity.this.getApplication()).urlServer);
			        		peticion.execute();
			        		 onBackPressed();
			            }  
			        });
			        dialogo1.show();
				}
			
			});
		 
	}
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}
	
	private class sendPet extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public sendPet(String p, String url){parametro = p;urlServer = url;}
		
		@Override
	    protected Boolean doInBackground(Void... params) {
    	    	try {
    				URL url = new URL(urlServer + parametro);
    				HttpURLConnection  con = (HttpURLConnection) url.openConnection();
    				con.setDoInput(true);
    	            con.setDoOutput(true);
    				BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    				String linea ;
    				while ((linea = in.readLine()) != null) {
    				}
    				
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
   	    	return true;
	    }
	}
	
}
