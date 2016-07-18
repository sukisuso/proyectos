Ext.define('App.view.control.ControlController', {
    extend: 'Ext.app.ViewController',

    
    config : {
        control :  {
      		'control-view'      : {
      			afterrender : 'loadUserInfo',
            }    
        }
    },
    alias: 'controller.control-view',
    
    
	loadUserInfo:function(){
	},
	
	newUserclick: function () {
		Ext.Ajax.request({url: 'servers/updateServer',
			params: {'_id': "578d0a986c8958980d9fa51c",'server_name': "Nombre3", 'server_path': "path3", 'server_file': "file3"},
			method:'POST',
			success: function(data){
				debugger
			}
		 });
	},
	
	deleteUserclick:function() {
		debugger
	},

	renderStatus: function(record,metadata, store, rowIndex, collIndex){
		return '<div class="circle-green"></div>'
	}
});