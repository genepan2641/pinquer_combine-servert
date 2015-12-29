var express = require('express');
var router = express.Router();
var Course = require('../models/Course');
var Essay = require('../models/Essay');

module.exports = function(passport) {
	
	router.get('/:courseId', function(req, res, next) {
		//console.log('Course');
		//console.log("req.params:"+ req.params);
		var courseId = req.params.courseId;
		console.log("courseId:"+ courseId);
		Course.findOne({ courseId: courseId}, function(err, course) {
			if(err) {
				console.log("invalid course");
			} else {	
				// not presenting 
				var query = Essay.find({ about: courseId}).limit(10);
				query.exec(function(err, essays) {
					if(err) {
						console.log("find essays error");
					} else {
						res.render('course', {
							currentUser: req.user,
							course: course,
							essays: essays
						});
					}
				});

			}
		});
	});

	return router;
}