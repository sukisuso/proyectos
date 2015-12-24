/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.partida.PartidaWindow', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.partida.PartidaWindowController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'partidawindow',
    
    controller: 'partidaWindow',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{ xtype: 'datefield',fieldLabel:'Fecha',name: 'from_date', maxValue: new Date(), value:new Date(), margin:'10 0 0 5',height:25
			,reference:'date_entrada', format: 'd/m/Y'},
		   {xtype:'numberfield',fieldLabel:'Cantidad', name:'filtertext', margin:'5 0 0 5',height:25, reference:'cant_entrada', minValue: 1, hideTrigger:true},
		   {
            xtype:'combobox',
            fieldLabel: 'Tipo',
			height:25,
            reference:'combobox_tipo',
            store:  Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data : [
                        {"name":"Ingreso"},
                        {"name":"Gasto"},
                        {"name":"Reserva"},
                        {"name":"Publicar"}
                    ]
            }),
            displayField: 'name',
			   value:"Gasto",
            valueField: 'name', margin:'5 0 0 5'
		   },
		   {xtype:'textfield',fieldLabel:'Tag', name:'filtertext', margin:'5 0 0 5', height:25, reference:'tag_entrada', value:'#'},
		   {xtype:'textareafield',fieldLabel:'Descripcion', name:'filtertext', margin:'5 0 0 5',height:80, reference:'desc_entrada'}
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		layout:{type:'hbox'},
		items:[ {xtype:'button', text: 'Añadir',margin: '0 0 0 5', handler: 'addEntrada', reference:'buttonaddedit'},
			   {xtype:'button', text: 'Cancelar',margin: '0 0 0 5', handler: 'closeWindow'}]
		
	}]
});
