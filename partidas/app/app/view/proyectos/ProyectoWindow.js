/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.proyectos.ProyectoWindow', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.proyectos.ProyectoWindowController'
       /* 'Ptd.view.main.MainModel'*/
    ],

    xtype: 'proyectowindow',
    
    controller: 'proyectoWindow',
    /*viewModel: {
        type: 'main'
    },*/

 

    items: [{xtype:'textfield',fieldLabel:'Nombre',  margin:'5 0 0 5', height:25, reference:'pro_nombre'},
			{xtype:'textfield',fieldLabel:'Version',  margin:'5 0 0 5', height:25, reference:'pro_version'},
		   {
            xtype:'combobox',
            fieldLabel: 'Activo',
			height:25,
            reference:'pro_activo',
            store:  Ext.create('Ext.data.Store', {
                    fields: ['name'],
                    data : [
                        {"name":"Si"},
                        {"name":"No"}
                    ]
            }),
            displayField: 'name',
			   value:"Si",
            valueField: 'name', margin:'5 0 0 5'
		   },
		   {xtype:'textareafield',fieldLabel:'Url GitHub', margin:'5 0 0 5',height:80, reference:'pro_url'},
		   {xtype:'textareafield',fieldLabel:'Descripcion',  margin:'5 0 0 5',height:80, reference:'pro_desc'}
	],
	
	bbar:[{
		xtype:'panel',
		layout:{type:'hbox'},
		layout:{type:'hbox'},
		items:[ {xtype:'button', text: 'Añadir',margin: '0 0 0 5', handler: 'addEntrada', reference:'buttonaddedit'},
			   {xtype:'button', text: 'Cancelar',margin: '0 0 0 5', handler: 'closeWindow'}]
		
	}]
});
