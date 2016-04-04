/**
 * Crud View
 */

Free.define('App.view.crud.CrudView',{
	extends:'App.layout.Panel',

	ftype:'crudview',
	horientation:'hPanel', // hPanel / vPanel
	id:'crudview',
	
	
	items:[{ftype:'html', html:'<h2>CRUD VIEW</h2>'}],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});