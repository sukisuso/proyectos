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
		Free.loadViewApplication();
	});
});

Free = {};
Free.ftypeList = {};
Free.App = {};
Free.App.component = {}; // Componentes Visuales. Grid, label, button...
Free.App.layout = {}; // Componentes estructurales y layout...
Free.App.manager = {}; // Componentes de aplicacion. Models y data

Free.define = function(name, object) {

	var father = object;

	if (object.extends !== undefined) {
		father = Free.heritage(object);
	}

	Free[name] = father;
	if (father.ftype === undefined) {
		console.error("[Error] - " + object.extends + " ftype not defined");
	}
	Free.ftypeList[father.ftype] = (father.extends !== undefined) ? father.extends
			: "";

};

Free.heritage = function(object) {
	var father = Free[object.extends] !== undefined ? Free[object.extends]
			: null;
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
	var father = Free[Free.ftypeList[object.ftype]] !== undefined ? Free[Free.ftypeList[object.ftype]]
			: null;
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

Free.loadViewApplication = function() {

	if (Free['App.manager.Application'].views !== null) {
		for ( var item in Free['App.manager.Application'].views) {
			if (Free['App.manager.Application'].views[item] !== null) {
				var regex = new RegExp('\\.', 'g');
				$.getScript(Free['App.manager.Application'].views[item].replace(regex,'/')+'.js');
			}
		}
	}
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
		// var p = $('<div>').attr({class: this.class, id:this.id,
		// textContent:this.text})[0];
		return $('<p>' + this.text + '</p>').attr({
			class : this.class,
			id : this.id
		})[0].outerHTML;
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
	class : '',
	horientation : 'hPanel', // hPanel / vPanel
	items : [],
	toHtml : function() {
		var panel = $('<div>').attr({
			class : this.class,
			type : this.horientation
		})[0];

		if (this.horientation === 'hPanel') {
			var columns = $('<div>').attr({
				class : 'columns'
			})[0];
			for ( var item in this.items) {
				if (this.items[item] !== undefined) {
					var column = $('<div>').attr({
						class : 'column'
					})[0];
					var obj = Free.heritageFtype(this.items[item]);
					column.appendChild($.parseHTML(obj.toHtml())[0]);
					columns.appendChild(column);
				}
			}
			panel.appendChild(columns);
		}

		return panel.outerHTML;
	}
});
