Ext.define('App.view.experiencia.Experiencia', {
    extend: 'Ext.panel.Panel',
    requires: [
       // 'App.view.box.MBoxController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'experiencia',

	layout: {
        type: 'vbox',
		type:'fit'
	},
	
	defaults: {
    },
	
	padding:'15 15 15 15',
	border:true,

    items: [{
		xtype:'grid',
		border:true,
		margin:'5 5 5 5',
		flex:1,
		forcefit :true,
		store: Ext.create('Ext.data.Store', {
                        storeId:'experienciaGridStore',fields:['phone']
		}),
		columns:[
			{text:'Inicio', dataIndex:'start', flex:1},
			{text:'Fin', dataIndex:'end', flex:1},
			{text:'Empresa', dataIndex:'empresa', flex:1},
			{text:'Lugar', dataIndex:'place', flex:1},
			{text:'Puesto', dataIndex:'work', flex:1},
			{text:'Descripcion', dataIndex:'desc', flex:1}
		]
    }],
	
	tbar:[{xtype:'button', text:'Añadir Experiencia', iconCls:'addCls', disabled:true},
		  {xtype:'button', text:'Editar Experiencia', iconCls:'editCls', disabled:true},
		 {xtype:'button', text:'Eliminar Experiencia', iconCls:'deleteCls', disabled:true}]
	
});
