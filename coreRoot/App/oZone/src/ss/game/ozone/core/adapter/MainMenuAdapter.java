package ss.game.ozone.core.adapter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.app.Activity;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class MainMenuAdapter extends BaseAdapter {
 
    private static final int TYPE_MAX_COUNT = 1;
    private Context context;
    private Activity activity;
    private LayoutInflater mInflater;
    private Map<String, Integer> menuItems; 
    private Map<Integer, String> menuItemsId;
    private Date finalAct;
    
    public MainMenuAdapter(Context context, Activity act) {
    	this.context = context;
    	this.activity = act;
    	menuItems = new HashMap<String, Integer>();
    	menuItemsId = new HashMap<Integer, String>();
    	mInflater = (LayoutInflater)context.getSystemService(this.context.LAYOUT_INFLATER_SERVICE);
    }
 
    public void addItemAlert(final String item, final int valueLayout, Date finallap) {
        menuItems.put(item, valueLayout);
        menuItemsId.put(menuItems.size()-1, item);
        finalAct = finallap;
        notifyDataSetChanged();
    }
    
    public void addItem(final String item, final int valueLayout) {
        menuItems.put(item, valueLayout);
        menuItemsId.put(menuItems.size()-1, item);
        notifyDataSetChanged();
    }
 
    @Override
    public int getItemViewType(int position) {
        String keyItem = menuItemsId.get(position);
    	return menuItems.get(keyItem);
    }
 
    @Override
    public int getViewTypeCount() {
        return TYPE_MAX_COUNT;
    }
 
    @Override
    public int getCount() {
        return menuItems.size();
    }
 
    @Override
    public String getItem(int position) {
        return menuItemsId.get(position);
    }
 
    @Override
    public long getItemId(int position) {
        return position;
    }
 
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        	
    	int type = getItemViewType(position);
    	ViewHolder holder = null;
    	 if (convertView == null) {
    		 holder = new ViewHolder();
    		 switch (type) {
		           case R.layout.core_mainmenu_simpleitem:
		        	   convertView = mInflater.inflate(R.layout.core_mainmenu_simpleitem, null);
		        	   holder.textView = (TextView)convertView.findViewById(R.id.text);
		        	   holder.textView.setText(getItem(position));
		               break;
		           case R.layout.core_mainmenu_recursos:
		        	   convertView = mInflater.inflate(R.layout.core_mainmenu_recursos, null);
		        	   setData(convertView);
		               break;
		           case R.layout.core_mainmenu_alertitem:
		        	   convertView = mInflater.inflate(R.layout.core_mainmenu_alertitem, null);
		        	   holder.textView = (TextView)convertView.findViewById(R.id.textMision);
		        	   holder.textView.setText(getItem(position));
		        	   break;
		      }
    		 convertView.setTag(holder);
    	 } else {
           holder = (ViewHolder)convertView.getTag();
       }
        	
    	return convertView;
    }
    
    public void setData(View convertView){
    	
    	TextView metal = (TextView) convertView.findViewById(R.id.valeuOfMetal);
   	   	TextView cristal = (TextView) convertView.findViewById(R.id.valueOfCristal);
   	   	TextView ozone = (TextView) convertView.findViewById(R.id.valueOfOzone);
   	   	
   	   	metal.setText(((NameSpace) activity.getApplication()).data.tr_u_metal+"");
   	   	cristal.setText(((NameSpace) activity.getApplication()).data.tr_u_cristal+"");
   	   	ozone.setText(((NameSpace) activity.getApplication()).data.tr_u_ozone+"");
    }
    
	public static class ViewHolder {
        public TextView textView;
    }
	
	
}
 
