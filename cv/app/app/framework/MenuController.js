
Ext.define('App.framework.MenuController', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.MenuDevBar',
    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
            
        }
    },
	
	clickElement: function(el) {
		if(el.menuItemId){
			
			var tabpanel = Ext.ComponentQuery.query('#tabpanel-Aplication-dev')[0];
			var tab = {	
						title:el.text,
					   	xtype:el.menuItemId,
						iconCls:el.iconCls, 
						closable:true,
						style : 'background-color:#D8D8D8;'
					};
			tabpanel.add(tab);
			tabpanel.setActiveItem(tabpanel.items.items.length-1);
		}
	},
	
	clickSplit:function(el,a,b,c,d){
		el.showMenu();
	}
});
