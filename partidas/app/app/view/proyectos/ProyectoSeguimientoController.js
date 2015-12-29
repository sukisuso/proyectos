

Ext.define('Ptd.view.proyectos.ProyectoSeguimientoController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.proyectoseguimiento',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'proyectoseguimiento'      : {
                afterRender : 'loadData',
            }
        }
    },
	
	loadData: function() {
		var backlog_grid = this.lookupReference("backlogGridKanban"); 
		var progress_grid = this.lookupReference("progressGridKanban");
		var bloqued_grid = this.lookupReference("bloquedGridKanban");
		var done_grid = this.lookupReference("doneGridKanban");

		var _id = this.view.datos._id;
		
		backlog_grid.store.removeAll();
		progress_grid.store.removeAll();
		bloqued_grid.store.removeAll();
		done_grid.store.removeAll();
		
		Ext.Ajax.request({url: 'tareas/getAllTareas',
			params: {'idProyecto': _id},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);

				for(var i = 0; i < meData.length; i++){
					if(meData[i].estado == "Backlog"){
						backlog_grid.store.add(meData[i]);
					} else if(meData[i].estado == "In progress"){
						progress_grid.store.add(meData[i]);
					} else if(meData[i].estado == "Blocked"){
						bloqued_grid.store.add(meData[i]);
					} else if(meData[i].estado =="Done"){
						done_grid.store.add(meData[i]);
					} 
				}
			}
		 });
    },
	
	rendererCard: function(record,metadata, store, rowIndex, collIndex){
		var desc = (store.data.des!= undefined)?store.data.des:"";
		desc = (desc.length > 60)?desc.substring(0, 57)+"...":desc;
		var color  = "red";;
		if(store.data.importancia == "Normal")
			color = "yellow";
		else if (store.data.importancia == "Sencilla")
			color = "green";
		
		
		var final = (store.data.final != undefined)?"<td><FONT COLOR='red'>"+store.data.final+"</FONT></td>":"";
		var inicial = (store.data.inicial != undefined)?"<center><table style='margin-top:15px;'><tr><td style='border: 1px solid black;'><FONT COLOR='#0000FF'>"+store.data.inicial+"</FONT></td>"+
			final
			+"</tr></table></center>":"";
		
			
		
		return "<div  style='height: 100px;  border: 2px solid #73AD21; padding: 20px; background:#F5D0A9;'> "
				+"<div style='float:left; height: 15px;border: 1px solid #000000; width:15px; background:"+color+";'></div><div 			style='float:left; margin-left:5px'>"
				+record+"</div></br><div style='margin-top:5px;width:100px;'><i>"+desc+"</i></div>"
				+
				inicial
			+"</div>";
	},
	
	rendererCardDone:function(record,metadata, store, rowIndex, collIndex){
		var color;
		if(store.data.importancia == "Normal")
			color = "yellow";
		else if (store.data.importancia == "Sencilla")
			color = "green";
		else 
			color = "red";
		
		return "<div  style='height: 50px;  border: 2px solid #73AD21; padding: 15px; background:#F5D0A9;'> "
				+"<div style='float:left; height: 15px;border: 1px solid #000000; width:15px; background:"+color+";'></div><div 			style='float:left; margin-left:5px'>"
				+record+"</div></div>";
	},
	
	changeTareaStateProgress:function(node, data, overModel, dropPosition, dropHandlers){
		var tarea = data.records[0].data;
		tarea.estado ="In progress";
		delete tarea.id;
		
		Ext.Ajax.request({url: 'tareas/updateTarea',
			jsonData:{'tarea':tarea},
			method:'POST',
			success: function(data){
				console.log("all ok");
			},
			failure:function(){alert("Error")}
		 });
	},
	changeTareaStateBlokced:function(node, data, overModel, dropPosition, dropHandlers){
		var tarea = data.records[0].data;
		tarea.estado ="Blocked";
		delete tarea.id;
		
		Ext.Ajax.request({url: 'tareas/updateTarea',
			jsonData:{'tarea':tarea},
			method:'POST',
			success: function(data){
				console.log("all ok");
			},
			failure:function(){alert("Error")}
		 });
	},
	changeTareaStateDone:function(node, data, overModel, dropPosition, dropHandlers){
		var tarea = data.records[0].data;
		tarea.estado ="Done";
		delete tarea.id;
		
		Ext.Ajax.request({url: 'tareas/updateTarea',
			jsonData:{'tarea':tarea},
			method:'POST',
			success: function(data){
				console.log("all ok");
			},
			failure:function(){alert("Error")}
		 });
	},
	changeTareaStateBacklog:function(node, data, overModel, dropPosition, dropHandlers){
		var tarea = data.records[0].data;
		tarea.estado ="Backlog";
		delete tarea.id;
		
		Ext.Ajax.request({url: 'tareas/updateTarea',
			jsonData:{'tarea':tarea},
			method:'POST',
			success: function(data){
				console.log("all ok");
			},
			failure:function(){alert("Error")}
		 });
	}
});
