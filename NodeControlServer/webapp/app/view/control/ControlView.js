
Ext.define('App.view.control.ControlView', {
    extend: 'Ext.container.Container',
    xtype: 'control-view',
    plugins: 'viewport',
    requires: [
               'App.view.control.ControlController' ,'App.view.control.ControlModel'
           ],
    id:'control',
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
        reference:'dataGrid',
        itemId:'serverGrid',
        bind: {
            store: '{servers}'
        },
        columns: [
                  { text: 'Status', dataIndex: 'status',  width:65, renderer: 'renderStatus'},
                  { text: 'Name', dataIndex: 'name',flex:1 },
                  { text: 'Path', dataIndex: 'path' ,flex:1.6},
                  { text: 'File', dataIndex: 'file', flex:0.4 },
                  { text: 'Port', dataIndex: 'port', flex:0.4 },
                  { text: 'Process Id', dataIndex: 'processId', flex:0.4 },
                  {
                      xtype:'actioncolumn',
                      width:100,
                      items: [{
                          icon: 'resources/img/play.png',  // Use a URL in the icon config
                          tooltip: 'Run',
                          handler: 'runServer'
                      },{
                          icon: 'resources/img/stop.png',
                          tooltip: 'Stop',
                          handler:'killServer'
                      }]
                  }
              ],
	    height: '100%',
	    tbar: [
	           { 
	        	 xtype: 'button',
	        	 text: 'New',
	        	 icon: 'resources/img/add.png',
	        	 listeners: {
      	 				click: 'newUserclick'
      	 			}
	           },
	           { 
	        	 xtype: 'button',
	        	 text: 'Delete',
	        	 icon: 'resources/img/delete.png',
	        	 listeners: {
      	 				click: 'deleteUserclick'
      	 			}
	           }
	    ]
    }
    
    ]
});