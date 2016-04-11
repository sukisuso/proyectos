/**
 * freedom-all-debug.js :: Javascript Framework Jesus Juan Aguilar 02/04/2016
 * require: jquery!
 * 
 * @version: 0.0.1
 */

var Free;

// Start Freedom Aplication
$(document).ready(function() {
	$.getScript("App/Application.js").done(function(script) {
		Free.startApplication();
	}).fail(function(){console.error("[!App/Application.js] Main Application File must be in App folder");});
});

Free = {};
Free.ftypeList = {};  
Free.App = {};
Free.App.component = {}; // Componentes Visuales. Grid, label, button...
Free.App.layout = {}; // Componentes estructurales y layout...
Free.App.manager = {}; // Componentes de aplicacion. Models y data
Free.events = {};
Free.events.clickers = {};

/*Function who start the application*/
Free.startApplication = function(){
	Free.loadContentApplication(Free.setSystemViewMain, Free['App.manager.Application'].main);
};

Free.define = function(name, object) {

	var father = object;

	if (object.extends !== undefined) {
		father = Free.heritage(object);
	}

	Free[name] = father;
	if (father.ftype === undefined) {
		console.error("[Error] - " + name + " ftype not defined");return;
	}
	if (Free.ftypeList.hasOwnProperty(father.ftype) && father.ftype!== "aplication" ) {
		console.error("[Error] - " + name + " ftype already defined");return;
	}
	Free.ftypeList[father.ftype] = name;

};

Free.heritage = function(object) {
	var father = jQuery.extend( {}, Free[object.extends] !== undefined ? Free[object.extends]	: null);
	if (father === null) {
		console.error("[Error] - " + object.extends + " not exist");
	}
	for ( var properties in object) {
		if (object.hasOwnProperty(properties)) {
			father[properties] = object[properties];
		}
	}
	return father;
};

Free.heritageFtype = function(object) {
	var father = jQuery.extend({}, Free[Free.ftypeList[object.ftype]] !== undefined ? Free[Free.ftypeList[object.ftype]]	: null);
	
	if (father === null) {
		console.error("[Error] - " + object.extends + " not exist");
	}
	for ( var properties in object) {
		if (object.hasOwnProperty(properties)) {
			father[properties] = object[properties];
		}
	}
	return father;
};

Free.getComponent = function(ftype, iD) {
	var aux = Free[Free.ftypeList[ftype]];
	aux.id = iD;
	return aux;
};

Free.loadContentApplication = function(callback, param) {

	if (Free['App.manager.Application'].views !== null) {
		var regex = new RegExp('\\.', 'g');
		var deferreds = [];

		for ( var item in Free['App.manager.Application'].views) {
			if (Free['App.manager.Application'].views[item] !== null) {
				deferreds.push($.getScript(Free['App.manager.Application'].views[item].replace(regex,'/')+'.js'));
			}
		}
		
		$.when.apply(null, deferreds).done(function() {
			callback(param);
		});
	}
};

Free.setSystemViewMain= function(main){
	if (main !== ''){
		$('.app-freedom-body').html(Free.heritageFtype({ftype:main}).toHtml());
	}else{
		$('.app-freedom-body').html("");
	}
	Free.loadEvents();
};

Free.setViewMain= function(main){
	if (main !== ''){
		$('.app-freedom-body').html(Free.heritageFtype({ftype:main}).toHtml());
	}else{
		$('.app-freedom-body').html("");
	}
};
Free.loadEvents = function(){
	
	Free['App.manager.Application'].launch();
};

Free.createWindow= function(window){
	
	var relWindow = Free.heritageFtype(window);
	relWindow.show();
};


/**
 * App.manager
 */
Free.define('App.manager.Application', {
	ftype : 'aplication',
	launch : function() {
	},
	views : [],
	name : 'App',
	main : ''
});





