

Ext.define('Ptd.view.partida.PartidaController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.partida',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            'partida'      : {
                afterRender : 'loadData',
            },
            'partidawindow'      : {
                editClose : 'doSearch'
            }
        }
    },
	
	loadData: function() {
       //añadir tabs necesarios. 
		
		var grid = this.lookupReference("dataGrid"); 
		grid.mask();
		var me = this.calculateTotal;
		var idPartida = this.view.id_crud_partida;

		Ext.Ajax.request({url: 'partidas/getAllPartidas',
			params: {'idPartida': idPartida},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				me(meData);
				grid.unmask();
			}
		 });
    },
	
	 CellRenderCantidad: function(record,metadata, store, rowIndex, collIndex){   
        return record+ " €";
    },
	
	 CellRender: function(record,metadata, store, rowIndex, collIndex){

		 if(store.data.tipo === "Ingreso"){
			  metadata.style= "color:#3ADF00;";
		 } else if(store.data.tipo === "Gasto"){
			 metadata.style= "color:#DF0101;";
		 }else if (store.data.tipo === "Reserva") {
			 metadata.style= "color:#0101DF;";
		 } else {
			 metadata.style= "color:#FF8000;";
		 }
        return record;
    },
	

	addEntrada: function(){
		Ext.create('Ext.window.Window', {
            title: "Añadir Entrada",
            height: 300,
            width: 305,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype: 'partidawindow',
				id_crud_partida:this.view.id_crud_partida
            }, listeners: {
                   close: function (wnd, eOpts) {
                      var part = Ext.getCmp('partida');
					  part.controller.doSearch();
                   }
			}
        }).show();
	},
	
	doSearch: function(){
		var grid = this.lookupReference("dataGrid"); 
		grid.mask();
		var me = this.calculateTotal;
		grid.store.removeAll();
		var idPartida = this.view.id_crud_partida;
		
		Ext.Ajax.request({url: 'partidas/getAllPartidas',
			params: {'idPartida': idPartida},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				me(meData);
				grid.unmask();
			}
		 });
	},
	
	calculateTotal : function(grid){
		var TotalDisponible = 0;
		var TotalGastado = 0;
		var TotalReservdado = 0;
		var TotalTotal = 0;
		
		grid.forEach(function(value){
			if(value.tipo == "Ingreso"){
				TotalDisponible+=value.cantidad;
			}else if (value.tipo == "Gasto"){
				TotalDisponible-=value.cantidad;
				TotalGastado+= value.cantidad;
			}else if (value.tipo == "Reserva"){
				TotalDisponible-=value.cantidad;
				TotalReservdado+= value.cantidad;
			}else {
				TotalReservdado-=value.cantidad;
				TotalDisponible+=value.cantidad;
			}
		});
		
		Ext.getCmp('totalDisponibleField').setValue(TotalDisponible+ " €"); 
		Ext.getCmp('totalGastadoField').setValue(TotalGastado+ " €"); 
		Ext.getCmp('totalReservadoField').setValue(TotalReservdado+ " €"); 
		TotalTotal = TotalDisponible+ TotalReservdado;
		Ext.getCmp('totalTotalField').setValue(TotalTotal + " €")
	},
	
	
	deleteRow(){
		var grid = this.lookupReference("dataGrid"); 
		var id = grid.getSelection()[0].data._id;
		grid.mask();
		var me = this.calculateTotal;
		var idPartida = this.view.id_crud_partida;
		
		if(id != null)
		Ext.Msg.show({
			title:'¿Eliminar entrada?',
			message: '¿Seguro que desea eliminar la entrada?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					Ext.Ajax.request({url: 'partidas/deletePartida',
						params: {'_id': id},
						method:'POST',
						success: function(data){
							grid.store.remove();
							Ext.Ajax.request({url: 'partidas/getAllPartidas',
								params: {'idPartida': idPartida},
								method:'POST',
								success: function(data){
									var meData = JSON.parse(data.responseText);
									grid.store.loadData(meData);
									me(meData);
									grid.unmask();
								}
							 });
						},
					 });
				}
			}
		});
	},
	
	editRow(){
		var grid = this.lookupReference("dataGrid"); 
		var data = grid.getSelection()[0].data;
		var idPartida = this.view.id_crud_partida;
		
		if(id != null){
			grid.mask();
			Ext.create('Ext.window.Window', {
				title: "Añadir Entrada",
				height: 300,
				width: 305,
				modal:true,
				layout: 'fit',
				items: {  // Let's put an empty grid in just to illustrate fit layout
					xtype: 'partidawindow',
					id_crud_partida:this.view.id_crud_partida,
					datos: data,
					isEdit: true
				}, listeners: {
					   close: function (wnd, eOpts) {
						  var part = Ext.getCmp('partida');
						  part.controller.doSearch();
					   }
				}
			}).show();
		}
	},
	
	filter:function(){
		//startDate
		var tag = this.lookupReference('filter_tag').getValue();
		var startDate = this.lookupReference('filter_start_Date').getValue();
		var endDate = this.lookupReference('filter_end_Date').getValue();
		var grid = this.lookupReference("dataGrid"); 
		var me = this.calculateTotal;
		grid.mask();
		
		var obj={};
		obj['_tag'] ="";
		
		if(tag != null && tag != "" ){
			obj['_tag'] = tag;
		}
		
		if(startDate != null ){
			obj['startDate'] = startDate;
		}
		
		if(endDate != null ){
			obj['endDate'] = endDate;
		}
		
		Ext.Ajax.request({url: 'partidas/filterPartida',
			params: obj,
			method:'POST',
			success: function(data){
				grid.store.remove();
				var meData = JSON.parse(data.responseText);
				grid.store.loadData(meData);
				me(meData);				
				grid.unmask();
			}
		 });
	}
});
