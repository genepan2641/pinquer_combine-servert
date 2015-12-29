var express = require('express');
var router = express.Router();


module.exports = function(passport) {


	router.get('/' , function(req, res, next) {
		console.log("hello");
		res.render('login', {title: "login Page"});

	});

	router.post('/', function(req, res, next) {
		var toDo;
		if(req.body.login) {
			toDo = req.body.login;
		} else if (req.body.register) {
			toDo = req.body.register;
		}
		
	  	passport.authenticate( toDo, function(err, user, info) {
		    if (err) { return next(err); }
		    if (!user) { return res.redirect('/login'); }
		    req.logIn(user, function(err) {
		      	if (err) { return next(err); }
		      	return res.redirect('/');
		    });
  		})(req, res, next);
	});



	return router;
}
/*
var eventIs = function (req, res, next) {
	if (req.body.login) {
		req.
	}
	next();
}
*/