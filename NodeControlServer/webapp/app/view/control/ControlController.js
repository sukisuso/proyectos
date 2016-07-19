Ext.define('App.view.control.ControlController', {
    extend: 'Ext.app.ViewController',

    
    config : {
        control :  {
      		'control-view'      : {
      			afterRender : 'loadUserInfo',
            }    
        }
    },
    alias: 'controller.control-view',
    
    
	loadUserInfo:function(){
    var me = this;
    me.getViewModel().data.servers.removeAll();
    me.getViewModel().data.servers.load();
    var grid = this.lookupReference("dataGrid");
    grid.mask(); 
    Ext.Ajax.request({url: 'servers/getAllServers',
      method:'POST',
      success: function(data){
        var meData = JSON.parse(data.responseText);
        me.getViewModel().data.servers.add(meData);
        grid.unmask();
      }
     });
	},
	
	newUserclick: function () {
		Ext.create('Ext.window.Window', {
            title: "Añadir Server",
            height: 400,
            width: 405,
            modal:true,
            layout: 'fit',
            items: {  
                xtype: 'controledit',
				//id_crud_partida:this.view.id_crud_partida
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var part = Ext.getCmp('control');
					            part.controller.loadUserInfo();
                   }
			}
        }).show();
	},
	
	deleteUserclick:function() {
    var grid = this.lookupReference("dataGrid"); 

    if(grid.getSelection()[0]== undefined)
      return;

    var id = grid.getSelection()[0].data._id;
    grid.mask();
    var me = this;
    
    if(id != null)
    Ext.Msg.show({
      title:'¿Eliminar entrada?',
      message: '¿Seguro que desea eliminar el servidor?',
      buttons: Ext.Msg.YESNO,
      icon: Ext.Msg.QUESTION,
      fn: function(btn) {
        if (btn === 'yes') {
          Ext.Ajax.request({url: 'servers/deleteServer',
              params: {'_id': id},
              method:'POST',
              success: function(data){
                me.getViewModel().data.servers.removeAll();
                Ext.Ajax.request({url: 'servers/getAllServers',
                    method:'POST',
                    success: function(data){
                      var meData = JSON.parse(data.responseText);
                      me.getViewModel().data.servers.add(meData);
                      grid.unmask();
                    }
                 });
              }
          });    
        }
      }
    });
	},

	renderStatus: function(record,metadata, store, rowIndex, collIndex){
    if(store.data.status == undefined || store.data.status == null )
        return '<div class="circle-red"></div>';

    if(store.data.status == "running")
	    return '<div class="circle-green"></div>';
    else 
      return '<div class="circle-red"></div>';
	}
});

/*
Ext.Ajax.request({url: 'servers/updateServer',
			params: {'_id': "578d0a986c8958980d9fa51c",'server_name': "Nombre3", 'server_path': "path3", 'server_file': "file3"},
			method:'POST',
			success: function(data){
			}
		 });
*/