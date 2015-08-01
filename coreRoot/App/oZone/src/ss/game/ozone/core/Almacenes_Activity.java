package ss.game.ozone.core;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;

public class Almacenes_Activity extends ActionBarActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_almacenes_);
		
		TextView nivelMetal = (TextView) findViewById(R.id.nivelMetal);
		TextView nivelCristal = (TextView) findViewById(R.id.nivelCristal);
		TextView nivelOzone = (TextView) findViewById(R.id.nivelOzone);
		
		nivelMetal.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_metal+"");
		nivelCristal.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_cristal+"");
		nivelOzone.setText(((NameSpace) Almacenes_Activity.this.getApplication()).data.tr_na_ozone+"");
	}

	
}
