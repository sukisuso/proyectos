
Ext.define('App.view.aditionalInfo.AditionalInfoEditController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.aditionalinfoedit',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'aditionalinfoedit':{
				afterRender:'loadDataAditionalInfo'
			}
        }
    },
	
	loadDataAditionalInfo: function(el) {
		if(this.view.isEdit){
			this.lookupReference('field_desc_aditionalE').setValue(this.view.datos);
		}
	},
	
	
	saveInfo:function(){
		var obj ={};
		obj['userid'] = localStorage.AppLoggedId;
		obj['desc'] = this.lookupReference('field_desc_aditionalE').getValue();
		
		
		Ext.Ajax.request({url: 'aditionalinfo/updatetUserInfo',
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
	},
	closeWindow:function(){
		var win = Ext.WindowManager.getActive();
		if (win) {
			win.close();
		}
	}
});
