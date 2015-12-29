var LocalStrategy  = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	console.log('login strategy');
	passport.use('login', new LocalStrategy({
		passReqToCallback : true,
		usernameField: 'login_email',
		passwordField: 'login_pwd'	},
		function(req, email, password, done) {
			console.log('login event');
			User.findOne({ 'email': email },
				function(err, user) {
					if (err) return done(err);
					if (!user) {
						return done(null, false, req.flash('message','User not found'));
					}
					if(!isValidPassword(user, password)) {
						return done(null, false, req.flash('message', 'Invalid Password'));
					}
					console.log('valid');
					return done(null, user);
				});
		})
	);
}

var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
}