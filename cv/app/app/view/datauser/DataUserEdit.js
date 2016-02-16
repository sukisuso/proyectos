Ext.define('App.view.datauser.DataUserEdit', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.datauser.DataUserEditController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'datauseredit',
	controller:'datauseredit',
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
				xtype: 'textfield',
				name: 'name',
				reference:'field_name_infoE',
				width:300,
				fieldLabel: 'Nombre',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'sur1',
				reference:'field_sur1_infoE',
				width:300,
				fieldLabel: 'Primer Apellido',
				margin:'5 0 0 0',
			},{
				xtype: 'textfield',
				name: 'sur2',
				width:300,
				fieldLabel: 'Segundo Apellido',
				reference:'field_sur2_infoE',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'email',
				reference:'field_email_infoE',
				width:300,
				fieldLabel: 'Email',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'dir',
				reference:'field_dir_infoE',
				width:300,
				fieldLabel: 'Direccion',
				margin:'5 5 0 0',
			},{
				xtype: 'textfield',
				name: 'postal',
				reference:'field_postal_infoE',
				width:300,
				fieldLabel: 'Codigo Postal',
				margin:'5 5 0 0',
			}
		]
	},{
		xtype:'panel',
		layout:'hbox',
		margin:'15 0 0 0',
		items:[
			{
				xtype:'numberfield',
				name:'telefoneToAdd',
				width:300,
				reference:'fieldNumberToAdd',
				hideTrigger:true,
				fieldLabel: 'Añadir Telefono'
			},
			{
				xtype:'button',
				text:'Añadir',
				iconCls:'addCls',
				margin:'0 0 0 5',
				handler:'addTelefonToGrid'
			}
		]
	},{
		xtype:'grid',
		border:true,
		reference:'gridTelefones',
		margin:'15 5 5 15',
		height:200,
		width:353,
		store: Ext.create('Ext.data.Store', {
                        storeId:'phoneGridStore',fields:['phone'] 
		}),
		columns:[
			{text:'Telefonos', dataIndex:'phone', flex:1},
			 {
				xtype:'actioncolumn',
				width:25,
				items: [{
					icon: '/resources/img/icons/delete.png',  // Use a URL in the icon config
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						var rec = grid.getStore().getAt(rowIndex);
						grid.store.removeAt(rowIndex)
					}
				}]
        	}
		]
    }],
	
	bbar:['->',{xtype:'button', text:'Guardar', iconCls:'saveCls', handler:'saveInfo'},
		 {xtype:'button', text:'Cerrar', iconCls:'deleteCls', handler:'closeInfo'}]
	
	
});
