
Ext.define('App.view.estudios.CursosController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.cursos',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'cursos':{
				afterRender:'loadDataEstudios'
			}
        }
    },
	
	loadDataEstudios: function(el) {
		
		var me = this;
		Ext.getBody().mask("Loading...");
		
		Ext.Ajax.request({url: 'cursos/getUserCursos',
			params: {'userid': localStorage.AppLoggedId},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				var store = me.lookupReference('grid_cursos_form').store;
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
	
	
	addNewEstudios:function(){
		Ext.create('Ext.window.Window', {
            title: "Añadir Estudios",
            height: 200,
            width: 650,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'estudiosedit',
				isCurso:true
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var tab = Ext.getCmp('cursos');
					  tab.controller.loadDataEstudios();
                   }
			}
        }).show();
	},
	editNewEstudios:function(){

		var grid = this.lookupReference("grid_cursos_form"); 
		var data = grid.getSelection()[0].data;
		
		Ext.create('Ext.window.Window', {
            title: "Añadir Estudios",
            height: 200,
            width: 650,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'estudiosedit',
				isEdit:true,
				datos:data,
				isCurso:true
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var tab = Ext.getCmp('cursos');
					  tab.controller.loadDataEstudios();
                   }
			}
        }).show();
		
	},
	deleteNewEstudios:function(){
		var grid = this.lookupReference("grid_cursos_form"); 
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
					Ext.Ajax.request({url: 'estudios/deleteUserEstudios',
						params: {'_id': id},
						method:'POST',
						success: function(data){
						 	var tab = Ext.getCmp('cursos');
					  		tab.controller.loadDataEstudios();
							Ext.getBody().unmask();
						},
					 });
				}
			}
		});
	},
	
	itemSelection:function(){
		this.lookupReference('cur_edit_button').setDisabled(false);
		this.lookupReference('cur_delete_button').setDisabled(false);
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
