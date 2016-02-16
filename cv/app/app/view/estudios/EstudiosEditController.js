
Ext.define('App.view.estudios.EstudiosEditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.estudiosedit',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'estudiosedit':{
				afterRender:'loadDataEstudios'
			}
        }
    },
	
	loadDataEstudios: function(el) {
		if(this.view.isEdit){
			
			if(this.view.datos.initDate)
			this.lookupReference('field_dateI_estE').setValue(new Date(this.view.datos.initDate));
			if(this.view.datos.endDate)
			this.lookupReference('field_dateF_estE').setValue(new Date(this.view.datos.endDate));
			this.lookupReference('field_titulo_estE').setValue(this.view.datos.titulo);
			this.lookupReference('field_centro_estE').setValue(this.view.datos.centro);
			this.lookupReference('field_media_estE').setValue(this.view.datos.nota);
		}
	},
	
	
	saveInfo:function(){
		var obj ={};
		obj['userid'] = localStorage.AppLoggedId;
		obj['curso'] = false;
		obj['initDate'] = this.lookupReference('field_dateI_estE').getValue();
		obj['endDate'] = this.lookupReference('field_dateF_estE').getValue();
		obj['titulo'] = this.lookupReference('field_titulo_estE').getValue();
		obj['centro'] = this.lookupReference('field_centro_estE').getValue();
		obj['nota'] = this.lookupReference('field_media_estE').getValue();
		
		var ok = true;
		if(obj['initDate'] == null){
			this.lookupReference('field_dateI_estE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['titulo'] == null || obj['titulo'] == ""){
			this.lookupReference('field_titulo_estE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['centro'] == null || obj['centro'] == ""){
			this.lookupReference('field_centro_estE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['nota'] && (obj['nota'] > 10 || obj['nota']<0)){
			this.lookupReference('field_media_estE').markInvalid('La nota tiene que estar entre el 0 y el 10');
			ok = false;
		}
		
		if(ok && !this.view.isEdit){
			Ext.Ajax.request({url: 'estudios/insertUserEstudios',
					jsonData:{'estudio':obj},
					method:'POST',
					success: function(data){
						var win = Ext.WindowManager.getActive();
						if (win) {
							win.close();
						}
					},
					failure:function(){alert("Error")}
			 });
		}else if (ok){
			obj['_id'] = this.view.datos._id;
			
			Ext.Ajax.request({url: 'estudios/updatetUserEstudios',
				jsonData:{'partida':obj},
				method:'POST',
				success: function(data){
					var win = Ext.WindowManager.getActive();
					if (win) {
						win.close();
					}
				},
				failure:function(){Ext.Msg.alert('Error', 'Contacte con el administrador');}
			 });
			
		}
	},
	closeWindow:function(){
		var win = Ext.WindowManager.getActive();
		if (win) {
			win.close();
		}
	}
});
