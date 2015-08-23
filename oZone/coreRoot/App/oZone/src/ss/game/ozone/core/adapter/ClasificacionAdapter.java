package ss.game.ozone.core.adapter;

import java.util.Random;

import ss.game.model.Clasificacion;
import ss.game.ozone.R;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class ClasificacionAdapter extends ArrayAdapter<Clasificacion>{

    Context context; 
    int layoutResourceId;    
    Clasificacion data[] = null;
    
    public ClasificacionAdapter(Context context, Clasificacion[] data) {
        super(context,  R.layout.core_clasificacion_item, data);
        this.layoutResourceId = R.layout.core_clasificacion_item;
        this.context = context;
        this.data = data;
    }

    @SuppressLint("NewApi")
	@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row = convertView;
        ClasiHolder holder = null;
        
        if(row == null)
        {
        	holder = new ClasiHolder();
            LayoutInflater inflater = ((Activity)context).getLayoutInflater();
            row = inflater.inflate(layoutResourceId, parent, false);
            holder.pos = (TextView)row.findViewById(R.id.textpos);
            holder.nick = (TextView)row.findViewById(R.id.textNick);
            holder.puntos = (TextView)row.findViewById(R.id.textPuntos);
            
            row.setTag(holder);
        }
        else
        {
            holder = (ClasiHolder)row.getTag();
        }
        
        Clasificacion classi = data[position];
        classi.tp_distancia = new Random().nextInt((150) + 20) + 150;
        holder.pos.setText((position+1)+"");
        holder.puntos.setText(classi.tr_puntos+"");
        holder.nick.setText(classi.tu_nick+"");
        
        return row;
    }
    
    static class ClasiHolder
    {
        TextView nick;
        TextView pos;
        TextView puntos;
    }
}