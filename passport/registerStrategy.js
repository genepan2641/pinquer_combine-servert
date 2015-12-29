var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('register', new LocalStrategy({
            passReqToCallback : true,
            usernameField: "register_email",
            passwordField: "register_pwd"
             // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log("register event");
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'email' : email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: '+ email);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        if(req.body.register_pwd_again == password) {
                            console.log("register_pwd_again == password");
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.email = email;
                            newUser.username = deriveUsername(email);
                            newUser.password = createHash(password);
                            newUser.emailVertified = false;
                            newUser.nickname = newUser.username;
                            newUser.identity = deriveIdentity(newUser.username);
                            newUser.level = 1;
                            newUser.exp = 0;
                            // save the user
                            newUser.save(function(err) {
                                if (err){
                                    console.log('Error in Saving user: '+err);  
                                    throw err;  
                                }
                                console.log('User Registration succesful');    
                                return done(null, newUser);
                            });
                        } else {
                            console.log("register_pwd_again != password");
                            return done(null, false, req.flash('message','not the same'));
                        }
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
function deriveUsername(email) {
    return email.substr(0,email.indexOf('@'));
}
function deriveIdentity(username) {

    var length = username.length;
    if (length < 8) {
        return false;
    } else {
        return username.substr(length-6,3);
    }
}


