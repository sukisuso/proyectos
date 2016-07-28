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
    me['servers_running'] = [];
    
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

    setInterval(function(me){ 

        if(me['servers_running'].length > 0){
          for (var i =0; i < me['servers_running'].length; i++)
             Ext.Ajax.request({url: 'task/isAliveServer',
                params: {'process_id': me['servers_running'][i]},
                method:'POST',
                success: function(data){
                  if(data.responseText == "false"){
                    var relaunch = false;
                    var rowIndex = -1;
                    var grid = me.lookupReference("dataGrid"); 
                     for (var z =0; z < grid.store.data.length; z++){
                        if(data.request.params.process_id == grid.store.getAt(z).data.processId){
                          rowIndex = z;
                          grid.store.getAt(z).data.processId  = undefined;
                          grid.store.getAt(z).data.status = "stoped";
                          relaunch = grid.store.getAt(z).data.relaunch;
                        }
                     }
                    

                      for (var i =0; i < me['servers_running'].length; i++){
                         if (me['servers_running'][i] === data.request.params.process_id) {
                            me['servers_running'].splice(i,1);
                         }
                      } 
                      grid.store.save();
                      grid.getView().refresh();

                      if(relaunch && rowIndex != -1){
                        me.runServer(grid, rowIndex);
                      }
                  }
                }
            });
        }
    }, 1500, me);
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
	},

  runServer: function(grid, rowIndex, colIndex){
    var data = grid.store.getAt(rowIndex).data;
    var me = this;
    var index = rowIndex;

    if(data.processId == undefined)
    Ext.Ajax.request({url: 'task/startServer',
        params: {'server_path': data.path,'server_file': data.file, 'server_port': data.port},
        method:'POST',
        success: function(res){
          var grid = me.lookupReference("dataGrid"); 
          grid.store.getAt(index).data.processId  = parseInt(res.responseText);
          me['servers_running'].push(grid.store.getAt(index).data.processId);
          grid.store.getAt(index).data.status = "running";
          grid.store.save();
          grid.getView().refresh();
        }
     });
  },

  killServer : function(grid, rowIndex, colIndex){

      var data = grid.store.getAt(rowIndex).data;
      var me = this;
      var index = rowIndex;
      if(data.processId != null)
      Ext.Ajax.request({url: 'task/killServer',
          params: {'process_id': data.processId},
          method:'POST',
          success: function(res){
            for (var i =0; i < me['servers_running'].length; i++)
               if (me['servers_running'][i] === data.processId) {
                  me['servers_running'].splice(i,1);
                  break;
               }

            var grid = me.lookupReference("dataGrid"); 
            grid.store.getAt(index).data.processId  = undefined;
            grid.store.getAt(index).data.status = "stoped";
            grid.store.save();
            grid.getView().refresh();
          }
       });
  },
	
	itemDbClick: function( obj , record , item , index , e , eOpts ) {
		Ext.create('Ext.window.Window', {
            title: "Console",
            height: 600,
            width: 805,
            modal:true,
            layout: 'fit',
            items: {  
                xtype: 'controllogger',
				server_path:record.data.path,
				server_file : record.data.file
            }
        }).show();
	},
	
	goToWeb:function(grid, rowIndex, colIndex){
		if(grid.store.getAt(rowIndex).data.processId != undefined){
			var win;
			if(grid.store.getAt(rowIndex).data.port != 443){
		 		win = window.open("http://localhost:"+grid.store.getAt(rowIndex).data.port, '_blank');
			}else {
				win = window.open("https://localhost:"+grid.store.getAt(rowIndex).data.port, '_blank');
			}
  		 	win.focus();
		}
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