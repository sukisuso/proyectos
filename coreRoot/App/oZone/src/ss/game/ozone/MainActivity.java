package ss.game.ozone;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import ss.game.ozone.core.ViewoZone;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;
import android.util.Log;
import android.widget.Toast;

public class MainActivity extends PreferenceActivity implements SharedPreferences.OnSharedPreferenceChangeListener {
	
	public int UserId;
	public MainActivity me = this;
	
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        UserId = -1;
        addPreferencesFromResource(R.xml.preferences);
        PreferenceManager.getDefaultSharedPreferences(this).registerOnSharedPreferenceChangeListener(this);
        checkPreferences();
    }

	public void checkPreferences (){
		SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(this);
        String nick = prefs.getString("userName", "");
        String pass = prefs.getString("password", "");
        
        if(nick.equals("") || pass.equals("")){ // no hay credenciales
        	
        }else{
        	Get peticion = new Get("/bo/login/checkUser.php?user="+nick+"&&passwd="+pass
        			,((NameSpace) this.getApplication()).urlServer );
    		peticion.execute();
        }
	}

	@Override
	public void onSharedPreferenceChanged(SharedPreferences arg0, String arg1) {
		// TODO Auto-generated method stub
		checkPreferences();
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
    	    	Log.i("reps", response);
				UserId = Integer.parseInt(response);
				
   	    	return true;
	    }
		
		@Override
		protected void onPostExecute(Boolean result) {
			// TODO Auto-generated method stub
			super.onPostExecute(result);
			if(UserId != -1){
        		Intent act = new Intent(me, ViewoZone.class);
        		act.putExtra("USERID", UserId+"" );
        		startActivity(act);
        		finish();
        	}else{
        		String mess = getResources().getString(R.string.error_login);
        		Toast.makeText(getApplicationContext(),mess, Toast.LENGTH_SHORT).show();
        	}
		}
	}
}
