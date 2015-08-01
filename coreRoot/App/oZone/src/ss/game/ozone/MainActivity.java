package ss.game.ozone;
import ss.game.ozone.core.ViewoZone;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceActivity;
import android.preference.PreferenceManager;
import android.util.Log;

public class MainActivity extends PreferenceActivity implements SharedPreferences.OnSharedPreferenceChangeListener {

	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
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
        	//CHECK LOGIN.
        	        	
        	Intent act = new Intent(this, ViewoZone.class);
        	startActivity(act);
        }
	}

	@Override
	public void onSharedPreferenceChanged(SharedPreferences arg0, String arg1) {
		// TODO Auto-generated method stub
		checkPreferences();
	}
	
	
}
