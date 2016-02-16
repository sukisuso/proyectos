Ext.define('App.view.estudios.Estudios', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.estudios.EstudiosController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'estudios',
	id:'estudios',
	controller:'estudios',
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
		reference:'grid_estudios_form',
		margin:'5 5 5 5',
		flex:1,
		forcefit :true,
		store: Ext.create('Ext.data.Store', {
                        storeId:'estudiosGridStore',fields:['_id','initDate', 'endDate', 'titulo', 'centro', 'nota']
		}),
		columns:[
			{ dataIndex:'_id', hidden:true},
			{text:'Fecha Inicio', dataIndex:'initDate', flex:1, renderer:'dateRender'},
			{text:'Fecha Fin', dataIndex:'endDate', flex:1, renderer:'dateRender'},
			{text:'Titulo', dataIndex:'titulo', flex:1},
			{text:'Centro', dataIndex:'centro', flex:1},
			{text:'Nota Media', dataIndex:'nota', flex:1}
		],
		listeners:{
			'itemclick':'itemSelection',
			'beforeitemdblclick':'editNewEstudios'
		}
    }],
	
	tbar:[{xtype:'button', text:'Añadir Estudios', iconCls:'addCls', handler:'addNewEstudios'},
		  {xtype:'button', text:'Editar Estudios',reference:'est_edit_button', iconCls:'editCls', disabled:true,
		   		handler:'editNewEstudios'},
		 {xtype:'button', text:'Eliminar Estudios', reference:'est_delete_button',iconCls:'deleteCls',
		  		disabled:true,handler:'deleteNewEstudios'}],
	
	
	
});
