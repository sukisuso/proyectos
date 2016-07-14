Ext.define('App.view.control.ControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.control-view',

    stores: {
        // Define a store of Customer records that links to the Session.
        customers: {
        	storeId: 'servers',
            autoLoad: true,
        }
    }
});