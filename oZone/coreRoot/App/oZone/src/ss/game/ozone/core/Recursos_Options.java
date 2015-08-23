package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.google.gson.Gson;

public class Recursos_Options extends ActionBarActivity {
	public boolean lock = false;
	public TextView metal;
	public TextView cristal;
	public TextView ozone;
	public Capacidades capacidades;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_recursos__options);
		setTitle(getString(R.string.recursosOptions_mRecursos) );
		
//		http://localhost:8080/bo/mainData/getCapacidadAlmacen.php?userId=1
		GetValuesAlmacen peticion = new GetValuesAlmacen("/bo/mainData/getCapacidadAlmacen.php?userId="+
				((NameSpace) this.getApplication()).getUserId(),
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
		
		metal = (TextView) findViewById(R.id.textView1);
		cristal = (TextView) findViewById(R.id.textView2);
		ozone = (TextView) findViewById(R.id.textView3);

		Button bExp = (Button) findViewById(R.id.buttonExpedicion);
   	   	bExp.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			Intent myIntent = new Intent(getBaseContext(), Planets_Listiview.class);
   	   			finish();
   	   			startActivity(myIntent);
   	    	} 
   	   	});
   	   	
   	   	if(((NameSpace) this.getApplication()).data.action.ta_activo
   	   			|| ((NameSpace) this.getApplication()).data.update.tup_activo){
   	   		bExp.setVisibility(View.INVISIBLE);
   	   	}
	}
	
	@Override
	protected void onResume() {
		super.onResume();
	}
	
	private class GetValuesAlmacen extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public GetValuesAlmacen(String p, String url){parametro = p;urlServer = url;}
		
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
    				Log.e("Capacidad ALmacenes",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
    	    	Gson gson = new Gson();
    	    	Capacidades cos = gson.fromJson(response, Capacidades.class);
    	    	capacidades = cos;
    	    	
   	    	return true;
	    }
		
		@Override
		protected void onPostExecute(Boolean result) {
			// TODO Auto-generated method stub
			super.onPostExecute(result);
			metal.setText(((NameSpace) Recursos_Options.this.getApplication()).data.tr_u_metal+" / "+capacidades.capacidadMetal);
	   	   	cristal.setText(((NameSpace) Recursos_Options.this.getApplication()).data.tr_u_cristal+" / "+capacidades.capacidadCristal);
	   	   	ozone.setText(((NameSpace) Recursos_Options.this.getApplication()).data.tr_u_ozone+" / "+capacidades.capacidadOzone);
		}
	}
	
	public class Capacidades {
		public int capacidadMetal;
		public int capacidadCristal;
		public int capacidadOzone;
	}
}
