

Ext.define('Ptd.view.agenda.AgendaCitaController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.agendacita',
    requires: [
        'Ext.window.MessageBox'
    ],

	init: function() {

    },
	
	closeWindow:function(){
		var win = Ext.WindowManager.getActive();
					if (win) {
						win.close();
					}
	},
	
	addEntrada:function(){
		var obj = {}
		var time = this.lookupReference('start_date').getValue();
		var vaccaciones = this.lookupReference('checkboxvaca').getValue();
		
		var day  = 00;
		var mounth = 00;
		if(time.getDate() < 10){
			day = '0'+time.getDate();
		}else { day = time.getDate();}
			
		if((time.getMonth()+1) < 10){
			mounth = '0'+(time.getMonth()+1);
		}else { mounth = (time.getMonth()+1);}
		
		obj["start"] = time.getFullYear()+ "-" +mounth  + "-"+ day ;
		
		if(!vaccaciones){
			obj["title"]  = this.lookupReference('title_cita').getValue();
			obj["cita"] = true;
			if(obj["title"] == null || obj["title"] == ""){
				this.lookupReference('title_cita').markInvalid('Rellene name_date campo');
				return;
			}
			
			Ext.Ajax.request({url: 'agenda/insertAgenda',
				jsonData:{'agenda':obj},
				method:'POST',
				success: function(data){
					var win = Ext.WindowManager.getActive();
					Ext.toast({html: 'Se ha añadido la cita', title:'Citas', width: 200,  align: 't'});
					if (win) {
						win.close();
					}
					$('#calendar').fullCalendar('refetchEvents');
				},
				failure:function(){alert("Error")}
			 });
		}else {
			obj["vacaciones"] = true;
			obj["color"] = "#ff9f89";
			obj["overlap"] = false;
			obj["rendering"] = 'background';

			var end = this.lookupReference('end_date').getValue();
			end.setDate(end.getDate()+1);
			
			var dia  = 0;
			var mes = 0;
			if(end.getDate() < 10){
				dia = '0'+end.getDate();
			}else { dia = end.getDate();}

			if((end.getMonth()+1) < 10){
				mes = '0'+(end.getMonth()+1);
			}else { mes = (end.getMonth()+1);}

			obj["end"] = end.getFullYear()+ "-" +mes  + "-"+ dia ;

			Ext.Ajax.request({url: 'agenda/insertAgenda',
				jsonData:{'agenda':obj},
				method:'POST',
				success: function(data){
					var win = Ext.WindowManager.getActive();
					 Ext.toast({html: 'Se han añadido las vacaciones', title:'Citas', width: 200,  align: 't'});
					if (win) {
						win.close();
					}
					$('#calendar').fullCalendar('refetchEvents');
				},
				failure:function(){alert("Error")}
			 });
		}
	
	},
	
	vacacionesChange:function( obj, newValue, oldValue, eOpts){
		if(newValue == true){
			this.lookupReference('end_date').setHidden(false);
			this.lookupReference('end_date').setValue(this.lookupReference('start_date').getValue());
			this.lookupReference('end_date').setMinValue(this.lookupReference('start_date').getValue());
			this.lookupReference('title_cita').setHidden(true);
		}else{
			this.lookupReference('end_date').setHidden(true);
			this.lookupReference('title_cita').setHidden(false);
		}
	},
	
	changestartDate: function(){
		this.lookupReference('end_date').setValue(this.lookupReference('start_date').getValue());
		this.lookupReference('end_date').setMinValue(this.lookupReference('start_date').getValue());
	}
});
