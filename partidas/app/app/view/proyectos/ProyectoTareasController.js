

Ext.define('Ptd.view.proyectos.ProyectoTareasController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.proyectotareas',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'proyectotareas'      : {
                afterRender : 'loadData',
            }
        }
    },
	
	loadData: function() {
		var grid = this.lookupReference("dataGridTareas"); 
		grid.mask();
		var _id = this.view.datos._id;
		
		Ext.Ajax.request({url: 'tareas/getAllTareas',
			params: {'idProyecto': _id},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				grid.unmask();
			}
		 });
    },
	
	addData: function(){
		var grid = this.lookupReference("dataGridTareas"); 
		grid.store.add({estado:"Backlog", importancia:"Normal", tipo:'Desarrollo'});
	},
	
	saveAllData:function(){
		var dataObj = [];
		var _id= this.view.datos._id;
		
		var grid = this.lookupReference("dataGridTareas"); 
		for(var i = 0; i < grid.store.data.length; i++){
			var obj = grid.store.getAt(i).data;
			obj.idProyecto = _id;
			delete obj.id;
			dataObj.push(obj);
		}
		
		
		Ext.Ajax.request({url: 'tareas/saveAllTareas',
			jsonData: {'dataTareas': dataObj, idProyecto:_id},
			method:'POST',
			success: function(data){
				 Ext.toast({html: 'Tareas Guardadas correctamente', title:'Tareas', width: 200,  align: 't'});
			}
		 });
		var win = Ext.WindowManager.getActive();
		if (win) {
			win.close();
		}
	},
	
	deleteTarea:function(){
		
		debugger
	}
});
