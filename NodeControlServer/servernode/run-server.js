/**
 * jesusjuanaguilar@gmail.com 2016!
 * 
 *  Module to run & kill servers
 * */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;    
var servers = {};

function start(path,file){
	
	console.log('start: '+path);
	var child = exec('cd /D '+path+' & node '+file,function(error, stdout, stderr) {
	   console.log('kill: ' + path);
	});

	servers[child.pid] = child;
	return child.pid;
}

function kill(id){
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
			console.log("isAlive");
		}else{
			console.log("isDead");
		}
	});
}

exports.start = start;
exports.servers = servers;
exports.kill = kill;
exports.alive = alive;