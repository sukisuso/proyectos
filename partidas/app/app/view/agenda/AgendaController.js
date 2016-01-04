

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
			events: [
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
			]
		});
    }
});
