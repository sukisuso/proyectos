/**
 * Main View
 */

Free.define('App.view.main.MainView',{
	extends:'App.layout.Panel',

	ftype:'mainView',
	horientation:'hPanel', // hPanel / vPanel
	id:'Father',
	
	
	items:[{ftype:'panel', horientation:'vPanel',  id:'OnePanel',
			items:[{ftype:'label', text: "Uno"},{ftype:'label', text: "Dos"},{ftype:'label', text: "Tres"},{ftype:'label', text: "Cuatro"}]
	}, {ftype:'panel', horientation: "hPanel", id:'TwoPanel',
			items:[{ftype:'label', text:'Panel2 Uno'}, {ftype:'label', text:'Panel2 Dos'},{ftype:'label', text:'Panel2 Tres'}]
	}, {ftype:'panel', horientation: "vPanel", id:'TwoPanel',
			items:[{ftype:'label', text:'Panel3 Uno'}, {ftype:'label', text:'Panel3 Dos'},{ftype:'label', text:'Panel3 Tres'}]
	}],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});