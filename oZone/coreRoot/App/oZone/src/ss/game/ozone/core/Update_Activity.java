package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.content.DialogInterface;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.app.AlertDialog;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class Update_Activity extends ActionBarActivity {
	public String valueUpdate = "";
	TextView timmer;
	Button butonCancel;
	Button butonfinU;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_update_);
		
		GetDesc peticion = new GetDesc("/bo/mainData/getUpdateType.php?updateId="+((NameSpace) this.getApplication()).data.update.tup_tipo,
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
		
		int valueLevel = setLevelsUpdate();
		((TextView)findViewById(R.id.targetActual)).setText(""+valueLevel);
		((TextView)findViewById(R.id.targetNuevo)).setText(""+(valueLevel+1));
		
		timmer = ((TextView)findViewById(R.id.timmerMisionText));
		butonCancel = (Button)findViewById(R.id.buttonCancelUpdate);
		butonfinU = (Button)findViewById(R.id.buttonFinUpdate);
		
		butonCancel.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			dialogCancelUpdate();
   	    	} 
   	   	});
		
		butonfinU.setOnClickListener(new OnClickListener() {
   	   		public void onClick(View v)
   	     	{
   	   			finalizarMision();
   	    	} 
   	   	});
		
		Date actualDate = new Date();
		long timetCount = ((NameSpace) this.getApplication()).data.update.tup_fechafin.getTime() - actualDate.getTime();
		if(timetCount > 0 ){
			new CountDownTimer(timetCount, 1000) {
			     public void onTick(long millisUntilFinished) {
			    	 timmer.setText("Seconds " + millisUntilFinished / 1000);
			     }
			     public void onFinish() {
			    	 timmer.setText("Actualización terminada");
			    	 butonfinU.setVisibility(View.VISIBLE);
			    	 butonCancel.setVisibility(View.INVISIBLE);
			     }
			 }.start();
		 }else{
			 timmer.setText("Actualización terminada");
			 butonfinU.setVisibility(View.VISIBLE);
			 butonCancel.setVisibility(View.INVISIBLE);
		 }
	}

	
	protected void finalizarMision() {
		// TODO Auto-generated method stub
		setContentView(R.layout.mask);
		int uId = ((NameSpace) Update_Activity.this.getApplication()).getUserId();
		senPetMision peticion = new senPetMision("/bo/action/finalizarUpdate.php?userId="+uId
				+"&&tipoUpdate="+((NameSpace) Update_Activity.this.getApplication()).data.update.tup_tipo,
    			((NameSpace) Update_Activity.this.getApplication()).urlServer );
    	peticion.execute();
    	terminarActivity();
	}


	protected void dialogCancelUpdate() {
		// TODO Auto-generated method stub
		AlertDialog.Builder dialogo1 = new AlertDialog.Builder(Update_Activity.this);  
        dialogo1.setMessage("¿Desea cancelar la actualización?");            
        dialogo1.setCancelable(false);  
        dialogo1.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
            	return;
            }  
        });  
        dialogo1.setPositiveButton("Confirmar", new DialogInterface.OnClickListener() {  
            public void onClick(DialogInterface dialogo1, int id) {  
            	terminarActivity();
            }
        });            
        dialogo1.show(); 
	}


	protected void terminarActivity() {
		// TODO Auto-generated method stub
		setContentView(R.layout.mask);
		int uId = ((NameSpace) Update_Activity.this.getApplication()).getUserId();
    	senPetMision peticion = new senPetMision("/bo/action/cancelUpdate.php?userId="+uId,
    			((NameSpace) Update_Activity.this.getApplication()).urlServer );
    	peticion.execute();
		finish();
	}


	private int setLevelsUpdate() {
		// TODO Auto-generated method stub
		int id = ((NameSpace) this.getApplication()).data.update.tup_tipo;
		int level = 0;
		
		if(id == 1){
			level =  ((NameSpace) this.getApplication()).data.tr_na_metal;
		} else if(id == 2){
			level =  ((NameSpace) this.getApplication()).data.tr_na_cristal;
		}else if(id == 3){
			level =  ((NameSpace) this.getApplication()).data.tr_na_ozone;
		}else if(id == 4){
			level =  ((NameSpace) this.getApplication()).data.tr_n_s_parallax;
		}else if(id == 5){
			level =  ((NameSpace) this.getApplication()).data.tr_n_a_cannonlaser;
		}
		
		return level;
	}

	@Override
	protected void onResume() {
		super.onResume();
	};
	
	
	@Override
	public void onBackPressed() {
		setContentView(R.layout.mask);
		finish();
	}
	
	private class GetDesc extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public GetDesc(String p, String url){parametro = p;urlServer = url;}
		
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
    	    	
    	    	valueUpdate = response;
   	    	return true;
	    }
		
		@Override
		protected void onPostExecute(Boolean result) {
			// TODO Auto-generated method stub
			super.onPostExecute(result);
			((TextView)findViewById(R.id.descripcionUpdate)).setText(valueUpdate);
		}
	}
	
	private class senPetMision extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public senPetMision(String p, String url){parametro = p;urlServer = url;}
		
		@Override
	    protected Boolean doInBackground(Void... params) {
    	    	try {
    				URL url = new URL(urlServer + parametro);
    				HttpURLConnection  con = (HttpURLConnection) url.openConnection();
    				con.setDoInput(true);
    	            con.setDoOutput(true);
    				BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    				String linea ;
    				while ((linea = in.readLine()) != null) {
    				}
    				
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
   	    	return true;
	    }
	}
}