
Ext.define('App.view.datauser.DataUserController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.datauser',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'datauser':{
				render:'loadDataUser'
			}
        }
    },
	
	loadDataUser: function(el) {
		
		var me = this;
		Ext.getBody().mask("Loading...");
		Ext.Ajax.request({url: 'user/getUser',
			params: {'_id': localStorage.AppLoggedId},
			method:'POST',
			success: function(data){
				
				var meData = JSON.parse(data.responseText)[0];
				me.lookupReference('field_name_info').setValue(meData.name);
				me.lookupReference('field_sur1_info').setValue(meData.surname1);
				me.lookupReference('field_sur2_info').setValue(meData.surname2);
				me.lookupReference('field_email_info').setValue(meData.email);
				me.lookupReference('field_dir_info').setValue(meData.dir);
				me.lookupReference('field_postal_info').setValue(meData.postal);
				
				var store = me.lookupReference('field_gridPhone_info').store;
				store.removeAll();
				if(meData.phones)
				for(i = 0; i < meData.phones.length; i++){
					store.add({'phone': meData.phones[i]})
				}
				Ext.getBody().unmask();
			},
			failure:function(){
				Ext.getBody().unmask();
				Ext.Msg.alert('Error', 'Contacte con el administrador');
			}
		 });
	},
	
	openEditInfo:function(el,a,b,c,d){
		
		var obj = {};
		obj['name'] = this.lookupReference('field_name_info').getValue();
		obj['ape1'] = this.lookupReference('field_sur1_info').getValue();
		obj['ape2'] = this.lookupReference('field_sur2_info').getValue();
		obj['email'] = this.lookupReference('field_email_info').getValue();
		obj['dir'] = this.lookupReference('field_dir_info').getValue();
		obj['post'] = this.lookupReference('field_postal_info').getValue();
		obj['phoneInfo'] =[]
		var index = this.lookupReference('field_gridPhone_info').store.data.getCount();
		for(i = 0; i < index; i++){
			obj['phoneInfo'].push(this.lookupReference('field_gridPhone_info').store.getAt(i).data.phone);
		}
		
		Ext.create('Ext.window.Window', {
            title: "Editar Informacion Personal",
            height: 450,
            width: 650,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'datauseredit',
				initialData : obj
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var part = Ext.getCmp('datauser');
					  part.controller.loadDataUser();
                   }
			}
        }).show();
	}
});
