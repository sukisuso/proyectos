/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ptd.view.agenda.Agenda', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ptd.view.agenda.AgendaController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'agenda',
    id:'agendaId',
    controller: 'agenda',
    /*viewModel: {
        type: 'main'
    },*/


    items:[{
			html:"<div id='calendar' style='max-width: 900px;	margin: 0 auto;margin-top:30px;'></div>",
			bbar:[{
				xtype:'panel',
				layout:{type:'hbox'},
				items:[{xtype:'button', text:'Nueva Cita', iconCls:'addiconcls',margin: '0 0 0 10',  handler: 'openNewDateWindow'},
					  {xtype:'button', text:'Eliminar Vacaciones', iconCls:'editiconcls',margin: '0 0 0 10',  handler: 'editVac'}]
		}]
		}
		
	]
	
	
});
