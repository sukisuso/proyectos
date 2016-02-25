
/*
*	Quebec FW Javascript	
*	Jesús Juan Aguilar	
*	2016
*/


/*
* Quebec Login
*/
Ext.define("App.framework.Login",{
	extend: 'Ext.window.Window',
	xtype: 'login',
	requires: [
		'Ext.form.Panel'
	],
	controller: 'login',
	bodyPadding: 10,
	title: 'Login Window',
	closable: false,
	autoShow: true,
	items: {
		xtype: 'form',
		reference: 'form',
		items: [{
			xtype: 'textfield',
			name: 'username',
			fieldLabel: 'Username',
			allowBlank: false,
			listeners: {
				 specialkey:'onLoginClick'
			}
		}, {
			xtype: 'textfield',
			name: 'password',
			inputType: 'password',
			fieldLabel: 'Password',
			allowBlank: false,
			listeners: {
				 specialkey:'onLoginClick' 
			}
		}, {
			xtype: 'displayfield',
			hideEmptyLabel: false,
			reference:'msg_label_login',
			value: 'Enter any non-blank password'
		}],
		buttons: [{
			text: 'Login',
			formBind: true,
			listeners: {
				click: 'onLoginClick'
			}
		}],
		
	},
	listeners: {
		 specialkey: function(f,e){  
                if(e.getKey()==e.ENTER){  
                    console.log("I hit enter!"); 
                }  
            }  
	}
});


/*
* Quebec Login Controller
*/

Ext.define('App.framework.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login',
	onLoginClick: function(){
		
		var me = this;
		var form = this.lookupReference('form').getValues();
		if(!form.username )
			return;
		if(!form.password)
			return;
		
		Ext.Ajax.request({url: 'fwk/login',
			params: {'login': form.username, pass:form.password},
			method:'POST',
			success: function(data){
				var meData = JSON.parse(data.responseText)[0];
				localStorage.setItem("AppLoggedIn", true);
				localStorage.setItem("AppLoggedId", meData._id);
				localStorage.setItem("AppLoggedName", meData.name+" "+meData.surname1+ " "+ meData.surname2);
				me.getView().destroy();
				Ext.widget('app-main-dev');
			},
			failure:function(){
				//msg_label_login
				me.lookupReference('msg_label_login').setHtml("<font color='red'> *** Error login/password.</font>");
			}
		 });
	}
});


/*
* Quebec Main
*/

Ext.define('App.framework.Main', {
    extend: 'Ext.container.Container',
    /*requires: [
        //'App.framework.MainController',
        //'App.framework.MainModel'
    ],*/

    xtype: 'app-main-dev',
    plugins: 'viewport',
    controller: 'main-dev',
    viewModel: {
        type: 'main-dev'
    },

    layout: {
        type: 'border',
		align:'center',
		pack: 'center'
    },

    items: [{
        xtype: 'panel',
        region: 'north',
       html: '<img src="/resources/img/logocv.png" height="50" >',
		bodyStyle:{"background-color":"#D8D8D8"}, 
		bbar:[{
			xtype:'MenuDevBar',
		}]
    },{
		region: 'center',
        xtype:'tabpanel',
		itemId:'tabpanel-Aplication-dev',
		items:[
			{
				title:'Indice'
			}
		]
    }]
});


/*
* Quebec Main Controller
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
		
		
		//LOAD IMAGE USER
		
		new Ext.Img(
		   {
			   renderTo: Ext.get('usuarioImg'),
			   width: 50,
			   height: 50,
			   id:'user_foto_id_look',
			   bodyStyle:{"background-color":"#CED8F6"},
			   border:true,
			   src:'/resources/img/nouser.png',
			   listeners:{
				   el:{
					  click:function(){
						  Ext.create('Ext.window.Window', {
            				title: "Subir foto",height: 100, width: 250,layout: 'fit',
							items: {  xtype: 'fileupdatepanel'}}).show();}
				   }
			   }
		   }
		);
	}
});


/*
* Quebec Main Model
*/

Ext.define('App.framework.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main-dev',

    data: {
        name: 'App'
    }

    //TODO - add data, formulas and/or methods to support your view
});


/*
* Quebec Menu
*/

Ext.define('App.framework.Menu', {
    extend: 'Ext.toolbar.Toolbar',
  /*  requires: [
        //'App.framework.MenuController'
       /* 'Ptd.view.main.MainModel'*/
    //],
    xtype: 'MenuDevBar',
    layout: {
        type: 'hbox',
    },
	controller:'MenuDevBar',
	
	items: [{
            xtype:'splitbutton',
            text: 'Mantenimiento',
            iconCls: 'personalCls',
			handler:'clickSplit',
            menu: [{
				text: 'Informacion Personal',
				handler:'clickElement',
				iconCls:'infCls',
				menuItemId:'datauser'
			},{text:'Mantenimiento de Usuarios', iconCls:'usersCls'}]
        },{
            xtype:'splitbutton',
            text: 'Estudios',
            iconCls: 'estudiosCls',
			handler:'clickSplit',
            menu: [{
						text: 'Formacion', 
						iconCls:'schoolCls',
						handler:'clickElement',
						menuItemId:'estudios'
					}, {
						text:'Cursos',
						iconCls:'cursosCls',
						handler:'clickElement',
						menuItemId:'cursos'
					}
				  ]
        },{
			xtype:'splitbutton',
            text: 'Experiencia Laboral',
            iconCls: 'workCls',
			handler:'clickSplit',
			menu:[{
						text:'Experiencia Labora',
						iconCls:'expCls',
						handler:'clickElement',
						menuItemId:'experiencia'
					},{
						text:'Practicas',
						iconCls:'practCls',
						handler:'clickElement',
						menuItemId:'practicas'
					  }]
        },{
			xtype:'splitbutton',
            text: 'Informacion Adicional',
            iconCls: 'infoCls',
			handler:'clickSplit',
            menu: [{text: 'Informacion Adicional',iconCls:'informationCls',handler:'clickElement',menuItemId:'aditionalInfo'},{
				text:'Skills', iconCls:'skillsCls'
			}]
        },{
            text: 'Exportar',
            iconCls: 'pdfCls',
			handler: function(){
				Ext.getBody().mask("Loading...");
				Ext.Ajax.request({url: 'pdf/getCV',
					params: {'_id': localStorage.AppLoggedId},
					method:'POST',
					success: function(data){
						Ext.getBody().unmask();
						var win = window.open("/pdfOutput/"+data.responseText, '_blank');
  						win.focus();
					},
					failure:function(){
						Ext.getBody().unmask();
						Ext.Msg.alert('Error', 'Contacte con el administrador');
					}
				 });
			}
        },{
            text: 'Search',
			iconCls:'searchCls'
        }]
});


/*
* Quebec Menu Controller
*/

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


Ext.define('App.framework.FileUpdatePanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        //'App.view.datauser.DataUserEditController'
       /* 'Ptd.view.main.MainModel'*/
    ],
    xtype: 'fileupdatepanel',
	//controller:'datauseredit',
	border:true,
    items: [{
        xtype: 'filefield',
        name: 'photo',
        fieldLabel: 'Photo',
		padding:'15 15 15 15',
        labelWidth: 50,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: 'Foto'
    }],
	bbar:['->',{xtype:'button', text:'Subir', handler:function(){debugger}}]
});
