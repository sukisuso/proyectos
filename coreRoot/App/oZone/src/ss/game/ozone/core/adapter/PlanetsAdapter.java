package ss.game.ozone.core.adapter;

import ss.game.model.Planet;
import ss.game.ozone.R;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class PlanetsAdapter extends ArrayAdapter<Planet>{

    Context context; 
    int layoutResourceId;    
    Planet data[] = null;
    
    public PlanetsAdapter(Context context, Planet[] data) {
        super(context,  R.layout.core_planetas_listitem, data);
        this.layoutResourceId = R.layout.core_planetas_listitem;
        this.context = context;
        this.data = data;
    }

    @SuppressLint("NewApi")
	@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row = convertView;
        PlanetHolder holder = null;
        
        if(row == null)
        {
        	holder = new PlanetHolder();
            LayoutInflater inflater = ((Activity)context).getLayoutInflater();
            row = inflater.inflate(layoutResourceId, parent, false);
            holder.txtTitle = (TextView)row.findViewById(R.id.textPlanet);
            holder.txtDist = (TextView)row.findViewById(R.id.textDistnum);
            holder.imgIcon = (ImageView)row.findViewById(R.id.imageView1);
            
            row.setTag(holder);
        }
        else
        {
            holder = (PlanetHolder)row.getTag();
        }
        
        Planet planet = data[position];
        holder.txtTitle.setText(planet.tp_nombre);
        holder.txtDist.setText(planet.tp_distancia+"");
        
        if(planet.tp_r_size < 60){
        	holder.imgIcon.setImageResource(R.drawable.planeta1);
        }else if(planet.tp_r_size < 200){
        	holder.imgIcon.setImageResource(R.drawable.planeta2);
        }else if(planet.tp_r_size < 500){
        	holder.imgIcon.setImageResource(R.drawable.planeta3);
        }else{
        	holder.imgIcon.setImageResource(R.drawable.planeta4);
        }
        
        return row;
    }
    
    static class PlanetHolder
    {
        ImageView imgIcon;
        TextView txtTitle;
        TextView txtDist;
    }
}