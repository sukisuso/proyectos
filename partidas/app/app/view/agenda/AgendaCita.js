/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.agenda.AgendaCita', {
    extend: 'Ext.panel.Panel',
    requires: [
       'Ptd.view.agenda.AgendaCitaController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'agendacita',
    
    controller: 'agendacita',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{ xtype: 'datefield',fieldLabel:'Fecha', value:new Date(),
			 	margin:'10 0 0 5',height:25,reference:'start_date', format: 'd/m/Y', listeners:{"select":"changestartDate"}},
		   {xtype:'textfield',fieldLabel:'Titulo', margin:'10 0 0 5', height:25, reference:'title_cita'},
			{ xtype: 'datefield',fieldLabel:'Fecha fin', value:new Date(), 
			 	margin:'10 0 0 5',height:25	,reference:'end_date', format: 'd/m/Y',hidden:true},
		   {xtype:'checkbox',fieldLabel:'Vacaciones',  margin:'5 0 0 5', reference:'checkboxvaca', listeners:{
			   'change':'vacacionesChange'
		   }}
			
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		layout:{type:'hbox'},
		items:[ {xtype:'button', text: 'Añadir',margin: '0 0 0 5', handler: 'addEntrada', reference:'buttonaddedit'},
			   {xtype:'button', text: 'Cancelar',margin: '0 0 0 5', handler: 'closeWindow'}]
		
	}]
});
