// User.js

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pinquer');

var schema = new mongoose.Schema({
	username: { type: String, unique: true},
	password: String,
	email: { type: String, unique: true},
	emailVertified: Boolean,
	nickname: String,
	identity: String,
	level: Number,
	exp: Number
});

module.exports = mongoose.model('User', schema);