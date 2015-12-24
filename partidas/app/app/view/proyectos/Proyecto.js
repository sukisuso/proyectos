/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.proyectos.Proyecto', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.proyectos.ProyectoController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'proyecto',
    
    controller: 'proyecto',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{
		
		xtype:'grid',
		margin:'25 15 15 15',
		reference:'dataGridProyectos',
		layout: 'fit', 
		border:true,
		autoScroll:true,
				 height:680,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'version', 'des','porcentaje', 'activo','url', '_id']    					
		}),
		columns:[
			{ dataIndex:'_id', hidden:true},
			{text:'Nombre', dataIndex:'nombre',width: 200},
			{text:'Version', dataIndex:'version',width: 75},
			{text:'Descripcion', dataIndex:'des', width: 350},
			{text:'Porcentaje', dataIndex:'porcentaje', width: 120},
			{text:'Activo', dataIndex:'activo', width: 100},
			{text:'Url Repo', dataIndex:'url', width: 800},
			{
            	xtype:'actioncolumn', 
            	width:50,
            	items:[{
                	iconCls:'downloadiconcls',  // Use a URL in the icon config
					margin:'0 0 0 15',
					tooltip: 'Descargar',
					handler: function(){alert("HI")}
				},{
                	iconCls:'viewiconcls',  // Use a URL in the icon config
					margin:'0 0 0 15',
					tooltip: 'Descargar',
					handler: function(){alert("HI")}
            }]
			}
		],
				 
	  tbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		items:[{xtype:'button', text:'Nueva proyecto', iconCls:'addiconcls',margin: '0 0 0 10',  handler: 'addEntrada'},	
		  		{xtype:'button', text:'Editar entrada', iconCls:'editiconcls',margin: '0 0 0 10', handler:'editRow'},
			  {xtype:'button', text:'Borrar entrada', iconCls:'deleteiconcls',margin: '0 0 0 10', handler: 'deleteRow'}]
		}]
		
	}]
	
	
});
