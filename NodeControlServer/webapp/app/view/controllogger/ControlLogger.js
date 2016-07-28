Ext.define('App.view.controllogger.ControlLogger', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.controllogger.ControlLoggerController'
    ],

    xtype: 'controllogger',
    controller: 'controllogger',
 
    width:'100%',
    items: [{
        xtype     : 'textareafield',
		reference:'console',
        grow      : true,
        name      : 'message',
		margin:'18 18 18 18',
		width: '95%',
		height:490,
		readOnly:true,
		scrollable:true
    }
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		items:[ {xtype:'button', text: 'Refresh',margin: '0 0 0 5', handler: 'refreshServer'},
			   {xtype:'button', text: 'Delete Log',margin: '0 0 0 5', handler: 'deleteLog'},
			   {xtype:'button', text: 'Cancelar',margin: '0 0 0 5', handler: 'closeWindow'}]
	}]
});
