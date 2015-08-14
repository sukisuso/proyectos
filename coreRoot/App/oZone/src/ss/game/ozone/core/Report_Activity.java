package ss.game.ozone.core;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import ss.game.model.Report;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.widget.TextView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Report_Activity extends ActionBarActivity {

	
	public boolean lock = false;
	public Report holding;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_report_);
		
		Intent intent = getIntent();
		int id = intent.getIntExtra("ReportId", -1);
		
		if (id == -1){
			finish();
		}
		
//		http://localhost:8080/bo/mainData/getReport.php?userId=1&&reportId=22
		Get peticion = new Get("/bo/mainData/getReport.php?userId="+((NameSpace) this.getApplication()).getUserId()+"&&reportId="+id,
				((NameSpace) this.getApplication()).urlServer );
		peticion.execute();
	}

	
	protected void onResume() {
		super.onResume();
		while(!lock){
			SystemClock.sleep(50);
		}
		
		
		DateFormat df = new SimpleDateFormat("MM/dd HH:mm:ss");
		String date = df.format(holding.trep_fecha);
		((TextView)findViewById(R.id.fechaReport)).setText(date);
		((TextView)findViewById(R.id.nombreAtacante)).setText(holding.trep_nombreatacante);
		((TextView)findViewById(R.id.nombreDefensor)).setText(holding.trep_nombredefensor);
		((TextView)findViewById(R.id.nombreUserAtaque)).setText(holding.trep_nombreatacante);
		((TextView)findViewById(R.id.nombreUserDefensa)).setText(holding.trep_nombredefensor);
		
		((TextView)findViewById(R.id.ronda1ataque)).setText(holding.ronda1_ataque+"");
		((TextView)findViewById(R.id.ronda1defensa)).setText(holding.ronda1_defensa+"");
		((TextView)findViewById(R.id.ronda2ataque)).setText(holding.ronda2_ataque+"");
		((TextView)findViewById(R.id.ronda2defensa)).setText(holding.ronda2_defensa+"");
		((TextView)findViewById(R.id.ronda3ataque)).setText(holding.ronda3_ataque+"");
		((TextView)findViewById(R.id.ronda3defensa)).setText(holding.ronda3defensa+"");
		
		
		((TextView)findViewById(R.id.report_costeMetal)).setText(holding.trep_metal+"");
		((TextView)findViewById(R.id.report_costecristal)).setText(holding.trep_cristal+"");
		((TextView)findViewById(R.id.report_costeOzone)).setText(holding.trep_ozone+"");
		
		if(holding.trep_id_ganador == ((NameSpace) this.getApplication()).getUserId()){
			((TextView)findViewById(R.id.resultado)).setText("Ganas:");
			((TextView)findViewById(R.id.descReport)).setText("Has ganado la batalla!");
		} else {
			((TextView)findViewById(R.id.resultado)).setText("Pierdes:");
			((TextView)findViewById(R.id.descReport)).setText("Has perdido la batalla!");
		}
	}

	
	public void unlock(){
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
    				Log.i("report",response);
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
    	    	Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
				Report hold = gson.fromJson(response, Report.class);
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
