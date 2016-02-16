Ext.define('App.view.estudios.Cursos', {
    extend: 'Ext.panel.Panel',
    requires: [
       // 'App.view.box.MBoxController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'cursos',

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
                        storeId:'cursosGridStore',fields:['phone']
		}),
		columns:[
			{text:'Inicio', dataIndex:'start', flex:1},
			{text:'Fin', dataIndex:'end', flex:1},
			{text:'Titulo', dataIndex:'titulo', flex:1},
			{text:'Centro', dataIndex:'center', flex:1},
			{text:'Nota Media', dataIndex:'mnote', flex:1}
		]
    }],
	
	tbar:[{xtype:'button', text:'Añadir Curso', iconCls:'addCls'},
		  {xtype:'button', text:'Editar Curso', iconCls:'editCls', disabled:true},
		 {xtype:'button', text:'Eliminar Curso', iconCls:'deleteCls', disabled:true}]
	
});
