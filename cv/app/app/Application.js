/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',
    
    name: 'App',

	views: [
		'App.view.datauser.DataUser','App.view.datauser.DataUserEdit',
		'App.view.estudios.Estudios','App.view.estudios.EstudiosEdit',
		'App.view.estudios.Cursos',
		'App.view.experiencia.Experiencia','App.view.experiencia.ExperienciaEdit',
		'App.view.experiencia.Practicas',
		'App.view.aditionalInfo.AditionalInfo', 'App.view.aditionalInfo.AditionalInfoEdit'
	],
	
    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
		
		
		Ext.Loader.loadScript({
			 url: '/app/framework/quebec-all-debug.js'
			,onLoad: function(){
				var supportsLocalStorage = Ext.supports.LocalStorage,
				loggedIn;
				if (!supportsLocalStorage) {
				Ext.Msg.alert('Your Browser Does Not Support Local Storage');
				return;
				}
				loggedIn = localStorage.getItem("AppLoggedIn");
				Ext.widget(loggedIn ? 'app-main-dev' : 'login');
			}
			,onError: function(){
				Ext.Msg.alert('Error loading Framework.');
			}
		});
    }
});
