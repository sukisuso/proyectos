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
	id : '',
	class : '',
	afterRender:function(){},
	toHtml : function() {
		return '<div></div>';
	}
});

Free.define ('App.component.Html', {
	extends : 'App.component.Object',
	ftype:'html',
	html:'',
	toHtml: function(){
		return "<div class='"+this.class+"'>"+this.html+"</div>";
	}
});

Free.define('App.component.Label', {
	extends : 'App.component.Object',
	ftype : 'label',
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

Free.define('App.component.Button', { //Clases -- is-primary is-info is-success is-warning is-danger
	extends : 'App.component.Object',
	ftype:'button',
	handler:function(){},
	label:'',
	toHtml : function() {
		return ;
	}
});


/**
 * App.layout
 */
Free.define('App.layout.Layout', {
	ftype : 'layout',
	id:'',
	class : '',
	controller:'',
	items : []
});

Free.define('App.layout.Panel', {
	extends : 'App.layout.Layout',
	ftype : 'panel',
	horientation : 'hPanel', // hPanel / vPanel
	getItems:null,
	setItems:null,
	add:function(item){
		var x = $('#' + this.id)[0];
		obj = Free.heritageFtype(item);
		column = $('<div>').attr({class : 'column'})[0];
		column.appendChild($.parseHTML(obj.toHtml())[0]);
		$(x).children(".columns")[0].appendChild(column);
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
