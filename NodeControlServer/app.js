/*
 * App.js Node Server Starter point
 * Jesus Juan Aguilar 07/2016
 * */

var express = require('express');
var router = require('./servernode/router');
var bodyParser = require('body-parser');
var runs = require ('./servernode/run-server');
var helmet = require('helmet');
var app = express();
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8888);


app.use(express.static(__dirname + '/webapp'));
app.use(helmet());
app.disable('x-powered-by');
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     
  extended: true
}));

router.redirect(app);

app.listen(port);
console.log('NodeControlServer running at http://127.0.0.1:'+port);


/**
 * The way to run and kill servers!
 * */
//var id = runs.start('D:/Documentos/GitHub/proyectos/partidas', 'index.js');
//runs.alive(id);
//runs.kill(id);