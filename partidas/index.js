/*
 * index partidas
 * Jesús Juan Aguilar 12/2015
 * 
 * */


var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 3000);

app.use(express.static(__dirname + '/app'));
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     
  extended: true
}));

router.redirect(app);


app.listen(port);
console.log("Server listening on " + port);

