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
	});
});

Free = {};
Free.ftypeList = {};  
Free.App = {};
Free.App.component = {}; // Componentes Visuales. Grid, label, button...
Free.App.layout = {}; // Componentes estructurales y layout...
Free.App.manager = {}; // Componentes de aplicacion. Models y data

/*Function who start the application*/
Free.startApplication = function(){
	Free.loadContentApplication(Free.setViewMain, Free['App.manager.Application'].main);
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

Free.getComponent = function(type, iD) {
	var aux = Free[type];
	aux.id = iD;
	return aux;
};

Free.loadContentApplication = function(callback, param) {
	var deferred = new $.Deferred();
	var promise = deferred.promise();
	var regex = new RegExp('\\.', 'g');

	if (Free['App.manager.Application'].views !== null) {
		for ( var item in Free['App.manager.Application'].views) {
			if (Free['App.manager.Application'].views[item] !== null) {
				/* jshint ignore:start */
				promise = promise.then(function() {
		            return $.getScript(Free['App.manager.Application'].views[item].replace(regex,'/')+'.js');
		        });	
				/* jshint ignore:end */
			}
		}
	}
	
	promise.done(function() {
	   callback(param);
	});

	// Resolve the deferred object and trigger the callbacks
	deferred.resolve();
};

Free.setViewMain= function(main){
	$('.app-freedom-body').html(Free.heritageFtype({ftype:main}).toHtml());
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

/**
 * App.component
 */
Free.define('App.component.Object', {
	ftype : 'object',
	afterRender:function(){},
	toHtml : function() {
		return '<div class="columns"><div class="colum"></div></div>';
	}
});

Free.define('App.component.Label', {
	extends : 'App.component.Object',
	ftype : 'label',
	id : '',
	class : '',
	text : '',
	setValue : function(label) {
		$('#' + this.id)[0].textContent = label;
	},
	getValue : function() {
		return $('#' + this.id)[0].textContent;
	},
	toHtml : function() {
		return $('<p>' + this.text + '</p>').attr({	class : this.class,id : this.id	})[0].outerHTML;
	}
});

/**
 * App.layout
 */
Free.define('App.layout.Layout', {
	ftype : 'layout',
});

Free.define('App.layout.Panel', {
	extends : 'App.layout.Layout',
	ftype : 'panel',
	id:'',
	class : '',
	controller:'',
	horientation : 'hPanel', // hPanel / vPanel
	items : [],
	getItems:null,
	setItems:null,
	add:function(item){
		
	},
	toHtml : function() {
		var obj, column, columns, item;
		var panel = $('<div>').attr({class : this.class,type : this.horientation,id:this.id})[0];
		if (this.horientation === 'hPanel') {
			columns = $('<div>').attr({	class : 'columns'})[0];
			for ( item in this.items) {
				if (this.items[item] !== undefined) {
					if(this.items[item].ftype === undefined){console.error("Declare the ftype of the element");}
					column = $('<div>').attr({class : 'column'})[0];
					obj = Free.heritageFtype(this.items[item]);
					column.appendChild($.parseHTML(obj.toHtml())[0]);
					columns.appendChild(column);
				}
			}
			panel.appendChild(columns);
		}else{
			for ( item in this.items) {
				if (this.items[item] !== undefined) {
					if(this.items[item].ftype === undefined){console.error("Declare the ftype of the element");}
					columns = $('<div>').attr({	class : 'columns'})[0];
					column = $('<div>').attr({class : 'column'})[0];
					obj = Free.heritageFtype(this.items[item]);
					column.appendChild($.parseHTML(obj.toHtml())[0]);
					columns.appendChild(column);
					panel.appendChild(columns);
				}
			}
		}
		return panel.outerHTML;
	}
});
