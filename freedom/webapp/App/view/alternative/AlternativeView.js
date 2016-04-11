/**
 * Alternative Main View
 */

Free.define('App.view.alternative.AlternativeView',{
	extends:'App.layout.Panel',

	ftype:'alternativeview',
	horientation:'hPanel', // hPanel / vPanel
	id:'alternative',
	
	
	items:[{ftype:'combobox',style:'width:200px;',items:[{name:'Castellano', id:1},{name:'Ingles', id:2},{name:'Frances', id:3}], showValue:'name', realValue:'id'}],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});