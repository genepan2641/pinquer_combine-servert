var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var relationship = require('mongoose-relationship');

var schema = new mongoose.Schema({
	title: String,
	content: String,
	createAt: Date,
	about :  String, // it would be Movie Name
	by : String // it would be user account

});

module.exports = mongoose.model('Essay', schema);
