/**
 * Main View
 */

Free.define('App.view.main.MainView',{
	extends:'App.layout.Panel',

	ftype:'mainView',
	horientation:'hPanel', // hPanel / vPanel
	id:'Father',
	class:'is-primary',
	
	
	items:[{ftype:'label',text:'hi'}],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});