

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
            },
            'proyectowindow'      : {
                editClose : 'doSearch'
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
    },
	
	addProyecto: function(){
		Ext.create('Ext.window.Window', {
            title: "Añadir Proyecto",
            height: 350,
            width: 305,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'proyectowindow',
				id_crud_partida:this.view.id_crud_partida
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var part = Ext.getCmp('proyecto');
					  part.controller.doSearch();
                   }
			}
        }).show();
	},
	
	doSearch: function(){
		var grid = this.lookupReference("dataGridProyectos"); 
		grid.mask();
		grid.store.removeAll();
		
		Ext.Ajax.request({url: 'proyectos/getAllProyectos',
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				grid.unmask();
			}
		 });
	},
	
	deleteRow:function(){
		var grid = this.lookupReference("dataGridProyectos"); 
		var id = grid.getSelection()[0].data._id;
		grid.mask();
		
		if(id != null)
		Ext.Msg.show({
			title:'¿Eliminar entrada?',
			message: '¿Seguro que desea eliminar la entrada?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					Ext.Ajax.request({url: 'proyectos/deleteProyectos',
						params: {'_id': id},
						method:'POST',
						success: function(data){
							grid.store.remove();
							Ext.Ajax.request({url: 'proyectos/getAllProyectos',
								method:'POST',
								success: function(data){
									var meData = JSON.parse(data.responseText);
									grid.store.loadData(meData);
									grid.unmask();
								}
							 });
						},
					 });
				}
			}
		});
	},
	
	editRow(){
		var grid = this.lookupReference("dataGridProyectos"); 
		var data = grid.getSelection()[0].data;
		var idPartida = this.view.id_crud_partida;
		
			grid.mask();
			Ext.create('Ext.window.Window', {
				title: "Editar Partida",
				height: 350,
				width: 305,
				modal:true,
				layout: 'fit',
				items: {  // Let's put an empty grid in just to illustrate fit layout
					xtype: 'proyectowindow',
					datos: data,
					isEdit: true
				}, listeners: {
					   close: function (wnd, eOpts) {
						  var part = Ext.getCmp('proyecto');
						  part.controller.doSearch();
					   }
				}
			}).show();
	}
});
