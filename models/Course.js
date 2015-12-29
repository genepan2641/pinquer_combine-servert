var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*if(!mongoose.connection.readyState) {
	mongoose.connect('mongodb://localhost/pinquer');
}
*/
var schema = new mongoose.Schema({
	semester: String,
	code: String,
	name: String,
	englishName: String,
	teachers: String,
	credit: Number,
	when: String,
	where: String,
	liberalArt: String,
	department: String,
	courseId: {type: String, unique: true},
	note: String,
	isCore: Boolean
});

module.exports = mongoose.model('Course', schema);