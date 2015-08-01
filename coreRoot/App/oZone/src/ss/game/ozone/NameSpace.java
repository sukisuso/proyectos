package ss.game.ozone;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.concurrent.Executors;

import ss.game.model.Action;
import ss.game.model.DataUser;
import ss.game.ozone.core.ViewoZone;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Application;
import android.os.AsyncTask;
import android.renderscript.Type;
import android.util.Log;

public class NameSpace extends Application {

    private Integer userId;
    public BussinesOperation bo = new BussinesOperation();
    public DataUser data = new DataUser();
    public String urlServer = "http://192.168.1.36:8080";
    
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer someVariable) {
        this.userId = someVariable;
    }
    
    
    //BUSINESS OPERATONS
    public final class BussinesOperation {

    	public void getRecursosFromUser(Activity main) {
    		Get jSonRep =new Get("/bo/mainData/getRecursos.php?userId="+userId, main, userId);
        	jSonRep.execute();
    	}
    	private class Get extends AsyncTask<Void, Integer, Boolean> {
    		String parametro = "";Activity main = null; int UserId; 
    		public Get(String p, Activity mn, int uid){parametro = p; main = mn; UserId = uid;}
			@Override
    	    protected Boolean doInBackground(Void... params) {
	    	    	String response = "";
	    	    	String responseAction = "";
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

	    				url = new URL(urlServer + "/bo/mainData/getAction.php?userId="+UserId);
	    				con = (HttpURLConnection) url.openConnection();
	    				con.setDoInput(true);
	    	            con.setDoOutput(true);
	    				in = new BufferedReader(new InputStreamReader(con.getInputStream()));
	    				while ((linea = in.readLine()) != null) {
	    					responseAction +=linea;
	    				}
	    				
	    				Log.e("load",response);
	    				Log.e("loadAction",responseAction);
	    			} catch (MalformedURLException e) {
	    				e.printStackTrace();
	    			} catch (IOException e) {
	    				e.printStackTrace();
	    			}
	    	    	Gson gson = new Gson();
					DataUser usuario = gson.fromJson(response, DataUser.class);
					gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
					Action action = gson.fromJson(responseAction, Action.class);
					
					data.tr_u_metal = usuario.tr_u_metal;
					data.tr_u_cristal = usuario.tr_u_cristal;
					data.tr_u_ozone = usuario.tr_u_ozone;
					data.tr_na_metal = usuario.tr_na_metal;
					data.tr_na_cristal = usuario.tr_na_cristal;
					data.tr_na_ozone = usuario.tr_na_ozone;
					data.action = action;
				
					((ViewoZone)main).unlock();
       	    	return true;
    	    }
			
    	}
    }
}