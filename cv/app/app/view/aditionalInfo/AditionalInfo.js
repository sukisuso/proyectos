Ext.define('App.view.aditionalInfo.AditionalInfo', {
    extend: 'Ext.panel.Panel',
    requires: [
       // 'App.view.box.MBoxController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'aditionalInfo',

	layout: {
        type: 'vbox',
    },
	
	defaults: {
    },
	
	padding:'15 15 15 15',
	border:true,
 	
    items: [{
		xtype:'panel',
		layout: {type: 'table',columns:3   },
		items:[{
				xtype: 'textareafield',
				name: 'aditionalInfo',
				width:600,
				height:400,
				fieldLabel: 'Información Adicional',
				margin:'20 10 10 20',
				readOnly:true
			}
		]
	}],
	
	tbar:[{xtype:'button', text:'Editar Información Adicional', iconCls:'editCls'}]
	
	
});
