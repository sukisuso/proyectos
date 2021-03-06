/**
 * jesusjuanaguilar@gmail.com 2016!
 * 
 *  Module to run & kill servers
 * */

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;    
var fs = require('fs'); 
var servers = {};

function start(path,file, res, port){
	
	port = typeof port  !== 'undefined' ? port : 3000;

	console.log('start: '+path+ file+'.js:'+port);
	var child = exec(commandStartByOS(port, path, file),function(error, stdout, stderr) {
	});

	var filename = path.slice( 3 ).split('/').join('_')+ file;
	
	child.stdout.on('data', 
	    function (data) {
			fs.appendFile("out/"+filename+".log", data, function (err) {
				if(err != null)
					console.log("error saving log");
			});	
	    }
	);
	
	res.send(""+child.pid);
	res.end();
}

function kill(id){
	console.log('kill: '+id);
	
	
	if(isWindowsOS()){
		spawn("taskkill", ["/pid", id, '/f', '/t']);
	}else if(isLinuxsOS()) {
		spawn("pkill", ["-TERM","-P", id]);
	}
}

function alive(id, response){
	var child = spawn(comandProcessByOS ());
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

/*
* Independent command to the OS
*/
function commandStartByOS(port, path, file){

	if(isWindowsOS()){
		return 'set PORT='+port+' & cd /D '+path+' & node '+file;
	}else if(isLinuxsOS()) {
		return 'cd '+path+ ' && PORT='+port + ' node ' + file ;
	}
}

function comandProcessByOS () {
	if(isWindowsOS()){
		return 'tasklist';
	}else if(isLinuxsOS()) {
		return 'ps';
	}
}

function isWindowsOS(){
	return /^win/.test(process.platform);
}

function isLinuxsOS(){
	return /^linux/.test(process.platform);
}

exports.start = start;
exports.servers = servers;
exports.kill = kill;
exports.alive = alive;