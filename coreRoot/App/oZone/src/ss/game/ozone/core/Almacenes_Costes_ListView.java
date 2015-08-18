package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.model.Almacen;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.core.adapter.CostesAlmacenAdapter;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.ListView;

import com.google.gson.Gson;

public class Almacenes_Costes_ListView extends ActionBarActivity {

	ListView listaCostes;
	CostesAlmacenAdapter adapter;
	Almacen plt;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_almacenes__costes__list_view);
		
		listaCostes = (ListView)findViewById(R.id.listViewCostes);

		Get peticion = new Get("/bo/mainData/getAllCostesAlmacen.php", ((NameSpace) this.getApplication()).urlServer);
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
    				Log.e("costes",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
	    	    	Gson gson = new Gson();
					Almacen[] alm = gson.fromJson(response, Almacen[].class);
					adapter = new CostesAlmacenAdapter(Almacenes_Costes_ListView.this, alm);
   	    	return true;
	    }
		
		@Override
		protected void onPostExecute(Boolean result) {
			// TODO Auto-generated method stub
			super.onPostExecute(result);
			listaCostes.setAdapter(adapter);
		}
	}
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}

}
