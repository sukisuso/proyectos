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

