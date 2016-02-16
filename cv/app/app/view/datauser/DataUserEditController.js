
Ext.define('App.view.datauser.DataUserEditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.datauseredit',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'datauseredit':{
				afterRender:'loadDataUser'
			}
        }
    },
	
	loadDataUser: function(el) {
		if(el.initialConfig.initialData != null){
			var data = el.initialConfig.initialData;
			this.lookupReference('field_name_infoE').setValue(data['name']);
			this.lookupReference('field_sur1_infoE').setValue(data['ape1']);
			this.lookupReference('field_sur2_infoE').setValue(data['ape2']);
			this.lookupReference('field_email_infoE').setValue(data['email']);
			this.lookupReference('field_dir_infoE').setValue(data['dir']);
			this.lookupReference('field_postal_infoE').setValue(data['post']);
			
			var grid = this.lookupReference('gridTelefones');
			grid.store.removeAll();
			for(i = 0; i < data['phoneInfo'].length; i++){
				grid.store.add({'phone':data['phoneInfo'][i]});
			}
			
		}
	},
	
	saveInfo:function(el,a,b,c,d){
		var obj = {};
		obj['_id'] = localStorage.AppLoggedId;
		obj['name'] = this.lookupReference('field_name_infoE').getValue();
		obj['surname1'] = this.lookupReference('field_sur1_infoE').getValue();
		obj['surname2'] = this.lookupReference('field_sur2_infoE').getValue();
		obj['email'] = this.lookupReference('field_email_infoE').getValue();
		obj['dir'] = this.lookupReference('field_dir_infoE').getValue();
		obj['postal'] = this.lookupReference('field_postal_infoE').getValue();
		obj['phones'] =[]
		var index = this.lookupReference('gridTelefones').store.data.getCount();
		for(i = 0; i < index; i++){
			obj['phones'].push(this.lookupReference('gridTelefones').store.getAt(i).data.phone);
		}
		
		var ok = true;
		if(obj['name'] == null || obj['name'] == ""){
			this.lookupReference('field_name_infoE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['surname1'] == null || obj['surname1'] == ""){
			this.lookupReference('field_sur1_infoE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(obj['email'] == null || obj['email'] == ""){
			this.lookupReference('field_email_infoE').markInvalid('Rellene el campo');
			ok = false;
		}
		
		if(ok){
			Ext.Ajax.request({url: 'user/updateUser',
				jsonData:{'user':obj},
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
	},
	
	closeInfo:function(){
		var win = Ext.WindowManager.getActive();
		if (win) {
			win.close();
		}
	},
	
	addTelefonToGrid:function(){

		var field = this.lookupReference('fieldNumberToAdd').getValue();
		var grid = this.lookupReference('gridTelefones');
		
		
		if(field != null && field.toString().length == 9){
			grid.store.add({phone:field});
			this.lookupReference('fieldNumberToAdd').setValue(null);
		}else{
			console.log("else");
		}
	}
});
