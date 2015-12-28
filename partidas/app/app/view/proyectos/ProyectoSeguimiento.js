/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.proyectos.ProyectoSeguimiento', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.proyectos.ProyectoSeguimientoController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'proyectoseguimiento',
    
    controller: 'proyectoseguimiento',
    /*viewModel: {
        type: 'main'
    },*/

 
layout: {
    type: 'hbox',
    align: 'left'
},
    items: [{
		
		xtype:'grid',
		reference:'backlogGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:820,
		
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Backlog',dataIndex:'nombre', width:422}]
	},
			
			{
		
		xtype:'grid',
		reference:'progressGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:820,
		
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'In Progress',dataIndex:'nombre', width:422}]
	},
			
			{
		
		xtype:'grid',
		reference:'bloquedGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:820,
		
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Bloqued',dataIndex:'nombre', width:422}]
	}, 
			
			{
		
		xtype:'grid',
		reference:'doneGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:820,
		
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Done',dataIndex:'nombre', width:421}]
	}
	]
});
