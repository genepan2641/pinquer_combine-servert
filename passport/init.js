var loginStrategy = require('./loginStrategy');
var registerStrategy = require('./registerStrategy');
var User = require('../models/User');

module.exports = function(passport){

    console.log("init function");
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //console.log('serializing user: ');
        //console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        //console.log("deserializing");
        User.findById(id, function(err, user) {
            //console.log('deserializing user:',user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    loginStrategy(passport);
    registerStrategy(passport);

}