
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Server = new Schema({
	    name: { type: String, required: true },
	    path: { type: String, required: true },
	    file: { type: String, required: true },
	    port: { type: Number, required: true }
	});

    return mongoose.model('Server', Server);
};