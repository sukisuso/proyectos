Ext.define('App.view.experiencia.ExperienciaEdit', {
    extend: 'Ext.panel.Panel',
    requires: [
       'App.view.experiencia.ExperienciaEditController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'experienciaedit',
	controller:'experienciaedit',
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
				reference:'field_dateI_expE',
				width:300,
				fieldLabel: 'Fecha Inicio',
				margin:'5 5 0 0',
			},{
				xtype: 'datefield',
				name: 'fechafin',
				reference:'field_dateF_expE',
				width:300,
				fieldLabel: 'Fecha Fin',
				margin:'5 0 0 0',
			},{
				xtype: 'textfield',
				name: 'empresa',
				reference:'field_empresa_expE',
				width:300,
				fieldLabel: 'Empresa',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'lugar',
				reference:'field_lugar_expE',
				width:300,
				fieldLabel: 'Lugar',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'puesto',
				reference:'field_puesto_expE',
				width:300,
				fieldLabel: 'Puesto',
				margin:'5 5 0 0',
			},{xtype:'label'},{
				xtype: 'textarea',
				name: 'desc',
				reference:'field_desc_expE',
				width:300,
				fieldLabel: 'Descripcion',
				margin:'5 5 0 0',
			}
		]
	}],
	
	bbar:['->',{xtype:'button', text:'Guardar', iconCls:'saveCls', handler:'saveInfo'},
		 {xtype:'button', text:'Cerrar', iconCls:'deleteCls', handler:'closeWindow'}]
	
	
});
