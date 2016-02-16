Ext.define('App.framework.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login',
	onLoginClick: function(){
		/**/
		
		var me = this;
		var form = this.lookupReference('form').getValues();
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