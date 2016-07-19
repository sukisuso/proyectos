Ext.define('App.view.controledit.ControlEdit', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.controledit.ControlEditController'
    ],

    xtype: 'controledit',
    controller: 'controledit',
 
    width:'100%',
    items: [
		   {xtype:'textfield',fieldLabel:'Name', margin:'15 25 0 25', height:25, reference:'tag_server',width:'90%'},
		   {xtype:'numberfield',fieldLabel:'Port', margin:'15 25 0 25', height:25, reference:'tag_port',width:'90%'},
		   {xtype:'textfield',fieldLabel:'Server', margin:'15 25 0 25', height:25, reference:'tag_path',width:'90%', listeners:{specialkey :'showHidePathFields'}},
           {xtype:'textfield',fieldLabel:'Path to server', margin:'15 25 0 25', height:25, reference:'tag_url',width:'90%', hidden: true},
           {xtype:'textfield',fieldLabel:'Root file', margin:'15 25 0 25', height:25, reference:'tag_root',width:'90%', hidden: true},
           {xtype:'button',text:'Undo', margin:'15 25 0 25', height:25, reference:'tag_undo', hidden: true, handler:'cleanPath'},
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		layout:{type:'hbox'},
		items:[ {xtype:'button', text: 'Añadir',margin: '0 0 0 5', handler: 'addServer', reference:'buttonaddedit'},
			   {xtype:'button', text: 'Cancelar',margin: '0 0 0 5', handler: 'closeWindow'}]
		
	}]
});
