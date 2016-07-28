/*
* Jesus Juan Aguilar -- jesusjuanaguilar@gmail.com
*
* Module to get the content of the log.
*/

var run = require('../run-server');
var fs = require('fs');

function StartPaths(app){
	
	app.post('/log/getServerLog', function(req, res) {getServerLog(req,res);});
	app.post('/log/removeServerLog', function(req, res) {removeServerLog(req,res);});
}

function getServerLog(req, res) {
	
	var filename = req.body.server_path.slice( 3 ).split('/').join('_')+ req.body.server_file;
	
	fs.readFile("out/"+filename+".log", function read(err, data) {
		if (err) {
			res.send("");
			res.end();  
		}else {
			res.send(data);
			res.end();  
		}
	});
}
		
function removeServerLog (req, res) {
	
	var filename = req.body.server_path.slice( 3 ).split('/').join('_')+ req.body.server_file;
	fs.unlink("out/"+filename+".log",function(err){
        if(err) return console.log(err);
	});  
	
	res.send(true);
	res.end(); 
} 


exports.startPaths = StartPaths;