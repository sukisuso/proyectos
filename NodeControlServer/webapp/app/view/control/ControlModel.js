Ext.define('App.view.control.ControlModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.control-view',

    stores: {
        // Define a store of Customer records that links to the Session.
        customers: {
        	fields: ['name', 'status', 'path', 'file'],
        	 data: {
        		 items: [
                    { name: 'Partidas', status: "runing", path: "D:/Documentos/GitHub/proyectos/partidas" , file:"index"}
                 
            ]},
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