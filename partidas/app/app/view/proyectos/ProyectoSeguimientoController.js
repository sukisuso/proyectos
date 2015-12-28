

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
    }
});
