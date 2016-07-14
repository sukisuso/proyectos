
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
//        store: Ext.create('servers'),// Ext.data.StoreManager.lookup('servers'),
        bind: {
            store: '{customers}'
        },
//        bind: '{customers}',
        columns: [
                  { text: 'Estado', dataIndex: 'status', flex:1 },
                  { text: 'Nombre', dataIndex: 'name',flex:1 },
                  { text: 'Path', dataIndex: 'path' ,flex:1},
                  { text: 'deff', dataIndex: 'deff', flex:1 },
                  {
                      xtype:'actioncolumn',
                      width:150,
                      items: [{
                          icon: 'extjs-build/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                          tooltip: 'Edit',
                          handler: function(grid, rowIndex, colIndex) {
                              
                          }
                      },{
                          icon: 'extjs-build/examples/restful/images/delete.png',
                          tooltip: 'Delete',
                          handler: function(grid, rowIndex, colIndex) {
                            
                          }
                      }]
                  }
              ],
	    height: '100%',
//	    width: 400
    }
    
    ]
});