/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.proyectos.ProyectoTareas', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.proyectos.ProyectoTareasController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'proyectotareas',
    
    controller: 'proyectotareas',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{
		
		xtype:'grid',
		margin:'25 15 15 15',
		reference:'dataGridTareas',
		layout: 'fit', 
		border:true,
		autoScroll:true,
				 height:780,
		scroll: 'vertical',
		autoHeight: true,
		selModel: 'cellmodel',
		plugins: {
        	ptype: 'cellediting',
       	 	clicksToEdit: 2
    	},
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    					
		}),
		columns:[
			{ dataIndex:'_id', hidden:true},
			{text:'Nombre', dataIndex:'nombre',width: 200, editor:'textfield'},
			{text:'Descripcion', dataIndex:'des', width: 400,editor:'textfield'},
			{text:'Tipo', dataIndex:'tipo', width: 150, editor: {
				xtype:'combobox',store:  Ext.create('Ext.data.Store', {
						fields: ['name'],
						data : [{"name":"Desarrollo"},{"name":"Pruebas"}]
				}), displayField:'name',valueField: 'name'
		   	}},
			{text:'Estado', dataIndex:'estado', width: 100, editor: {
				xtype:'combobox',store:  Ext.create('Ext.data.Store', {
						fields: ['name'],
						data : [{"name":"Backlog"},{"name":"In progress"},{"name":"Blocked"},{"name":"Done"},{"name":"Closed"}]
				}), displayField:'name',valueField: 'name'
		   	}},
			{text:'Importancia', dataIndex:'importancia', width: 100, editor: {
				xtype:'combobox',store:  Ext.create('Ext.data.Store', {
						fields: ['name'],
						data : [{"name":"Sencilla"},{"name":"Normal"},{"name":"Compleja"}]
				}), displayField:'name',valueField: 'name'
		   	}},
			{text:'Estimacion Inicial', dataIndex:'inicial', width: 175, editor:'numberfield'},
			{text:'Coste Final', dataIndex:'final', width: 100, editor:'numberfield'},
			{
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'deleteiconcls',
                    tooltip: 'Delete',
                    scope: this,
                    handler: function(grid, rowIndex, colIndex){
						grid.store.removeAt(rowIndex);
					}
                }]
            }
		
		],
				 
	  tbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		items:[{xtype:'button', text:'Nueva Tarea', iconCls:'addiconcls',margin: '0 0 0 10',  handler: 'addData'}]
		}],
		bbar:[{xtype:'button', text:'Guardar', iconCls:'addiconcls',margin: '0 0 0 10',  handler: 'saveAllData'}]
		
	}
	]
});
