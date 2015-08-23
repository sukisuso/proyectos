package ss.game.ozone.core.adapter;

import ss.game.model.Almacen;
import ss.game.ozone.R;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class CostesAlmacenAdapter extends ArrayAdapter<Almacen>{

    Context context; 
    int layoutResourceId;    
    Almacen data[] = null;
    
    public CostesAlmacenAdapter(Context context, Almacen[] data) {
        super(context,  R.layout.core_almacen_listitem, data);
        this.layoutResourceId = R.layout.core_almacen_listitem;
        this.context = context;
        this.data = data;
    }

    @SuppressLint("NewApi")
	@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View row = convertView;
        AlmacenHolder holder = null;
        
        if(row == null)
        {
        	holder = new AlmacenHolder();
            LayoutInflater inflater = ((Activity)context).getLayoutInflater();
            row = inflater.inflate(layoutResourceId, parent, false);
            holder.tv_nivel = (TextView)row.findViewById(R.id.nivel);
            holder.tv_costeMetal = (TextView)row.findViewById(R.id.costeMetal);
            holder.tv_costeCristal = (TextView)row.findViewById(R.id.costeCristal);
            holder.tv_costeOzone = (TextView)row.findViewById(R.id.costeOzone);
            holder.tv_capacidad = (TextView)row.findViewById(R.id.capacidad);
            
            row.setTag(holder);
        }
        else
        {
            holder = (AlmacenHolder)row.getTag();
        }
        
        Almacen almacen = data[position];
        holder.tv_nivel.setText(almacen.tal_nivel+"");
        holder.tv_costeMetal.setText(almacen.tal_coste_metal+"");
        holder.tv_costeCristal.setText(almacen.tal_coste_cristal+"");
        holder.tv_costeOzone.setText(almacen.tal_coste_ozone+"");
        holder.tv_capacidad.setText(almacen.tal_capacidad+"");
        
        return row;
    }
    
    static class AlmacenHolder
    {
        TextView tv_nivel;
        TextView tv_costeMetal;
        TextView tv_costeCristal;
        TextView tv_costeOzone;
        TextView tv_capacidad;
    }
}