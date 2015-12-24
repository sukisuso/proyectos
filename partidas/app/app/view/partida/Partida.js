/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.partida.Partida', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.partida.PartidaController'
       /* 'Ptd.view.main.MainModel'*/
    ],
	id:'partida',
    xtype: 'partida',
    
    controller: 'partida',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{xtype:'panel',layout:{type:'hbox'},
			 border:true,
			 margin:'10 15 10 15',
			 height:75,
			 items:[
				 { xtype:'textfield',id:'totalTotalField', name:'filtertext', margin: '25 0 0 30', height:25, fieldLabel:'Total Banco', readOnly:true, fieldStyle: 'text-align: center;'},
			 { xtype:'textfield',id:'totalDisponibleField', name:'filtertext', margin: '25 0 0 30', height:25, fieldLabel:'Total Disponible', readOnly:true, fieldStyle: 'text-align: center;'},
			 {xtype:'textfield',id:'totalGastadoField', name:'filtertext',  margin: '25 0 0 100', height:25, fieldLabel:'Total Gastado', readOnly:true, fieldStyle: 'text-align: center;'},
			{xtype:'textfield', id:'totalReservadoField',name:'filtertext', margin: '25 0 0 100', height:25, fieldLabel:'Total Reservado',readOnly:true, fieldStyle: 'text-align: center;'},
			 ]},{
		
		xtype:'grid',
		id:'entradas_grid',
		margin:'0 15 15 15',
		reference:'dataGrid',
		layout: 'fit', 
		border:true,
		autoScroll:true,
				 height:680,
		scroll: 'vertical',
		autoHeight: true,
		flex:1,
		store: Ext.create('Ext.data.Store', {
                        storeId:'dataGridStore',
						sorters :  {
							direction: 'DESC',
							sorterFn: function(record1, record2) {
								var date1 = new Date(record1.data.fecha),
									date2 = new Date(record2.data.fecha);

								return date1 > date2 ? 1 : (date1 === date2 ? 0 : -1);
							}
						},
						/*sortInfo: {
							field: 'fecha',
							direction: 'DESC' // or 'DESC' (case sensitive for local sorting)
						},*/
    					fields:['fecha', 'cantidad', 'tipo','tag', 'desc', '_id']    					
		}),
		columns:[
			{ dataIndex:'id', hidden:true},
			{text:'Fecha', dataIndex:'fecha',width: 200},
			{text:'Cantidad', dataIndex:'cantidad',width: 250, renderer : 'CellRenderCantidad'},
			{text:'Tipo', dataIndex:'tipo', width: 250, renderer : 'CellRender'},
			{text:'Tag', dataIndex:'tag', width: 250},
			{text:'Descripcion', dataIndex:'desc', width: 600}
		],
				 
	  tbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		items:[{xtype:'button', text:'Nueva entrada', iconCls:'addiconcls',margin: '0 0 0 10',  handler: 'addEntrada'},
			  {xtype:'button', text:'Editar entrada', iconCls:'editiconcls',margin: '0 0 0 10', handler:'editRow'},
			  {xtype:'button', text:'Borrar entrada', iconCls:'deleteiconcls',margin: '0 0 0 10', handler: 'deleteRow'},
			  {xtype:'textfield', name:'filtertext',reference:'filter_tag',emptyText:'Tag', margin: '0 0 0 300'},
			  { xtype: 'datefield',	name: 'from_date',reference: 'filter_start_Date' ,maxValue: new Date() ,margin: '0 0 0 5',emptyText:'Fecha Inicio', format: 'd/m/Y'},
			  { xtype: 'datefield',	name: 'from_date', reference: 'filter_end_Date',maxValue: new Date() ,margin: '0 0 0 5', emptyText:'Fecha Fin', format: 'd/m/Y'},
			  {xtype:'button', text: 'Filtrar',margin: '0 0 0 5', iconCls:'searchiconcls', handler:'filter'} ]
		
	}]
		
	}]
	
	
});
