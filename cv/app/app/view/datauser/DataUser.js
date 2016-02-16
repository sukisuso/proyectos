Ext.define('App.view.datauser.DataUser', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.datauser.DataUserController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'datauser',
	id:'datauser',
	controller:'datauser',
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
				xtype: 'textfield',
				name: 'name',
				reference:'field_name_info',
				width:300,
				fieldLabel: 'Nombre',
				margin:'20 10 10 20',
				readOnly:true,
			},{
				xtype: 'textfield',
				name: 'sur1',
				reference:'field_sur1_info',
				width:300,
				fieldLabel: 'Primer Apellido',
				margin:'10 10 10 10',
				readOnly:true,
			},{
				xtype: 'textfield',
				name: 'sur2',
				reference:'field_sur2_info',
				width:300,
				fieldLabel: 'Segundo Apellido',
				margin:'10 10 10 10',
				readOnly:true,
			},{
				xtype: 'textfield',
				name: 'email',
				reference:'field_email_info',
				width:300,
				fieldLabel: 'Email',
				margin:'20 10 10 20',
				readOnly:true,
			},{
				xtype: 'textfield',
				name: 'dir',
				reference:'field_dir_info',
				width:300,
				fieldLabel: 'Direccion',
				margin:'10 10 10 10',
				readOnly:true,
			},{
				xtype: 'textfield',
				name: 'postal',
				reference:'field_postal_info',
				width:300,
				fieldLabel: 'Codigo Postal',
				margin:'10 10 10 10',
				readOnly:true,
			}
		]
	},{
		xtype:'grid',
		border:true,
		reference:'field_gridPhone_info',
		margin:'15 5 5 15',
		height:200,
		width:310,
		store: Ext.create('Ext.data.Store', {
                        storeId:'phoneGridStore',fields:['phone']
		}),
		columns:[
			{text:'Telefonos', dataIndex:'phone', flex:1}
		]
    }],
	
	tbar:[{xtype:'button', text:'Editar Información', iconCls:'editCls', handler:'openEditInfo'}]
	
	
});
