/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ptd.view.main.MainController',
        'Ptd.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
		bodyStyle:{"background-color":"#ADD2ED"}, 
        html: '<img src="/resources/logo.png" height="50" style="margin-top: 0.75cm;">',
        width: 250,
		height:100,

    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{title:'Inicio',
			   	html:'<center><img src="/resources/cabecera.png" style="margin-top: 2cm;"></center>'
			   },
			   {
				   title:'Agenda',
				   xtype:'agenda'
				   //html:'<div id="calendar" style="max-width: 900px;	margin: 0 auto;"></div>'
			   },
			   {
				   title:'Proyectos',
				   xtype:'proyecto'
			   },{
            		title: 'Partidas',
				    xtype:'partida',
					id_crud_partida: 1
        }],
		
		
    }]
});
