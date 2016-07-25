/**
 * jesusjuanaguilar@gmail.com 2016!
 * 
 *  Module to run & kill servers
 * */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;    
var servers = {};

function start(path,file, res, port){
	
	 port = typeof port  !== 'undefined' ? port : 3000;

	console.log('start: '+path+ file+'.js:'+port);
	var child = exec('set PORT='+port+' & cd /D '+path+' & node '+file,function(error, stdout, stderr) {
	});

	res.send(""+child.pid);
	res.end();
}

function kill(id){
	console.log('kill: '+id);
	spawn("taskkill", ["/pid", id, '/f', '/t']);
}

function alive(id, response){
	var child = spawn('tasklist');
	var output = ""; 
	
	child.stdout.on('data', 
	    function (data) {
			output += data;
	    }
	);
	
	child.stdout.on('end', function (){
		if(output.indexOf(id) > -1){
			response.send(true);
			response.end();
		}else{
			response.send(false);
			response.end();
		}
	});
}

exports.start = start;
exports.servers = servers;
exports.kill = kill;
exports.alive = alive;