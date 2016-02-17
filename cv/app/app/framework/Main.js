/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.framework.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'App.framework.MainController',
        'App.framework.MainModel'
    ],

    xtype: 'app-main-dev',
    plugins: 'viewport',
    controller: 'main-dev',
    viewModel: {
        type: 'main-dev'
    },

    layout: {
        type: 'border',
		align:'center',
		pack: 'center'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
       html: '<img src="/resources/img/logocv.png" height="50" >',
		bodyStyle:{"background-color":"#D8D8D8"}, 
		bbar:[{
			xtype:'MenuDevBar',
		}]
    },{
		region: 'center',
        xtype:'tabpanel',
		itemId:'tabpanel-Aplication-dev',
		items:[
			{
				title:'Indice'
			}
		]
    }]
});
