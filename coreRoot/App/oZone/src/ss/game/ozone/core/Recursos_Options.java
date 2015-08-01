package ss.game.ozone.core;

import org.apache.http.impl.cookie.BestMatchSpec;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.support.v7.app.ActionBarActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class Recursos_Options extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_recursos__options);
		setTitle(getString(R.string.recursosOptions_mRecursos) );
		
		TextView metal = (TextView) findViewById(R.id.textView1);
		TextView cristal = (TextView) findViewById(R.id.textView2);
		TextView ozone = (TextView) findViewById(R.id.textView3);
		
		metal.setText(((NameSpace) this.getApplication()).data.tr_u_metal+"");
   	   	cristal.setText(((NameSpace) this.getApplication()).data.tr_u_cristal+"");
   	   	ozone.setText(((NameSpace) this.getApplication()).data.tr_u_ozone+"");
		
   	   	Button bExp = (Button) findViewById(R.id.buttonExpedicion);
   	   	bExp.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			Intent myIntent = new Intent(getBaseContext(), Planets_Listiview.class);
   	   			finish();
   	   			startActivity(myIntent);
   	    	} 
   	   	});
   	   	
   	   	if(((NameSpace) this.getApplication()).data.action.ta_activo){
   	   		bExp.setVisibility(View.INVISIBLE);
   	   	}
	}

}
