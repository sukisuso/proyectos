

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
			},
			eventClick: function(calEvent, jsEvent, view) {

				if(calEvent.cita != null){
					Ext.Msg.show({
						title:'Eliminar cita?',
						message: '¿Desea Eliminar la cita?',
						buttons: Ext.Msg.YESNO,
						icon: Ext.Msg.QUESTION,
						fn: function(btn) {
							if (btn === 'yes') {
								Ext.Ajax.request({url: 'agenda/deleteCita',
									params: {'_id': calEvent._id},
									method:'POST',
									success: function(data){
										$('#calendar').fullCalendar('refetchEvents');
									},
								 });
							} 
						}
					});
				}
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
		
	},
	
	editVac:function(){
		Ext.create('Ext.window.Window', {
            title: "Eliminar Festivos",
            height: 500,
            width:650 ,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'agendafestivos',
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
