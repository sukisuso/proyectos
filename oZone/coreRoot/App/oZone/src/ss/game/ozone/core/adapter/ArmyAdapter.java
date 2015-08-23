package ss.game.ozone.core.adapter;

import ss.game.model.Army;
import ss.game.ozone.NameSpace;
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

public class ArmyAdapter extends ArrayAdapter<Army>{

    Context context; 
    int layoutResourceId;    
    Army data[] = null;
    
    public ArmyAdapter(Context context, Army[] data) {
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
        
        Army army = data[position];
        holder.txtTitle.setText(army.tupt_descripcion);
        
        if(army.tupt_descripcion.equals("Cañón Laser")){
        	holder.imgIcon.setImageResource(R.drawable.canonlaser);
        	holder.nivel.setText(""+((NameSpace) ((Activity)context).getApplication()).data.tr_n_a_cannonlaser );
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