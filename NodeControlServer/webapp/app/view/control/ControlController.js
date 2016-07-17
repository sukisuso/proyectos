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
		debugger
	},
	
	deleteUserclick:function() {
		debugger
	}
});