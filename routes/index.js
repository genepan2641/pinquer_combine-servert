var express = require('express');
var router = express.Router();
//var User = require('../models/User');
//var Essay = require('../models/Essay');
//var Course = require('../models/Course');
/* GET home page. */
module.exports = function(passport) {
	
	router.get('/', function(req, res, next) {
	  	res.render('index', { 
	  		title: 'Express'
	  	});
	});

	/*router.get('/course', function(req, res, next) {
		res.render('course', { title: "course"});
	});*/

	router.get('/essay-ask', function(req, res, next) {
		res.render('essay-ask', {});
	});
	router.get('/essay-feedback', function(req, res, next) {
		res.render('essay-feedback', {});
	});
	router.get('/essay-notice', function(req, res, next) {
		res.render('essay-notice', {});
	});
	return router;
}

