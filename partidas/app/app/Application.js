/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Ptd.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Ptd',

    stores: [
        // TODO: add global / shared stores here
    ],
    
	views: [
			 'Ptd.view.partida.Partida',
			 'Ptd.view.partida.PartidaWindow'
    ],
	
    launch: function () {
        // TODO - Launch the application
    }
});
