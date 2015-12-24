

Ext.define('Ptd.view.partida.PartidaWindowController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.partidaWindow',
    requires: [
        'Ext.window.MessageBox'
    ],

	init: function() {

		if(this.view.isEdit){
			debugger
			this.lookupReference('buttonaddedit').setText('Editar');
			this.lookupReference('cant_entrada').setValue(this.view.datos.cantidad);
			this.lookupReference('date_entrada').setValue(new Date(this.view.datos.fecha));
			this.lookupReference('combobox_tipo').setValue(this.view.datos.tipo);
			this.lookupReference('tag_entrada').setValue(this.view.datos.tag);
			this.lookupReference('desc_entrada').setValue(this.view.datos.desc);
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
		var time = this.lookupReference('date_entrada').getValue();
		
		if (time == null){
			this.lookupReference('date_entrada').markInvalid('Rellene el campo');
		}
		var day  = 00;
		var mounth = 00;
		if(time.getDate() < 10){
			day = '0'+time.getDate();
		}else { day = time.getDate();}
			
		if((time.getMonth()+1) < 10){
			mounth = '0'+(time.getMonth()+1);
		}else { mounth = (time.getMonth()+1);}
		
		obj["fecha"] = time.getFullYear()+ "/" +mounth  + "/"+ day ;
		obj["cantidad"]  = this.lookupReference('cant_entrada').getValue();
		obj["tipo"]  = this.lookupReference('combobox_tipo').getValue();
		obj["tag"]  = this.lookupReference('tag_entrada').getValue();
		obj["desc"]  = this.lookupReference('desc_entrada').getValue();
		obj["partidaId"]  = this.view.id_crud_partida;
		var ok = true;
		if(obj["cantidad"] == null || obj["cantidad"] == ""){
			this.lookupReference('cant_entrada').markInvalid('Rellene el campo');
			ok = false;
		}
		if(obj["tag"]== null || obj["tag"] == "" || obj["tag"]== "#"){
			this.lookupReference('tag_entrada').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj["tipo"]== null || obj["tipo"] == "" || obj["tipo"]== "#"){
			this.lookupReference('combobox_tipo').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(ok && !this.view.isEdit){
			Ext.Ajax.request({url: 'partidas/insertPartida',
				//params: {'partida': obj},
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
		}else{
			obj['_id'] = this.view.datos._id;
			
			Ext.Ajax.request({url: 'partidas/updatePartida',
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
