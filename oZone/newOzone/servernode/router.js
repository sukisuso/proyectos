
/*
 * Router new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var log = require('bunyan').createLogger({name: 'ozone',  level: 'debug'});

function route(handle, pathname, response, get) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, get);
  } else {
    log.warn("## Servicio no localizado: " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 No Encontrado");
    response.end();
  }
}

exports.route = route;