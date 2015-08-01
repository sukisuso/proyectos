package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import com.google.gson.Gson;

import ss.game.model.DataUser;
import ss.game.model.Planet;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.R.id;
import ss.game.ozone.R.layout;
import ss.game.ozone.R.menu;
import ss.game.ozone.core.adapter.PlanetsAdapter;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class Planets_Listiview extends ActionBarActivity {
	boolean lock = false;
	ListView listaPlanetas;
	PlanetsAdapter adapter;
	Planet plt;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_planets__listiview);
		listaPlanetas = (ListView)findViewById(R.id.listMainMenuoZone);
		
		Get peticion = new Get("/bo/mainData/getAllPlanets.php",((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(100);
		}
		listaPlanetas.setAdapter(adapter);
		listaPlanetas.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			   @Override
			   public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				   Planet x = (Planet)  parent.getItemAtPosition(position);
				   
				   if(x.tp_distancia > ((NameSpace) Planets_Listiview.this.getApplication()).data.tr_u_ozone){
					   new AlertDialog.Builder(Planets_Listiview.this)
				          .setMessage("No dispones de suficiente ozone para este viaje.")
				          .setCancelable(false)
				          .setPositiveButton("Ok", new OnClickListener() {
				              @Override
				              public void onClick(DialogInterface dialog, int which) {}
				          }).create().show(); 
				   }else{
					   confirmarRecolecta(x);
				   }
			   } 
			});
	};
	
	protected void confirmarRecolecta(Planet x) {
		plt = x;
		AlertDialog.Builder dialogo1 = new AlertDialog.Builder(this);  
        dialogo1.setMessage("�Desea ir a recolectar a "+x.tp_nombre+"?");            
        dialogo1.setCancelable(false);  
        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
            	return;
            }  
        });  
        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
                //realizar peticion http
            	int userId = ((NameSpace) Planets_Listiview.this.getApplication()).getUserId();
            	String servicio = "/bo/action/startRecoleccion.php?userId="+userId+"&&planetId="+plt.tp_id+"&&timeSec="+plt.tp_distancia;
            	SendActionRecolect peticion = new SendActionRecolect(servicio,((NameSpace) Planets_Listiview.this.getApplication()).urlServer );
        		peticion.execute();
            	
            	terminarActivity();
            }  
        });            
        dialogo1.show(); 
	}

	protected void terminarActivity() {
		// TODO Auto-generated method stub
		
		finish();
	}

	public void loadList(){
		lock = true;
	}
	
	private class Get extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public Get(String p, String url){parametro = p;urlServer = url;}
		
		@Override
	    protected Boolean doInBackground(Void... params) {
    	    	String response = "";
    	    	try {
    				URL url = new URL(urlServer + parametro);
    				HttpURLConnection  con = (HttpURLConnection) url.openConnection();

    				con.setDoInput(true);
    	            con.setDoOutput(true);
    				BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    				String linea;
    				while ((linea = in.readLine()) != null) {
    					response +=linea;
    				}
    				Log.e("planets",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
    	    	Gson gson = new Gson();
				Planet[] planetas = gson.fromJson(response, Planet[].class);
				
				adapter = new PlanetsAdapter(Planets_Listiview.this, planetas);
				loadList();
				
   	    	return true;
	    }
	}
	
	private class SendActionRecolect extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public SendActionRecolect(String p, String url){parametro = p;urlServer = url;}
		
		@Override
	    protected Boolean doInBackground(Void... params) {
    	    	try {
    				URL url = new URL(urlServer + parametro);
    				HttpURLConnection  con = (HttpURLConnection) url.openConnection();
    				con.setDoInput(true);
    	            con.setDoOutput(true);
    				BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    				String linea;
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
