package ss.game.ozone.core;

import ss.game.ozone.MainActivity;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.R.id;
import ss.game.ozone.R.layout;
import ss.game.ozone.R.menu;
import ss.game.ozone.core.adapter.MainMenuAdapter;
import android.support.v7.app.ActionBarActivity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.SystemClock;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class ViewoZone extends ActionBarActivity {
	boolean lock = false;
	private MainMenuAdapter adapter;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.core_view_ozone);
		setTitle(getString(R.string.app_name) +" "+ getString(R.string.app_version));
		adapter = new MainMenuAdapter(ViewoZone.this, this);
		((NameSpace) this.getApplication()).setUserId(1); // get from the intent
		((NameSpace) this.getApplication()).bo.getRecursosFromUser(this);
	}
	
	
	@Override
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(100);
		}
		loadMainMenu();
	};

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.viewo_zone, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
        	return true;
		}
		if (id == R.id.action_settings1) {
			SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
			preferences.edit().remove("userName").commit();
			preferences.edit().remove("password").commit();
			Intent myIntent = new Intent(getBaseContext(), MainActivity.class);
			finish();
			startActivity(myIntent);
		}
		return super.onOptionsItemSelected(item);
	}
	
	public void loadMainMenu(){
		ListView listView = (ListView) findViewById(R.id.listMainMenuoZone);
          
	    adapter = new MainMenuAdapter(ViewoZone.this, this);
	    if(((NameSpace) this.getApplication()).data.action.ta_activo){
	    	adapter.addItemAlert(((NameSpace) this.getApplication()).data.action.tat_descripcion, R.layout.core_mainmenu_alertitem,
	    			((NameSpace) this.getApplication()).data.action.ta_fechafin);
	    }
	    
		adapter.addItem("Recursos", R.layout.core_mainmenu_recursos);
		adapter.addItem("Almacenes", R.layout.core_mainmenu_simpleitem);
		
		
		listView.setAdapter(adapter); 
		
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			   @Override
			   public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				   Object x =  parent.getItemAtPosition(position);
				   Log.e("Id", x.toString());
				   
				   if(x.toString().equals("Recursos")){
					   Intent myIntent = new Intent(getBaseContext(), Recursos_Options.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Misión de recolectar")){
					   Intent myIntent = new Intent(getBaseContext(), Mision_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Almacenes")){
					   Intent myIntent = new Intent(getBaseContext(), Almacenes_Activity.class);
					   startActivity(myIntent);
				   }
				   
			   } 
			});
	}
	public void unlock(){
		lock = true;
	}
	
	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		lock = false;
		((NameSpace) this.getApplication()).bo.getRecursosFromUser(this);
	}
}
