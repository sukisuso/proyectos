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


Free.define('App.component.Combobox', {
	extends : 'App.component.Object',
	ftype:'combobox',
	items:[],
	showValue:'',
	realValue:'',
	
	toHtml: function(){
		var selector = $('<select>').attr({ class:"easyui-combobox is-primary" + this.class ,id:this.id, 'data-options':this.options, style:this.style})[0];
		if(this.showValue !=='' && this.realValue !== ''){
			for (var item in this.items) {
				if(this.items[item] !== undefined){
					selector.appendChild($('<option>'+this.items[item][this.showValue]+'</option>').attr({ value: this.items[item][this.realValue]})[0]);
				
				}
			}
		}
		
		return selector.outerHTML;
	}
});