
Ext.define('App.view.experiencia.ExperienciaController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.experiencia',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'experiencia':{
				afterRender:'loadDataEstudios'
			}
        }
    },
	
	loadDataEstudios: function(el) {
		
		var me = this;
		Ext.getBody().mask("Loading...");
		
		Ext.Ajax.request({url: 'experiencia/getUserExp',
			params: {'userid': localStorage.AppLoggedId},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				var store = me.lookupReference('grid_experiencias_data').store;
				store.removeAll();
				for(i = 0; i < meData.length; i++){
					store.add(meData[i])
				}
				Ext.getBody().unmask();
			},
			failure:function(){
				Ext.getBody().unmask();
				Ext.Msg.alert('Error', 'Contacte con el administrador');
			}
		 });
	},
	
	
	addNewExperiencia:function(){
		Ext.create('Ext.window.Window', {
            title: "Añadir Estudios",
            height: 250,
            width: 650,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'experienciaedit',
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var tab = Ext.getCmp('experiencia');
					  tab.controller.loadDataEstudios();
                   }
			}
        }).show();
	},
	editNewExperiencia:function(){

		var grid = this.lookupReference("grid_experiencias_data"); 
		var data = grid.getSelection()[0].data;
		
		Ext.create('Ext.window.Window', {
            title: "Añadir Estudios",
            height: 250,
            width: 650,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'experienciaedit',
				isEdit:true,
				datos:data
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var tab = Ext.getCmp('experiencia');
					  tab.controller.loadDataEstudios();
                   }
			}
        }).show();
		
	},
	delNewExperiencia:function(){
		var grid = this.lookupReference("grid_experiencias_data"); 
		var id = grid.getSelection()[0].data._id;
		Ext.getBody().mask("Loading...");
		
		if(id != null)
		Ext.Msg.show({
			title:'¿Eliminar?',
			message: '¿Seguro que desea eliminar la entrada seleccionada?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					Ext.Ajax.request({url: 'experiencia/deleteUserExp',
						params: {'_id': id},
						method:'POST',
						success: function(data){
						 	var tab = Ext.getCmp('experiencia');
					  		tab.controller.loadDataEstudios();
							Ext.getBody().unmask();
						},
					 });
				}
			}
		});
	},
	
	itemSelection:function(){
		this.lookupReference('exp_edit_button').setDisabled(false);
		this.lookupReference('exp_del_button').setDisabled(false);
	},
	
	dateRender:function(record){
		if(record){
			var dd = new Date(record);
			var dia = dd.getDate();
			var mes = dd.getMonth()+1;

			if(dia < 10 ){
				dia = "0"+dia;
			}
			if(mes < 10 ){
				mes = "0"+mes;
			}

			return dia + "/" + mes +"/" + dd.getFullYear();
		}
		return "";
	}
});
