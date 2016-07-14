/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    
    name: 'App',

    stores: [
             'Servers'
    ],
    views:['App.view.control.ControlView'],
    
    
    launch: function () {
        // TODO - Launch the application
    	Ext.enableAriaButtons = false;
		Ext.enableAriaPanels = false;
		Ext.DatePicker.prototype.startDay = 1;

		Ext.widget('control-view');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
