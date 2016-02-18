Ext.define('App.view.aditionalInfo.AditionalInfo', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.aditionalInfo.AditionalInfoController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'aditionalInfo',
	controller:'aditionalinfo',
	id:'aditionalinfo',
	layout: {
        type: 'vbox',
    },
	
	defaults: {
    },
	
	padding:'15 15 15 15',
	border:true,
 	
    items: [{
		xtype:'panel',
		items:[{
				xtype: 'textareafield',
				name: 'aditionalInfo',
				reference:'aditional_info_field',
				width:600,
				height:400,
				fieldLabel: 'Información Adicional',
				margin:'20 10 10 20',
				readOnly:true
			}
		]
	}],
	
	tbar:[{xtype:'button', text:'Editar Información Adicional', iconCls:'editCls', handler:'editAditionalInfo'}]
	
	
});
