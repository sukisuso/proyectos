/**
 *  Login view
 */

Free.define('App.view.login.Login',{
	extends:'App.layout.Panel',

	ftype:'login',
	horientation:'vPanel', // hPanel / vPanel
	id:'login',
	
	items:[{ftype:'field', label:'Name', id:'userId', style:'padding: 10px 25px 0px 25px'}, 
	       {ftype:'field', label:'Password', id:'passId', style:'padding: 0px 25px 0px 25px', type:'password'},
	       {ftype:'button', label:'Login', class:'is-primary', style:'margin: 0px 25px 0px 25px', 
	    	   handler:function(){
	    		   Free.setViewMain('alternativeview');
	    	   }   
	       }],
	
	afterRender:function(){
		console.log('afterRender Works');
	}
});