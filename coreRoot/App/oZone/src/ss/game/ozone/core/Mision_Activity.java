package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;

import com.google.gson.Gson;

import ss.game.model.Action;
import ss.game.model.Planet;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.R.id;
import ss.game.ozone.R.layout;
import ss.game.ozone.R.menu;
import ss.game.ozone.core.adapter.PlanetsAdapter;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.SystemClock;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

public class Mision_Activity extends ActionBarActivity {

	boolean lock = false;
	String NombrePlaneta = "";
	private Action mision;
	private TextView tipoMision;
	private TextView targetMision;
	private TextView timmer;
	private SeekBar cohete;
	private Button cancelarB;
	private Button finalB;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_mision_);
		tipoMision = (TextView) findViewById(R.id.tipoMisionText);
		targetMision = (TextView) findViewById(R.id.targetisionText);
		timmer = (TextView) findViewById(R.id.timmerMisionText);
		cancelarB = (Button) findViewById(R.id.buttonCancelMision);
		finalB = (Button) findViewById(R.id.buttonFinMision);
		mision = ((NameSpace) this.getApplication()).data.action;
		tipoMision.setText(mision.tat_descripcion);
		
		if(mision.ta_tipo == 1){
			Get peticion = new Get("/bo/mainData/getPlanetaById.php?planetaId="+mision.ta_target,
					((NameSpace) this.getApplication()).urlServer );
			peticion.execute();
		}
		
		cancelarB.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			dialogCancelMision();
   	    	} 
   	   	});
		
		finalB.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			finalizarMision();
   	    	} 
   	   	});
		
		Date actualDate = new Date();
		long timetCount = mision.ta_fechafin.getTime() - actualDate.getTime();
		if(timetCount > 0 ){
			new CountDownTimer(timetCount, 1000) {
			     public void onTick(long millisUntilFinished) {
			    	 timmer.setText("Seconds " + millisUntilFinished / 1000);
			     }
			     public void onFinish() {
			    	 timmer.setText("Misión terminada");
			    	 finalB.setVisibility(View.VISIBLE);
			    	 cancelarB.setVisibility(View.INVISIBLE);
			     }
			 }.start();
		 }else{
			 timmer.setText("Misión terminada");
			 finalB.setVisibility(View.VISIBLE);
	    	 cancelarB.setVisibility(View.INVISIBLE);
		 }
		
	}

	protected void finalizarMision() {
		// TODO Auto-generated method stub
		setContentView(R.layout.mask);
		int uId = ((NameSpace) Mision_Activity.this.getApplication()).getUserId();
		senPetMision peticion = new senPetMision("/bo/action/finalizarMision.php?userId="+uId
				+"&&targetId="+mision.ta_target+"&&tipoMision="+mision.ta_tipo,
    			((NameSpace) Mision_Activity.this.getApplication()).urlServer );
    	peticion.execute();
    	terminarActivity();
	}

	protected void dialogCancelMision() {
		AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Mision_Activity.this);  
	        dialogo1.setMessage("¿Desea cancelar la misión?");            
	        dialogo1.setCancelable(false);  
	        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	            	return;
	            }  
	        });  
	        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
	            public void onClick(DialogInterface dialogo1, int id) {  
	            	terminarActivity();
	            }
	        });            
	        dialogo1.show(); 
	}

	public  void terminarActivity() {
		setContentView(R.layout.mask);
		int uId = ((NameSpace) Mision_Activity.this.getApplication()).getUserId();
    	senPetMision peticion = new senPetMision("/bo/action/cancelMision.php?userId="+uId,
    			((NameSpace) Mision_Activity.this.getApplication()).urlServer );
    	peticion.execute();
		finish();
	} 

	@Override
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(100);
		}
		targetMision.setText(NombrePlaneta);
	};
	
	public void unlock(){
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
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	Gson gson = new Gson();
    	    	Planet p = gson.fromJson(response, Planet.class);
    	    	NombrePlaneta = p.tp_nombre;
    	    	unlock();
				
   	    	return true;
	    }
	}
	
	private class senPetMision extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public senPetMision(String p, String url){parametro = p;urlServer = url;}
		
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
