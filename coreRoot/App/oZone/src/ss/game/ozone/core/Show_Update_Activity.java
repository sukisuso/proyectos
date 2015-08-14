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
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.google.gson.Gson;

public class Show_Update_Activity extends ActionBarActivity {
	private final String TAG = "Show_update_Activity_DEV";
	public boolean lock = false;
	public Holder holding;
	public int Nivel;
	public int updateId;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_show__update_);
//		http://localhost:8080/bo/mainData/getUpdateById.php?nivelId=1&&updateType=4
		Intent intent = getIntent();
		int id = intent.getIntExtra("INTENT_IDOF_SHIELD", 0);
		updateId = id;
		Nivel = getNivelFromId(id);
		
		Get peticion = new Get("/bo/mainData/getUpdateById.php?nivelId="+Nivel+"&&updateType="+id,
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
		
		((Button)findViewById(R.id.showUpdate_button)).setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Show_Update_Activity.this);  
		        dialogo1.setMessage("¿Desea Actualizar el "+holding.nombre+"? Tardará "+holding.tiempo+" segundos.");            
		        dialogo1.setCancelable(false);  
		        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
		            public void onClick(DialogInterface dialogo1, int id) {  
		            	return;
		            }  
		        });  
		        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
		            public void onClick(DialogInterface dialogo1, int id) {  
		                //realizar peticion http
		            	Update peticion = new Update("/bo/action/startUpdate.php?userId="+((NameSpace) Show_Update_Activity.this.getApplication()).getUserId()
		            			+"&&updateId="+updateId+"&&timeSec="+holding.tiempo
		            			+"&&costeMetal="+holding.coste_metal
		            			+"&&costeCristal="+holding.coste_cristal 
		            			+"&&costeOzone="+holding.coste_ozone,
		            			((NameSpace) Show_Update_Activity.this.getApplication()).urlServer);
		        		peticion.execute();
		        		 onBackPressed();
		            }  
		        });
		        dialogo1.show();
			}
		
		});
	}


	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
//		getMenuInflater().inflate(R.menu.show__update_, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_verCostesShw_update) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(50);
		}
		
		((TextView)findViewById(R.id.showUpdate_nombre)).setText(holding.nombre);
		((TextView)findViewById(R.id.showUpdate_nivel)).setText(Nivel+"");
		((TextView)findViewById(R.id.showUpdate_potencial)).setText(holding.potencial+"");
		((TextView)findViewById(R.id.showUpdate_costeMetal)).setText(holding.coste_metal+"");
		((TextView)findViewById(R.id.shpwUpdate_costecristal)).setText(holding.coste_cristal+"");
		((TextView)findViewById(R.id.showUpdate_costeOzone)).setText(holding.coste_ozone+"");
		
		setTitle("Update Visión: "+holding.nombre);
		
		if(((NameSpace) Show_Update_Activity.this.getApplication()).data.action.ta_activo
				|| ((NameSpace) Show_Update_Activity.this.getApplication()).data.update.tup_activo){//COMPROBAR UPDATE ACTIVO
			((Button)findViewById(R.id.showUpdate_button)).setVisibility(View.INVISIBLE);
		}
		
		if(holding.coste_metal> ((NameSpace) Show_Update_Activity.this.getApplication()).data.tr_u_metal
	   			  || holding.coste_cristal > ((NameSpace) Show_Update_Activity.this.getApplication()).data.tr_u_cristal
	   			  || holding.coste_ozone > ((NameSpace) Show_Update_Activity.this.getApplication()).data.tr_u_ozone){
			((Button)findViewById(R.id.showUpdate_button)).setVisibility(View.INVISIBLE);
		}
	}
	
	public void unlock(){
		lock = true;
	}
	
	public class Holder {
		String nombre;
		int nivel;
		int potencial;
		int coste_metal;
		int coste_cristal;
		int coste_ozone;
		int tiempo;
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
				Holder hold = gson.fromJson(response, Holder.class);
				holding = hold;
				unlock();
   	    	return true;
	    }
	}

	
	private int getNivelFromId(int id) {
		// TODO Auto-generated method stub
		int value = 0;
		if(id == 4){
			
			value =  ((NameSpace) this.getApplication()).data.tr_n_s_parallax;
		} else if(id == 5){
			value =  ((NameSpace) this.getApplication()).data.tr_n_a_cannonlaser;
		}
		return value;
	}
	
	private class Update extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public Update(String p, String url){parametro = p;urlServer = url;}
		
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
    				Log.e("update",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
   	    	return true;
	    }
	}
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}
	
}
