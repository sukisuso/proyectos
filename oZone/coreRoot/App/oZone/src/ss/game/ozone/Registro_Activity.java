package ss.game.ozone;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Pattern;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.support.v7.app.ActionBarActivity;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Registro_Activity extends ActionBarActivity {

	boolean lock = true;
	boolean ok = true;
	public String emails = "";
	public String ipPhone = "";
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_registro_);

		try{
			Pattern emailPattern = Patterns.EMAIL_ADDRESS; // API level 8+
			Account[] accounts = AccountManager.get(Registro_Activity.this).getAccounts();
			for (Account account : accounts) {
			    if (emailPattern.matcher(account.name).matches()) {
			         emails += account.name+ ";";
			    }
			}
		}catch(Exception e){			
			Log.e("Error", "Error, emails in register.");
		}
		
		try{
			TelephonyManager telemamanger = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
	    	ipPhone = telemamanger.getSimSerialNumber();  
		} catch (Exception e) {
			Log.e("Error","Error, ipNumber in register.");
		}
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		((Button) findViewById(R.id.button1)).setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				String nick = ((EditText)findViewById(R.id.editText1)).getText().toString();
				String pass = ((EditText)findViewById(R.id.editText2)).getText().toString();
				String pass2 = ((EditText)findViewById(R.id.editText3)).getText().toString();
				
				if(nick.equals("") || pass.equals("")|| pass2.equals("")){
					String mesage = getResources().getString(R.string.regist_message);
					Toast.makeText(Registro_Activity.this,mesage, Toast.LENGTH_SHORT).show();
					return;
				}else{
					if(nick.length() < 4){
						String mesage = getResources().getString(R.string.regist_message2);
						Toast.makeText(Registro_Activity.this,mesage, Toast.LENGTH_SHORT).show();
						return;
					}else if(pass.length() < 8){
						String mesage = getResources().getString(R.string.regist_message4);
						Toast.makeText(getApplicationContext(),mesage, Toast.LENGTH_SHORT).show();
						return;
					}else if (!pass.equals(pass2)){
						String mesage = getResources().getString(R.string.regist_message3);
						Toast.makeText(Registro_Activity.this,mesage, Toast.LENGTH_SHORT).show();
						return;
					}
					
//					http://localhost:8080/bo/login/addNewUsuario.php?user=sukisuso&&passwd=olasuso
					Send peticion = new Send("/bo/login/addNewUsuario.php?user="+nick+"&&passwd="+pass,
							((NameSpace) Registro_Activity.this.getApplication()).urlServer );
					peticion.execute();
					while(lock){
						SystemClock.sleep(30);
					}
					
					Log.e("ssad", lock +" - " + ok);
					
					if(ok){
						String mesage = getResources().getString(R.string.regist_message6);
						Toast.makeText(Registro_Activity.this,mesage, Toast.LENGTH_SHORT).show();
						onBackPressed();
					}else{
						String mesage = getResources().getString(R.string.regist_message5);
						Toast.makeText(Registro_Activity.this,mesage, Toast.LENGTH_SHORT).show();
					}
					
					lock = true;
					ok= false;
				}
			}
		});
	}
	
	@Override
	public void onBackPressed() {
		Intent myIntent = new Intent(getBaseContext(), MainActivity.class);
		   startActivity(myIntent);
		finish();
	}

	private class Send extends AsyncTask<Void, Integer, Boolean> {
		private String urlServer = "";
		String parametro = "";
		public Send(String p, String url){parametro = p;urlServer = url;}
		
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
    				Log.e("update",response+" cc");
    			} catch (MalformedURLException e) {
    				e.printStackTrace();
    			} catch (IOException e) {
    				e.printStackTrace();
    			}
    	    	
    	    	if(response.equals("error_login")){
    	    		ok= false;
    	    	}else 
    	    		ok = true;
    	    	
    	    	lock = false;
   	    	return true;
	    }
	}
}
