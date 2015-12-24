

Ext.define('Ptd.view.proyectos.ProyectoController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.proyecto',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'proyecto'      : {
                afterRender : 'loadData',
            }
        }
    },
	
	loadData: function() {
       //añadir tabs necesarios. 
		var grid = this.lookupReference("dataGridProyectos"); 
		grid.mask();

		Ext.Ajax.request({url: 'proyectos/getAllProyectos',
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				grid.unmask();
			}
		 });
    }
});
