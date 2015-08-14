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
import android.widget.Button;
import android.widget.TextView;

import com.google.gson.Gson;

public class Almacenes_Activity extends ActionBarActivity {
	boolean lock = false;
	public Costes costes;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_almacenes_);
		
		
//		http://localhost:8080/bo/mainData/getCostesALmacenesUp.php?nivelMetal=1&&nivelCristal=1&&nivelOzone=1
		GetValues peticion = new GetValues("/bo/mainData/getCostesALmacenesUp.php?nivelMetal="+(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_metal+1)
				+"&&nivelCristal="+(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_cristal+1)
				+"&&nivelOzone="+(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_ozone+1),
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
		
		TextView nivelMetal = (TextView) findViewById(R.id.nivelMetal);
		TextView nivelCristal = (TextView) findViewById(R.id.nivelCristal);
		TextView nivelOzone = (TextView) findViewById(R.id.nivelOzone);
		
		nivelMetal.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_metal+"");
		nivelCristal.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_cristal+"");
		nivelOzone.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_ozone+"");
		
		Button bUpM = (Button)findViewById(R.id.subir_Metal);
		bUpM.setOnClickListener(new View.OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			if(costes.costeMetal.tal_coste_metal<= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
   	   			  && costes.costeMetal.tal_coste_cristal <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
   	   			  && costes.costeMetal.tal_coste_ozone <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
   	   				update("Metal");
   	   			}	
   	    	} 
   	   	});
		
		Button bUpC = (Button)findViewById(R.id.subir_Cristal);
		bUpC.setOnClickListener(new View.OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			if(costes.costeCristal.tal_coste_metal<= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
   	   			  && costes.costeCristal.tal_coste_cristal <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
   	   			  && costes.costeCristal.tal_coste_ozone <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
   	   				update("Cristal");
   	   			}	
   	    	} 
   	   	});
		
		Button bUpO = (Button)findViewById(R.id.subir_Ozone);
		bUpO.setOnClickListener(new View.OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			if(costes.costeOzone.tal_coste_metal<= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
   	   			  && costes.costeOzone.tal_coste_cristal <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
   	   			  && costes.costeOzone.tal_coste_ozone <= ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
   	   				update("Ozone");
   	   			}	
   	    	} 
   	   	});
		
	}

	protected void update(String string) {
		// TODO Auto-generated method stub
		if(string.equals("Metal")){
			AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Almacenes_Activity.this);  
	        dialogo1.setMessage("¿Desea Actualizar el almacen de metal? Tardará "+costes.costeMetal.tal_costeTemporal+" segundos.");            
	        dialogo1.setCancelable(false);  
	        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	            	return;
	            }  
	        });  
	        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	                //realizar peticion http
	            	Update peticion = new Update("/bo/action/startUpdate.php?userId="+((NameSpace) Almacenes_Activity.this.getApplication()).getUserId()
	            			+"&&updateId=1&&timeSec="+costes.costeMetal.tal_costeTemporal
	            			+"&&costeMetal="+costes.costeMetal.tal_coste_metal
	            			+"&&costeCristal="+costes.costeMetal.tal_coste_cristal 
	            			+"&&costeOzone="+costes.costeMetal.tal_coste_ozone,
	            			((NameSpace) Almacenes_Activity.this.getApplication()).urlServer);
	        		peticion.execute();
	        		 onBackPressed();
	            }  
	        });
	        dialogo1.show();
		} else if(string.equals("Cristal")){
			AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Almacenes_Activity.this);  
	        dialogo1.setMessage("¿Desea Actualizar el almacen de cristal? Tardará "+costes.costeCristal.tal_costeTemporal+" segundos.");            
	        dialogo1.setCancelable(false);  
	        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	            	return;
	            }  
	        });  
	        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	                //realizar peticion http
	            	Update peticion = new Update("/bo/action/startUpdate.php?userId="+((NameSpace) Almacenes_Activity.this.getApplication()).getUserId()
	            			+"&&updateId=2&&timeSec="+costes.costeCristal.tal_costeTemporal
	            			+"&&costeMetal="+costes.costeCristal.tal_coste_metal
	            			+"&&costeCristal="+costes.costeCristal.tal_coste_cristal 
	            			+"&&costeOzone="+costes.costeCristal.tal_coste_ozone,
	            			((NameSpace) Almacenes_Activity.this.getApplication()).urlServer);
	        		peticion.execute();
	        		 onBackPressed();
	            }  
	        });
	        dialogo1.show();
		}else if(string.equals("Ozone")){
			AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Almacenes_Activity.this);  
	        dialogo1.setMessage("¿Desea Actualizar el almacen de ozone? Tardará "+costes.costeOzone.tal_costeTemporal+" segundos.");            
	        dialogo1.setCancelable(false);  
	        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	            	return;
	            }  
	        });  
	        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	                //realizar peticion http
	            	Update peticion = new Update("/bo/action/startUpdate.php?userId="+((NameSpace) Almacenes_Activity.this.getApplication()).getUserId()
	            			+"&&updateId=3&&timeSec="+costes.costeOzone.tal_costeTemporal
	            			+"&&costeMetal="+costes.costeOzone.tal_coste_metal
	            			+"&&costeCristal="+costes.costeOzone.tal_coste_cristal 
	            			+"&&costeOzone="+costes.costeOzone.tal_coste_ozone,
	            			((NameSpace) Almacenes_Activity.this.getApplication()).urlServer);
	        		peticion.execute();
	        		 onBackPressed();
	            }  
	        });
	        dialogo1.show();
		}
	}

	@Override
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(50);
		}
		((TextView)findViewById(R.id.AMcoste_Metal)).setText(costes.costeMetal.tal_coste_metal+"");
		((TextView)findViewById(R.id.AMcoste_Cristal)).setText(costes.costeMetal.tal_coste_cristal+"");
		((TextView)findViewById(R.id.AMcoste_Ozone)).setText(costes.costeMetal.tal_coste_ozone+"");
		
		((TextView)findViewById(R.id.ACcoste_Metal)).setText(costes.costeCristal.tal_coste_metal+"");
		((TextView)findViewById(R.id.ACcoste_Cristal)).setText(costes.costeCristal.tal_coste_cristal+"");
		((TextView)findViewById(R.id.ACcoste_Ozone)).setText(costes.costeCristal.tal_coste_ozone+"");
		
		((TextView)findViewById(R.id.AOcoste_Metal)).setText(costes.costeOzone.tal_coste_metal+"");
		((TextView)findViewById(R.id.AOcoste_Cristal)).setText(costes.costeOzone.tal_coste_cristal+"");
		((TextView)findViewById(R.id.AOcoste_Ozone)).setText(costes.costeOzone.tal_coste_ozone+"");
		
		if(((NameSpace) Almacenes_Activity.this.getApplication()).data.action.ta_activo
				|| ((NameSpace) Almacenes_Activity.this.getApplication()).data.update.tup_activo){//COMPROBAR UPDATE ACTIVO
			((Button)findViewById(R.id.subir_Metal)).setVisibility(View.INVISIBLE);
			((Button)findViewById(R.id.subir_Cristal)).setVisibility(View.INVISIBLE);
			((Button)findViewById(R.id.subir_Ozone)).setVisibility(View.INVISIBLE);
		}
		
		if(costes.costeMetal.tal_coste_metal> ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
	   			  || costes.costeMetal.tal_coste_cristal > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
	   			  || costes.costeMetal.tal_coste_ozone > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
			((Button)findViewById(R.id.subir_Metal)).setVisibility(View.INVISIBLE);
		}
		if(costes.costeCristal.tal_coste_metal> ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
	   			  || costes.costeCristal.tal_coste_cristal > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
	   			  || costes.costeCristal.tal_coste_ozone > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
			((Button)findViewById(R.id.subir_Cristal)).setVisibility(View.INVISIBLE);
		}
		
		if(costes.costeOzone.tal_coste_metal> ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_metal
	   			  || costes.costeOzone.tal_coste_cristal > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_cristal
	   			  || costes.costeOzone.tal_coste_ozone > ((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_u_ozone){
			((Button)findViewById(R.id.subir_Ozone)).setVisibility(View.INVISIBLE);
		}
	}
	
	public void unLock(){
		lock = true;
	}
	
	private class GetValues extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public GetValues(String p, String url){parametro = p;urlServer = url;}
		
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
    				Log.e("costes",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
    	    	Gson gson = new Gson();
    	    	Costes cos = gson.fromJson(response, Costes.class);
    	    	costes = cos;
    	    	unLock();
   	    	return true;
	    }
	}
	
	public class Costes{
		public CosteAlmacen costeMetal;
		public CosteAlmacen costeCristal;
		public CosteAlmacen costeOzone;
	}
	
	public class CosteAlmacen{
		public int tal_coste_metal;
		public int tal_coste_cristal;
		public int tal_coste_ozone;
		public int tal_costeTemporal;
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
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.almacenes_, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			Intent myIntent = new Intent(getBaseContext(), Almacenes_Costes_ListView.class);
			startActivity(myIntent);
		}
		return super.onOptionsItemSelected(item);
	}
}
