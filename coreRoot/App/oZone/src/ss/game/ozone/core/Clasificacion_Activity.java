package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.model.Clasificacion;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.core.adapter.ClasificacionAdapter;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.google.gson.Gson;

public class Clasificacion_Activity extends ActionBarActivity {

	ListView listaUsuarios;
	ClasificacionAdapter adapter;
	Clasificacion plt;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_clasificacion_);
		
		listaUsuarios = (ListView)findViewById(R.id.listMainMenuoZone);
		
		Get peticion = new Get("/bo/mainData/getClasificacion.php",((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
	}

	@Override
	protected void onResume() {
		super.onResume();
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
				Clasificacion[] classi = gson.fromJson(response, Clasificacion[].class);
				
				adapter = new ClasificacionAdapter(Clasificacion_Activity.this, classi);
   	    	return true;
	    }
		
		@Override
		protected void onPostExecute(Boolean result) {
			// TODO Auto-generated method stub
			super.onPostExecute(result);
			listaUsuarios.setAdapter(adapter);
			listaUsuarios.setOnItemClickListener(new AdapterView.OnItemClickListener() {
				   @Override
				   public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
					   Clasificacion x = (Clasificacion)  parent.getItemAtPosition(position);
					   
					   if(x.tp_distancia > ((NameSpace) Clasificacion_Activity.this.getApplication()).data.tr_u_ozone){
						   String cantt = getResources().getString(R.string.cantidad_ozone);
						   new AlertDialog.Builder(Clasificacion_Activity.this)
					          .setMessage(cantt)
					          .setCancelable(false)
					          .setPositiveButton("Ok", new OnClickListener() {
					              @Override
					              public void onClick(DialogInterface dialog, int which) {}
					          }).create().show(); 
					   } else if(((NameSpace) Clasificacion_Activity.this.getApplication()).data.action.ta_activo
								|| ((NameSpace) Clasificacion_Activity.this.getApplication()).data.update.tup_activo) {
						   String cantt = getResources().getString(R.string.mision_activa);
						   new AlertDialog.Builder(Clasificacion_Activity.this)
					          .setMessage(cantt)
					          .setCancelable(false)
					          .setPositiveButton("Ok", new OnClickListener() {
					              @Override
					              public void onClick(DialogInterface dialog, int which) {}
					          }).create().show(); 
					   }else if(((NameSpace) Clasificacion_Activity.this.getApplication()).data.tr_damage < 75) {
						   String cantt = getResources().getString(R.string.nave_danyada);
						   new AlertDialog.Builder(Clasificacion_Activity.this)
					          .setMessage(cantt)
					          .setCancelable(false)
					          .setPositiveButton("Ok", new OnClickListener() {
					              @Override
					              public void onClick(DialogInterface dialog, int which) {}
					          }).create().show(); 
					   }else if(((NameSpace) Clasificacion_Activity.this.getApplication()).getUserId() == x.tu_id) {
						   String cantt = getResources().getString(R.string.mismo_id);
						   new AlertDialog.Builder(Clasificacion_Activity.this)
					          .setMessage(cantt)
					          .setCancelable(false)
					          .setPositiveButton("Ok", new OnClickListener() {
					              @Override
					              public void onClick(DialogInterface dialog, int which) {}
					          }).create().show(); 
					   }else{
						   confirmarAtacar(x);
					   }
				   }
				});
		}
	}
	
	protected void confirmarAtacar(Clasificacion x) {
		plt = x;
		String at1 = getResources().getString(R.string.desea_AT_1)+" ";
		String at2 = " " + getResources().getString(R.string.msg_d_2)+" ";
		String at3 = " "+getResources().getString(R.string.desea_AT_3);
		AlertDialog.Builder dialogo1 = new AlertDialog.Builder(this);  
        dialogo1.setMessage(at1+x.tu_nick+"?"+at2+x.tp_distancia+at3);            
        dialogo1.setCancelable(false);  
        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
            	return;
            }  
        });  
        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
                //realizar peticion http
            	int userId = ((NameSpace) Clasificacion_Activity.this.getApplication()).getUserId();
            	String servicio = "/bo/action/startAtaque.php?userId="+userId+"&&maloId="+plt.tu_id+"&&timeSec="+plt.tp_distancia;
            	SendActionRecolect peticion = new SendActionRecolect(servicio,((NameSpace) Clasificacion_Activity.this.getApplication()).urlServer );
        		peticion.execute();
            	
            	terminarActivity();
            }  
        });            
        dialogo1.show(); 
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
	
	protected void terminarActivity() {
		// TODO Auto-generated method stub
		
		finish();
	}
}
