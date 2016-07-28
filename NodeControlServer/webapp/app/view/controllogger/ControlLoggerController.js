Ext.define('App.view.controllogger.ControlLoggerController', {
    extend: 'Ext.app.ViewController',

    
    config : {
        control :  {
          'controllogger'      : {
            afterrender : 'loadLogInfo',
            }    
        }
    },
    alias: 'controller.controllogger',
    
    

  loadLogInfo:function(data) {
     
	  var me = this;
	  me.server_file = data.server_file;
	  me.server_path = data.server_path;
	  
     Ext.Ajax.request({url: 'log/getServerLog',
      params: { 'server_path': data.server_path , 'server_file': data.server_file},
      method:'POST',
      success: function(data){
		  me.lookupReference ('console').setValue(data.responseText);
      }
     });
  },

  closeWindow: function(){
    var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
  },
	
	deleteLog:function() {
		 this.lookupReference ('console').setValue("");
		
		Ext.Ajax.request({url: 'log/removeServerLog',
		  params: { 'server_path': this.server_path , 'server_file': this.server_file},
		  method:'POST'
		 });
	},
	
	refreshServer:function () {
		var me = this;
		this.lookupReference ('console').setValue("");
		 Ext.Ajax.request({url: 'log/getServerLog',
		  params: { 'server_path': this.server_path , 'server_file': this.server_file},
		  method:'POST',
		  success: function(data){
			  me.lookupReference ('console').setValue(data.responseText);
		  }
		 });
	}

});