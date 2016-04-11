/**
 * The main application class. A instance of this class will be created.
 * @main: First class showed to the user
 * @views: All views in the application.
 */

Free.define('App.manager.Application', {
	extends:'App.manager.Application',
	name:'App',
	
	views:['App.view.main.MainView', 'App.view.alternative.AlternativeView', 'App.view.crud.CrudView',
	       'App.view.login.Login'],
	
//	main:'mainView',
	
	launch:function(){
		console.log("Web Launched!");
		Free.createWindow({
			ftype:'window',
			id:'login-window',
			panel:'login',
			title:'Login',
			width:400,
		    height:300
		});
	}
});