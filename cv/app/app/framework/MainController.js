/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.framework.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

	config : {
        control :  {
      		'app-main-dev'      : {
                render : 'loadUserInfo',
            }    
        }
    },
    alias: 'controller.main-dev',

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
	
	loadUserInfo:function(){
		new Ext.Panel(
		   {
			   renderTo: Ext.get('usuarioInfo'),
			   width: 300,
			   height: 25,
			   bodyStyle:{"background-color":"#CED8F6"},
			   border:true,
			   layout:'column',
			   items:[{
				   xtype:'image',
				   src:'/resources/img/icons/userInfo.png',
				   margin:'3 0 0 5',
				   
			   },{
				   xtype:'label',
				   text:localStorage.AppLoggedName,
				   margin:'4 0 0 15',
				    columnWidth: 0.85
			   },{
				   xtype:'button',
				    columnWidth: 0.08,
				   iconCls:'offCls',
				   handler:function(){
					   Ext.Msg.show({
						title:'Cerrar sesión',
						message: '¿Desea cerrar la sesión?',
						buttons: Ext.Msg.YESNO,
						icon: Ext.Msg.QUESTION,
						fn: function(btn) {
							if (btn === 'yes') {
								delete localStorage.AppLoggedName;
							    delete localStorage.AppLoggedId;
							    delete localStorage.AppLoggedIn;
							    location.reload();
							}
						}
					});
				   }
			   }]
		   }
	   );
	}
});
