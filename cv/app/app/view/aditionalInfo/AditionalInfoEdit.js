Ext.define('App.view.aditionalInfo.AditionalInfoEdit', {
    extend: 'Ext.panel.Panel',
    requires: [
       'App.view.aditionalInfo.AditionalInfoEditController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'aditionalinfoedit',
	controller:'aditionalinfoedit',
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
				xtype: 'textarea',
				name: 'desc',
				reference:'field_desc_aditionalE',
				width:500,
				height:200,
				fieldLabel: 'Descripcion',
				margin:'5 5 0 0',
			}
		]
	}],
	
	bbar:['->',{xtype:'button', text:'Guardar', iconCls:'saveCls', handler:'saveInfo'},
		 {xtype:'button', text:'Cerrar', iconCls:'deleteCls', handler:'closeWindow'}]
	
	
});
