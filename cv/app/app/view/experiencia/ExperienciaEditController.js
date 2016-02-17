
Ext.define('App.view.experiencia.ExperienciaEditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.experienciaedit',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'experienciaedit':{
				afterRender:'loadDataEstudios'
			}
        }
    },
	
	loadDataEstudios: function(el) {
		if(this.view.isEdit){
			
			if(this.view.datos.initDate)
			this.lookupReference('field_dateI_expE').setValue(new Date(this.view.datos.initDate));
			if(this.view.datos.endDate)
			this.lookupReference('field_dateF_expE').setValue(new Date(this.view.datos.endDate));
			this.lookupReference('field_empresa_expE').setValue(this.view.datos.empresa);
			this.lookupReference('field_lugar_expE').setValue(this.view.datos.lugar);
			this.lookupReference('field_puesto_expE').setValue(this.view.datos.puesto);
			this.lookupReference('field_desc_expE').setValue(this.view.datos.desc);
		}
	},
	
	
	saveInfo:function(){
		var obj ={};
		obj['userid'] = localStorage.AppLoggedId;
		
		if(this.view.isPracticas)
			obj['practicas'] = true;
		else
			obj['practicas'] = false;
		
		obj['initDate'] = this.lookupReference('field_dateI_expE').getValue();
		obj['endDate'] = this.lookupReference('field_dateF_expE').getValue();
		obj['empresa'] = this.lookupReference('field_empresa_expE').getValue();
		obj['lugar'] = this.lookupReference('field_lugar_expE').getValue();
		obj['puesto'] = this.lookupReference('field_puesto_expE').getValue();
		obj['desc'] = this.lookupReference('field_desc_expE').getValue();
		
		var ok = true;
		if(obj['initDate'] == null){
			this.lookupReference('field_dateI_expE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['empresa'] == null || obj['empresa'] == ""){
			this.lookupReference('field_empresa_expE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['puesto'] == null || obj['puesto'] == ""){
			this.lookupReference('field_puesto_expE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		
		if(ok && !this.view.isEdit){
			Ext.Ajax.request({url: 'experiencia/insertUserExp',
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
			
			Ext.Ajax.request({url: 'experiencia/updatetUserExp',
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
