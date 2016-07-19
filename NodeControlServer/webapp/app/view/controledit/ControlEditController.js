Ext.define('App.view.controledit.ControlEditController', {
    extend: 'Ext.app.ViewController',

    
    config : {
        control :  {
          'controledit'      : {
            //afterrender : 'loadUserInfo',
            }    
        }
    },
    alias: 'controller.controledit',
    
    

  addServer:function() {
     var fserverield = this.lookupReference("tag_server").getValue(); 
     var rootfield = this.lookupReference("tag_root").getValue();
     var urlfield = this.lookupReference("tag_url").getValue();
     var portfield = this.lookupReference("tag_port").getValue();

     if(fserverield == "" || fserverield == null || rootfield == "" || rootfield == null
        || urlfield == "" || urlfield == null || portfield == "" || portfield == null){
      return;
     }

     Ext.Ajax.request({url: 'servers/insertServer',
      params: {'server_name': fserverield, 'server_path': urlfield, 'server_file': rootfield, 'server_port':portfield},
      method:'POST',
      success: function(data){
         var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
      }
     });
  },

  closeWindow: function(){
    var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
  },

  showHidePathFields: function (f,e){

    //value.replace(/C:\\fakepath\\/g, '')
    if(e.getKey()==e.ENTER){  

      var filefield = this.lookupReference("tag_path"); 
      var urlfield = this.lookupReference("tag_url");
      var rootfield = this.lookupReference("tag_root");
      var buttonundo = this.lookupReference("tag_undo");
      filefield.hide();
      urlfield.show();
      rootfield.show();
      buttonundo.show();

      
      var vl = filefield.getValue().split("\\").join("/");
      rootfield.setValue(vl.split("/")[vl.split("/").length-1].substring(0,vl.split("/")[vl.split("/").length-1].length-3));
      
      var result = "";
      vl.split("/").forEach(function (value){
          if(value != vl.split("/")[vl.split("/").length-1]){
            result += value + "/";
          }else{
            urlfield.setValue(result);
          }
      });
    }
  },

  cleanPath : function () {

      var filefield = this.lookupReference("tag_path"); 
      var urlfield = this.lookupReference("tag_url");
      var rootfield = this.lookupReference("tag_root");
      var buttonundo = this.lookupReference("tag_undo");
      filefield.show();
      urlfield.hide();
      rootfield.hide();
      buttonundo.hide();
      filefield.setValue("");
      urlfield.setValue("");
      rootfield.setValue("");
  }
});