/*
 * index 
 * Jesús Juan Aguilar 12/2015
 * 
 * */


var express = require('express');
var router = require('./servernode/router');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     
  extended: true
}));

router.redirect(app);


app.listen(3000);
console.log("Server listening on 3000");

