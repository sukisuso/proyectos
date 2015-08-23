package ss.game.ozone.core;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import ss.game.ozone.MainActivity;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import ss.game.ozone.core.adapter.MainMenuAdapter;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

public class ViewoZone extends ActionBarActivity {

	private MainMenuAdapter adapter;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		setContentView(R.layout.core_view_ozone);
		setTitle(getString(R.string.app_name) +" "+ getString(R.string.app_version));
		adapter = new MainMenuAdapter(ViewoZone.this, this);
		
		Intent iin= getIntent();
		Bundle b = iin.getExtras();

		int userID = 0;
        if(b!=null)
        {
             userID =Integer.parseInt((String) b.get("USERID"));
        }else{
        	finish();
        }
        
        if(userID == 0)
        	finish();
        
		((NameSpace) this.getApplication()).setUserId(userID); 
		((NameSpace) this.getApplication()).bo.getRecursosFromUser(this);
	}
	
	
	@Override
	protected void onResume() {
		super.onResume();
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
	    	adapter.addItemAlert(((NameSpace) this.getApplication()).data.action.tat_descripcion, R.layout.core_mainmenu_alertitem);
	    }
	    
	    if(((NameSpace) this.getApplication()).data.update.tup_activo){
	    	adapter.addItem("Evolución en curso", R.layout.core_mainmenu_updat);
	    }
	    
	    //Reportes de Batalla
	    if(((NameSpace) this.getApplication()).datareport.length > 0){
	    	for(int i = 0; i < ((NameSpace) this.getApplication()).datareport.length ; i++){
	    		DateFormat df = new SimpleDateFormat("MM/dd HH:mm:ss");
	    		String date = df.format(((NameSpace) this.getApplication()).datareport[i].trep_fecha);
	    		adapter.addItem("Reporte de Batalla ["+date +"]"
	    				, R.layout.core_mainmenu_reportitem);
	    	}
	    }
	    
		adapter.addItem("Recursos", R.layout.core_mainmenu_recursos);
		adapter.addItem("Computo", R.layout.core_mainmenu_simpleitem);
		adapter.addItem("Almacenes", R.layout.core_mainmenu_simpleitem);
		adapter.addItem("Escudos", R.layout.core_mainmenu_simpleitem);
		adapter.addItem("Armamento", R.layout.core_mainmenu_simpleitem);
		adapter.addItem("Estadisticas", R.layout.core_mainmenu_simpleitem);
		adapter.addItem("Reparar", R.layout.core_mainmenu_simpleitem);
		
		
		listView.setAdapter(adapter); 
		
		listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
			   @Override
			   public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
				   Object x =  parent.getItemAtPosition(position);
				   Log.e("Id", x.toString());
				   
				   if(x.toString().equals("Recursos")){
					   Intent myIntent = new Intent(getBaseContext(), Recursos_Options.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Misión de recolectar") || x.toString().equals("Batalla en curso") ){
					   Intent myIntent = new Intent(getBaseContext(), Mision_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Almacenes")){
					   Intent myIntent = new Intent(getBaseContext(), Almacenes_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Evolución en curso")){
					   Intent myIntent = new Intent(getBaseContext(), Update_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Escudos")){
					   Intent myIntent = new Intent(getBaseContext(), Shields_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Armamento")){
					   Intent myIntent = new Intent(getBaseContext(), Army_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Reparar")){
					   Intent myIntent = new Intent(getBaseContext(), Reparar_activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Computo")){
					   Intent myIntent = new Intent(getBaseContext(), Computo_Gloval_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().equals("Estadisticas")){
					   Intent myIntent = new Intent(getBaseContext(), Clasificacion_Activity.class);
					   startActivity(myIntent);
				   }else if(x.toString().contains("Reporte de Batalla")){
					   int id1 = ((NameSpace) ViewoZone.this.getApplication()).datareport[0].trep_id;
					   Intent myIntent = new Intent(getBaseContext(), Report_Activity.class);
					   myIntent.putExtra("ReportId", id1);
					   startActivity(myIntent);
				   }
			   } 
			});
	}
	
	@Override
	protected void onRestart() {
		// TODO Auto-generated method stub
		super.onRestart();
		((NameSpace) this.getApplication()).bo.getRecursosFromUser(this);
	}
	
	@Override
	public void onBackPressed() {
        finish();
	}
	
	
	
}
