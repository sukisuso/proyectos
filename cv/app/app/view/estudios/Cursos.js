Ext.define('App.view.estudios.Cursos', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.estudios.CursosController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'cursos',
	controller:'cursos',
	id:'cursos',
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
		reference:'grid_cursos_form',
		flex:1,
		forcefit :true,
		store: Ext.create('Ext.data.Store', {
                        storeId:'cursosGridStore',fields:['_id','initDate', 'endDate', 'titulo', 'centro', 'nota']
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
	
	tbar:[{xtype:'button', text:'Añadir Curso', iconCls:'addCls',handler:'addNewEstudios'},
		  {xtype:'button', text:'Editar Curso', iconCls:'editCls', disabled:true, handler:'editNewEstudios', 
		   reference:'cur_edit_button'},
		 {xtype:'button', text:'Eliminar Curso', reference:'cur_delete_button',iconCls:'deleteCls',
		  		disabled:true,handler:'deleteNewEstudios'}]
	
});
