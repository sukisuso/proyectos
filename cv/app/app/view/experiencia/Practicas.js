Ext.define('App.view.experiencia.Practicas', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.experiencia.PracticasController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'practicas',
	id:'practicas',
	controller:'practicas',
	layout: {
        type: 'vbox',
		type:'fit'
	},
	
	
	padding:'15 15 15 15',
	border:true,

    items: [{
		xtype:'grid',
		border:true,
		reference:'grid_practicas_data',
		margin:'5 5 5 5',
		flex:1,
		forcefit :true,
		store: Ext.create('Ext.data.Store', {
                        storeId:'practicasGridStore',fields:['initDate','endDate','empresa','lugar','puesto','desc']
		}),
		columns:[
			{ dataIndex:'_id', hidden:true},
			{text:'Fecha Inicio', dataIndex:'initDate', flex:1, renderer:'dateRender'},
			{text:'Fecha Fin', dataIndex:'endDate', flex:1, renderer:'dateRender'},
			{text:'Empresa', dataIndex:'empresa', flex:1},
			{text:'Lugar', dataIndex:'lugar', flex:1},
			{text:'Puesto', dataIndex:'puesto', flex:1},
			{text:'Descripcion', dataIndex:'desc', flex:1}
		],
		listeners:{
			'itemclick':'itemSelection',
			'beforeitemdblclick':'editNewPractica'
		}
    }],
	
	tbar:[{xtype:'button', text:'Añadir Experiencia', iconCls:'addCls', handler:'addNewPractica'},
		  {xtype:'button', text:'Editar Experiencia', iconCls:'editCls', disabled:true,reference:'prac_edit_button', 
		   handler:'editNewPractica'},
		 {xtype:'button', text:'Eliminar Experiencia', iconCls:'deleteCls', disabled:true,reference:'prac_del_button',
		 handler:'delNewPractica'}]
	
});