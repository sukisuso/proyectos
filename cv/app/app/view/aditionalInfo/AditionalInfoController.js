
Ext.define('App.view.aditionalInfo.AditionalInfoController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.aditionalinfo',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'aditionalInfo':{
				afterRender:'loadDataAditionalInfo'
			}
        }
    },
	
	loadDataAditionalInfo: function(el) {
		
		var me = this;
		Ext.getBody().mask("Loading...");
		
		Ext.Ajax.request({url: 'aditionalinfo/getUserInfo',
			params: {'userid': localStorage.AppLoggedId},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText)[0];
				if(meData){
					me.lookupReference('aditional_info_field').setValue(meData.desc);
				}
				Ext.getBody().unmask();
			},
			failure:function(){
				Ext.getBody().unmask();
				Ext.Msg.alert('Error', 'Contacte con el administrador');
			}
		 });
	},

	editAditionalInfo:function(){

		var value = this.lookupReference("aditional_info_field").getValue(); 
		
		Ext.create('Ext.window.Window', {
            title: "Añadir Estudios",
            height: 300,
            width: 560,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'aditionalinfoedit',
				isEdit:true,
				datos:value
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var tab = Ext.getCmp('aditionalinfo');
					  tab.controller.loadDataAditionalInfo();
                   }
			}
        }).show();
		
	},

	
});
