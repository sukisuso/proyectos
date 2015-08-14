package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.model.Army;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.core.adapter.ArmyAdapter;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.google.gson.Gson;

public class Army_Activity extends ActionBarActivity {

	boolean lock = false;
	ArmyAdapter adapter;
	ListView listArmy;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_shields_);
		
		listArmy = (ListView) findViewById(R.id.listShields);
		Get peticion = new Get("/bo/mainData/getArmys.php",((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
	     
	}

	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(50);
		}
		listArmy.setAdapter(adapter);
		listArmy.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			   @Override
			   public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				   Army escudo =(Army) parent.getItemAtPosition(position);
				   Intent i =new Intent(getBaseContext(), Show_Update_Activity.class);
				   i.putExtra("INTENT_IDOF_SHIELD", escudo.tupt_id);
				   startActivity(i);
			   } 
			});
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
				Army[] planetas = gson.fromJson(response, Army[].class);
				
				adapter = new ArmyAdapter(Army_Activity.this, planetas);
				loadList();
				
   	    	return true;
	    }
	}
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}
}
