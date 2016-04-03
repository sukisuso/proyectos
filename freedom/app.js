/*
 * index of freedom
 * Jesus Juan Aguilar 31/03/2016
 * */


var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/webapp'));
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     
  extended: true
}));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
	res.end();
});

app.listen(3000);
console.log("Freedom server is listening on 3000");


