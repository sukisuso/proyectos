
/*
 * errormail new_ozone v_1.0
 * Jesús Juan Aguilar 8/2015
 * */

var nodemailer = require("nodemailer");
var log = require('bunyan').createLogger({name: 'ozone'});

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ozonethegame@gmail.com',
        pass: ###########################
    }
});

var mailOptions = {
    from: 'ozone <ozonethegame@gmail.com>', // sender address
    to: 'jesusjuanaguilar@gmail.com', // list of receivers
    subject: '[ERROR] oZone send ', // Subject line
    text: 'Error', // plaintext body
    html: '' // html body
};


function send(log){
	
	mailOptions.html = log.message+"<br><br>";
	mailOptions.html += log.stack;
	
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    log.warn('Message sent: ' + info.response);

	});
	transporter.close();
}

exports.send = send;