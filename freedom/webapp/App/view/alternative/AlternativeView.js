/**
 * Alternative Main View
 */

Free.define('App.view.alternative.AlternativeView',{
	extends:'App.layout.Panel',

	ftype:'alternativeview',
	horientation:'hPanel', // hPanel / vPanel
	id:'alternative',
	
	
	items:[{ftype:'html', html:'<h2>Hipe</h2>'}],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});