
Ext.define('App.view.control.ControlView', {
    extend: 'Ext.container.Container',
    xtype: 'control-view',
    plugins: 'viewport',
    requires: [
               'App.view.control.ControlController' ,'App.view.control.ControlModel'
           ],
    controller: 'control-view',
    viewModel: {
        type: 'control-view'
    },

    layout: {
        type: 'border',
		align:'center',
		pack: 'center'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
        html: '<h2>Node Control Server</h2>',
		
    },
    
    {
        xtype: 'gridpanel',
        region: 'north',
        title: 'Servers',
        itemId:'serverGrid',
        bind: {
            store: '{customers}'
        },
        columns: [
                  { text: 'Estado', dataIndex: 'status', flex:1 },
                  { text: 'Nombre', dataIndex: 'name',flex:1 },
                  { text: 'Path', dataIndex: 'path' ,flex:1.6},
                  { text: 'File', dataIndex: 'file', flex:0.5 },
                  {
                      xtype:'actioncolumn',
                      width:100,
                      items: [{
                          icon: 'resources/img/play.png',  // Use a URL in the icon config
                          tooltip: 'Run',
                          handler: function(grid, rowIndex, colIndex) {
                              debugger
                          },
                          listeners: {
          	 				click: 'newUserclick'
          	 			}
                      },{
                          icon: 'resources/img/stop.png',
                          tooltip: 'Stop',
                          handler: function(grid, rowIndex, colIndex) {
                            debugger
                          }
                      }]
                  }
              ],
	    height: '100%',
	    tbar: [
	           { 
	        	 xtype: 'button',
	        	 text: 'Nuevo',
	        	 icon: 'resources/img/add.png',
	        	 listeners: {
	 				click: 'newUserclick'
	 			}
	           },
	           { 
	        	 xtype: 'button',
	        	 text: 'Eliminar',
	        	 icon: 'resources/img/delete.png',
	        	 listeners: {
		 				click: 'deleteUserclick'
		 			}
	           }
	    ]
    }
    
    ]
});