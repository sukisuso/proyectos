// jshint ignore: start 
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






/**
 * App.component
 */

Free.define('App.component.Object', {
	ftype : 'object',
	id : '',
	class : '',
	style:'',
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
	handler:function(){console.log("click");},
	label:'',
	toHtml : function() {
		var b = $('<a>'+this.label+'</a>').attr({class : 'button ' + this.class, style:this.style, id:this.id, onclick:'Free.events.clickers["#button-"+this.id]();'})[0];
		Free.events.clickers['#button-'+this.id] = this.handler;
		return b.outerHTML;
	}
});


Free.define('App.component.Field', {
	extends : 'App.component.Object',
	ftype:'field',
	label:null,
	options:'',
	type:'',
	toHtml: function(){
		columns = $('<div>').attr({	class : 'columns ', style:this.style})[0];
		
		if(this.label !== null){
			var obj;
			column = $('<div>').attr({class : 'column'})[0];
			obj = Free.heritageFtype({ftype:'label', text:this.label});
			column.appendChild($.parseHTML(obj.toHtml())[0]);
			columns.appendChild(column);
		}
		column = $('<div>').attr({class : 'column'})[0];
		column.appendChild($.parseHTML($('<input>').attr({type:this.type, class:"input easyui-validatebox " + this.class ,id:this.id, 'data-options':this.options})[0].outerHTML)[0]);
		columns.appendChild(column);
		
		
		return  columns.outerHTML;
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
		var panel = $('<div>').attr({class : this.class,type : this.horientation,id:this.id, style:'padding:50;'})[0];
		if (this.horientation === 'hPanel') {
			columns = $('<div>').attr({	class : 'columns'})[0];
			for ( item in this.items) {
				if (this.items[item] !== undefined) {
					if(this.items[item].ftype === undefined){console.error("Declare the ftype of the element");}
					if(this.items[item].ftype === 'window'){console.error("The windows just can be opened by Free.createWindow");}
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

Free.define('App.layout.Window', {  
	extends : 'App.layout.Layout',
	ftype : 'window',
	panel:null,
	title:'',
	width:0, 
	options:'',
	height:0,
	show : function() {
		var content = "";
		var window = $('<div id="win'+this.id+'" class="'+this.class+'" style=" overflow-x:hidden;width:'+this.width+'px;height:'+this.height+'px"></div>')[0];
		if(this.panel !== null){
			var obj = Free.heritageFtype({ftype:this.panel});
			content = obj.toHtml();
		}
		
		$('.app-freedom-body')[0].appendChild(window);
		
		$('#win'+this.id).window({
		    content:content,
		    title:this.title,
		    modal:true,
		    overflow: 'hidden'
		});
	}
});

