Ext.define('App.view.estudios.EstudiosEdit', {
    extend: 'Ext.panel.Panel',
    requires: [
       'App.view.estudios.EstudiosEditController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'estudiosedit',
	controller:'estudiosedit',
	layout: {
        type: 'vbox',
    },
	
	defaults: {
    },
	
	padding:'15 15 15 15',
	border:true,
 	
    items: [{
		xtype:'panel',
		layout: {type: 'table',columns:2   },
		items:[{
				xtype: 'datefield',
				name: 'fechainicio',
				reference:'field_dateI_estE',
				width:300,
				fieldLabel: 'Fecha Inicio',
				margin:'5 5 0 0',
			},{
				xtype: 'datefield',
				name: 'fechafin',
				reference:'field_dateF_estE',
				width:300,
				fieldLabel: 'Fecha Fin',
				margin:'5 0 0 0',
			},{
				xtype: 'textfield',
				name: 'titulo',
				reference:'field_titulo_estE',
				width:300,
				fieldLabel: 'Titulo',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'centro',
				reference:'field_centro_estE',
				width:300,
				fieldLabel: 'Centro',
				margin:'5 5 0 0',
			},{
				xtype: 'numberfield',
				name: 'postal',
				reference:'field_media_estE',
				width:300,
				hideTrigger:true,
				fieldLabel: 'Nota Media',
				margin:'5 5 0 0',
			}
		]
	}],
	
	bbar:['->',{xtype:'button', text:'Guardar', iconCls:'saveCls', handler:'saveInfo'},
		 {xtype:'button', text:'Cerrar', iconCls:'deleteCls', handler:'closeWindow'}]
	
	
});
