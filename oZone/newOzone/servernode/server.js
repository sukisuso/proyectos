
/*
 * Server new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var http = require("http");
var url = require("url");
var log = require('bunyan').createLogger({name: 'ozone', level: 'debug'});
var domain = require('domain').create();
var erroremail = require("./email/errormail");

function iniciar(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    var get = url.parse(request.url,true).query;
    log.info("## Servicio: " + pathname + "");
    
    //#Catch Error
    domain.on('error', function(err){
        erroremail.send(err);
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("ERROR_");
        response.end();
    });

    domain.run(function(){
    	route(handle, pathname, response, get);
    });
  }

  http.createServer(onRequest).listen(8888);
  log.info("#Servidor Iniciado.");
}

exports.iniciar = iniciar;