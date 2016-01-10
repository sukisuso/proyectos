

Ext.define('Ptd.view.agenda.AgendaFestivosController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.agendafestivos',
    requires: [
        'Ext.window.MessageBox'
    ],

	init: function() {
		var store = this.lookupReference("gridFestivos").store;
		store.removeAll();
		Ext.Ajax.request({url: 'agenda/getFestivos',
			jsonData:{'year':new Date().getFullYear()},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				store.add(meData);
			},
			failure:function(){alert("Error")}
		 });
    },
	
	closeWindow:function(){
		var win = Ext.WindowManager.getActive();
					if (win) {
						win.close();
					}
	},
	changeDate:function(f, e){
		
		if(e.getKey() == e.ENTER){
			
			var year = this.lookupReference("year_reference").getValue();
			var store = this.lookupReference("gridFestivos").store;
			store.removeAll();
			Ext.Ajax.request({url: 'agenda/getFestivos',
				jsonData:{'year':year},
				method:'POST',
				success: function(data){
					var meData = JSON.parse(data.responseText);
					store.add(meData);
				},
				failure:function(){alert("Error")}
			 });
			
         }
		
	}
});
