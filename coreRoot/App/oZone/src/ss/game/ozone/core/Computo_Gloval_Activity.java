package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

import com.google.gson.Gson;

public class Computo_Gloval_Activity extends ActionBarActivity {

	public Holder holding;
	public boolean lock = false;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_computo__gloval_);
	
		Get peticion = new Get("/bo/mainData/getComputoGloval.php?userId="+((NameSpace) this.getApplication()).getUserId(),
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
			
		((TextView) findViewById(R.id.estadoEstruct)).setText(""+((NameSpace) this.getApplication()).data.tr_damage);
		((TextView) findViewById(R.id.puntosRank)).setText(""+((NameSpace) this.getApplication()).data.tr_puntos);
		((TextView) findViewById(R.id.showComputo_costeMetal)).setText(""+((NameSpace) this.getApplication()).data.tr_u_metal);
		((TextView) findViewById(R.id.shpwComputo_costecristal)).setText(""+((NameSpace) this.getApplication()).data.tr_u_cristal);
		((TextView) findViewById(R.id.showComputo_costeOzone)).setText(""+((NameSpace) this.getApplication()).data.tr_u_ozone);
		((TextView) findViewById(R.id.fuerzaMotora)).setText("1 T/s");
	}

	public class Holder {
		int escudos;
		int potencia;
	}
	
	public void unlock(){
		lock = true;
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(50);
		}
		((TextView) findViewById(R.id.fuerzaOfensiva)).setText(""+holding.potencia);
		((TextView) findViewById(R.id.fuerzaDefensiva)).setText(""+holding.escudos);
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
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}
}
