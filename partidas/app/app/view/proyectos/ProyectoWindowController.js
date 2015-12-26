

Ext.define('Ptd.view.proyectos.ProyectoWindowController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.proyectoWindow',
    requires: [
        'Ext.window.MessageBox'
    ],

	init: function() {

		if(this.view.isEdit){
			this.lookupReference('buttonaddedit').setText('Editar');
			this.lookupReference('pro_activo').setValue(this.view.datos.activo);
			this.lookupReference('pro_desc').setValue(this.view.datos.des);
			this.lookupReference('pro_nombre').setValue(this.view.datos.nombre);
			this.lookupReference('pro_version').setValue(this.view.datos.version);
			this.lookupReference('pro_url').setValue(this.view.datos.url);
		}
    },
	
	closeWindow:function(){
		var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
	},
	
	addEntrada:function(){
		var obj = {}
				

		obj["nombre"]  = this.lookupReference('pro_nombre').getValue();
		obj["version"]  = this.lookupReference('pro_version').getValue();
		obj["activo"]  = this.lookupReference('pro_activo').getValue();
		obj["url"]  = this.lookupReference('pro_url').getValue();
		obj["des"]  = this.lookupReference('pro_desc').getValue();
		var ok = true;
		if(obj["nombre"] == null || obj["nombre"] == ""){
			this.lookupReference('pro_nombre').markInvalid('Rellene el campo');
			ok = false;
		}
		if(obj["des"]== null || obj["des"] == "" ){
			this.lookupReference('pro_desc').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(ok && !this.view.isEdit){
			Ext.Ajax.request({url: 'proyectos/insertProyectos',
				jsonData:{'proyecto':obj},
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
			
			Ext.Ajax.request({url: 'proyectos/updateProyectos',
				jsonData:{'partida':obj},
				method:'POST',
				success: function(data){
					var win = Ext.WindowManager.getActive();
					if (win) {
						win.close();
					}
				},
				failure:function(){alert("Error")}
			 });
		}
	}
});
