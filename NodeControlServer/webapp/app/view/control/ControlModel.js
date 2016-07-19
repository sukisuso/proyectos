Ext.define('App.view.control.ControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.control-view',

    stores: {
        // Define a store of Customer records that links to the Session.
        servers: {
        	fields: ['name', 'status', 'path', 'file', '_id', 'processId', 'port'],
        	 data: {
        		 items: []
            },
        	storeId: 'servers',

            autoLoad: true,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'items'
                }
            }
        }
    }
});