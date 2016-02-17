Ext.define('App.view.experiencia.Experiencia', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.experiencia.ExperienciaController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'experiencia',
	id:'experiencia',
	controller:'experiencia',
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
		reference:'grid_experiencias_data',
		margin:'5 5 5 5',
		flex:1,
		forcefit :true,
		store: Ext.create('Ext.data.Store', {
                        storeId:'experienciaGridStore',fields:['initDate','endDate','empresa','lugar','puesto','desc']
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
			'beforeitemdblclick':'editNewExperiencia'
		}
    }],
	
	tbar:[{xtype:'button', text:'Añadir Experiencia', iconCls:'addCls',handler:'addNewExperiencia'},
		  {xtype:'button', text:'Editar Experiencia', iconCls:'editCls', disabled:true,reference:'exp_edit_button', 
		   handler:'editNewExperiencia'},
		 {xtype:'button', text:'Eliminar Experiencia', iconCls:'deleteCls', disabled:true,reference:'exp_del_button',
		 handler:'delNewExperiencia'}]
	
});
