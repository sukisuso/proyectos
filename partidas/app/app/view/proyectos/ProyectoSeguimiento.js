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
		height:810,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		ddGroup:'kanban1',
		viewConfig: {plugins: {ptype: 'gridviewdragdrop', dragGroup: 'kanban', dropGroup: 'kanban'},
					listeners: {beforeDrop : 'changeTareaStateBacklog'}},
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStoreBacklog',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Backlog',dataIndex:'nombre', width:422, renderer: 'rendererCard'}]
	},
			
			{
		
		xtype:'grid',
		reference:'progressGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:810,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		ddGroup:'kanban2',
		viewConfig: {plugins: {ptype: 'gridviewdragdrop', dragGroup: 'kanban', dropGroup: 'kanban'},
					listeners: {beforeDrop : 'changeTareaStateProgress'}},
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStoreProgress',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'In Progress',dataIndex:'nombre', width:422, renderer: 'rendererCard'}]
	},
			
			{
		
		xtype:'grid',
		reference:'bloquedGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:810,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		ddGroup:'kanban',
		viewConfig: {plugins: {ptype: 'gridviewdragdrop', dragGroup: 'kanban', dropGroup: 'kanban'},
					listeners: {beforeDrop : 'changeTareaStateBlokced'}},
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStoreBloqued',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Bloqued',dataIndex:'nombre', width:422, renderer: 'rendererCard'}]
	}, 
			
			{
		
		xtype:'grid',
		reference:'doneGridKanban',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		height:810,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		ddGroup:'kanban',
		viewConfig: {plugins: {ptype: 'gridviewdragdrop', dragGroup: 'kanban', dropGroup: 'kanban'},
					listeners: {beforeDrop : 'changeTareaStateDone'}},		
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStoreDone',
    					fields:['nombre', 'tipo', 'des','estado', 'importancia','inicial', 'final']    	  					
		}),
		columns:[{text:'Done',dataIndex:'nombre', width:421, renderer: 'rendererCardDone'}],
		listeners:{
			itemcontextmenu:function( obj, record, item, index, e, eOpts ){
				 e.stopEvent();
				var contextMenu = Ext.create('Ext.menu.Menu', {
					items: [{iconCls:'lockiconcls',dataRowIndex:index,dataRowStore:obj.store,dataRowGrid:record, text:'Cerrar Tarea', handler:function(objMenu,data,node){
						var tarea = objMenu.config.dataRowGrid.data;
						objMenu.config.dataRowStore.removeAt(objMenu.config.dataRowIndex);
						tarea.estado = "Closed";
						delete tarea.id;
			
						Ext.Ajax.request({url: 'tareas/updateTarea',
							jsonData:{'tarea':tarea},
							method:'POST',
							success: function(data){
							},
							failure:function(){alert("Error")}
						 });
					}}]
				});
                 contextMenu.showAt(e.getXY());
                 return false;
			}
		}
	}
	]
});
