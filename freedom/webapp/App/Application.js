/**
 * The main application class. A instance of this class will be created.
 * @main: First class showed to the user
 * @views: All views in the application.
 */

Free.define('App.manager.Application', {
	extends:'App.manager.Application',
	name:'App',
	
	views:['App.view.main.MainView'],
	
	main:'mainView',
	
	launch:function(){
		console.log("Web Launched!");
	}
});