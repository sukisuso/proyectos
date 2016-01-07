

Ext.define('Ptd.view.agenda.AgendaController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.agenda',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'agenda'      : {
                afterRender : 'loadData',
            }
        }
    },
	
	loadData: function() {
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			defaultDate: new Date(),
			editable: true,
			businessHours: true, 
			eventLimit: true, // allow "more" link when too many events
			events: function(start, end,tt, callback){
				$.ajax({ type: "POST",
					url: 'agenda/getAgenda',
					success: function(data) {
						callback(data);
					}
				});
			}
		});
    },
	
	openNewDateWindow: function(){
		Ext.create('Ext.window.Window', {
            title: "Añadir Cita",
            height: 300,
            width: 305,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'agendacita',
            }, listeners: {
				close: function (wnd, eOpts) {
                     
                  }
			}
        }).show();
		
	}
});


/*
{ // Ejemplo Cita
	title: 'Click for Google',
	url: 'http://google.com/',
	start: '2015-12-28',
//	end: '2015-12-12T12:30:00'
},
{ // Ejemplo Vacaciones
	start: '2016-01-24',
	end: '2016-01-28',
	overlap: false,
	rendering: 'background',
	color: '#ff9f89'
},{// Economia
	title: 'Meeting',
	start: '2016-01-13',
	constraint: 'availableForMeeting', // defined below
	color: '#257e4a'
}


*/
