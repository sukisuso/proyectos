Ext.define('App.store.Servers', {
    extend: 'Ext.data.Store',

    alias: 'store.servers',

    fields: [
        'name', 'status', 'path'
    ],

    data: { items: [
                    { name: 'Jean Luc', status: "jeanluc.picard@enterprise.com", path: "555-111-1111" },
                    { name: 'Worf',     status: "worf.moghsson@enterprise.com",  path: "555-222-2222" },
                    { name: 'Deanna',   status: "deanna.troi@enterprise.com",    path: "555-333-3333" },
                    { name: 'Data',     status: "mr.data@enterprise.com",        path: "555-444-4444" }
                ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});