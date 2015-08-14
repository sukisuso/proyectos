package ss.game.ozone.core.adapter;

import ss.game.model.Planet;
import ss.game.model.Shield;
import ss.game.ozone.NameSpace;
import ss.game.ozone.R;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

public class ShieldAdapter extends ArrayAdapter<Shield>{

    Context context; 
    int layoutResourceId;    
    Shield data[] = null;
    
    public ShieldAdapter(Context context, Shield[] data) {
        super(context,  R.layout.core_shield_listitem, data);
        this.layoutResourceId = R.layout.core_shield_listitem;
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
            holder.txtTitle = (TextView)row.findViewById(R.id.textEscudo);
            holder.nivel = (TextView)row.findViewById(R.id.textivel);
            holder.imgIcon = (ImageView)row.findViewById(R.id.imageView1);
            
            row.setTag(holder);
        }
        else
        {
            holder = (PlanetHolder)row.getTag();
        }
        
        Shield shield = data[position];
        holder.txtTitle.setText(shield.tupt_descripcion);
        
        if(shield.tupt_descripcion.equals("Escudo Parallax")){
        	holder.imgIcon.setImageResource(R.drawable.shield_parallax);
        	holder.nivel.setText(""+((NameSpace) ((Activity)context).getApplication()).data.tr_n_s_parallax );
        	Log.d("dev",""+((NameSpace) ((Activity)context).getApplication()).data.tr_n_s_parallax);
        }
        
        return row;
    }
    
    static class PlanetHolder
    {
        ImageView imgIcon;
        TextView txtTitle;
        TextView nivel;
    }
}