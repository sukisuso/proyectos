/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.agenda.AgendaFestivos', {
    extend: 'Ext.panel.Panel',
    requires: [
       'Ptd.view.agenda.AgendaFestivosController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'agendafestivos',
    
    controller: 'agendafestivos',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [
		   {xtype:'numberfield',fieldLabel:'Año', margin:'10 15 0 15', reference:'year_reference', value:new Date().getFullYear(),
		   hideTrigger: true,listeners: {
            specialkey: 'changeDate'
        }},
		{
		
		xtype:'grid',
		margin:'10 15 15 15',
		reference:'gridFestivos',
		layout: 'fit', 
		border:true,
		autoScroll:true,
		scroll: 'vertical',
			height:370,
			flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
    					fields:['start', 'end', '_id']    					
		}),
		columns:[
			{ dataIndex:'_id', hidden:true},
			{text:'Inicio',  width:200,dataIndex:'start'},
			{text:'Fin',  width:200,dataIndex:'end'},
			
			{
            	xtype:'actioncolumn', 
            	width:50,
            	items:[{
                    iconCls: 'deleteiconcls',
                    tooltip: 'Delete',
                    scope: this,
                    handler: function(grid, rowIndex, colIndex,obj,aww){
						
						Ext.Ajax.request({url: 'agenda/deleteFestivo',
							jsonData:{'_id':grid.store.getAt(rowIndex).data._id},
							method:'POST',
							success: function(data){
								grid.store.removeAt(rowIndex);
							},
							failure:function(){alert("Error")}
						 });
					}
                }]
			}
		]
		
	}
			
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		layout:{type:'hbox'},
		items:[   {xtype:'button', text: 'Cerrar',margin: '0 0 0 5', handler: 'closeWindow'}]
		
	}]
});
