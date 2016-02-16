Ext.define("App.framework.Login",{
	extend: 'Ext.window.Window',
	xtype: 'login',
	requires: [
		'App.framework.LoginController',
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
			allowBlank: false
		}, {
			xtype: 'textfield',
			name: 'password',
			inputType: 'password',
			fieldLabel: 'Password',
			allowBlank: false
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
		}]
	}
});