Ext.define('App.framework.Menu', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'App.framework.MenuController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'MenuDevBar',
    layout: {
        type: 'hbox',
    },
	controller:'MenuDevBar',
	
	items: [{
            xtype:'splitbutton',
            text: 'Mantenimiento',
            iconCls: 'personalCls',
			handler:'clickSplit',
            menu: [{
				text: 'Informacion Personal',
				handler:'clickElement',
				iconCls:'infCls',
				menuItemId:'datauser'
			},{text:'Mantenimiento de Usuarios', iconCls:'usersCls'}]
        },{
            xtype:'splitbutton',
            text: 'Estudios',
            iconCls: 'estudiosCls',
			handler:'clickSplit',
            menu: [{
						text: 'Formacion', 
						iconCls:'schoolCls',
						handler:'clickElement',
						menuItemId:'estudios'
					}, {
						text:'Cursos',
						iconCls:'cursosCls',
						handler:'clickElement',
						menuItemId:'cursos'
					}
				  ]
        },{
			xtype:'splitbutton',
            text: 'Experiencia Laboral',
            iconCls: 'workCls',
			handler:'clickSplit',
			menu:[{
						text:'Experiencia Labora',
						iconCls:'expCls',
						handler:'clickElement',
						menuItemId:'experiencia'
					},{
						text:'Practicas',
						iconCls:'practCls',
						handler:'clickElement',
						menuItemId:'practicas'
					  }]
        },{
			xtype:'splitbutton',
            text: 'Informacion Adicional',
            iconCls: 'infoCls',
			handler:'clickSplit',
            menu: [{text: 'Informacion Adicional',iconCls:'informationCls',handler:'clickElement',menuItemId:'aditionalInfo'},{
				text:'Skills', iconCls:'skillsCls'
			}]
        },{
            text: 'Exportar',
            iconCls: 'pdfCls'
        },{
            text: 'Search',
			iconCls:'searchCls'
        }]
	
	
	
});
