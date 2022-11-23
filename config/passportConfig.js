const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const user = require('../models/User.schema')
//mongoose.model('User');

var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (email, password, done) => {
            User.findOne({ email: email },
                (err, user) => {
                    if (err) {
                         return done(err);
                    }
                       
                    // unknown user
                    else if (!user) {
                        return done(null, false, { message: 'Email is not registered' });
                    }
                     
                    // wrong password
                    else if (!user.verifyPassword(password)) {
                        console.log('password', password)
                        return done(null, false, { message: 'Wrong password.' });
                    }
                        
                    // authentication succeeded
                    else {
                        return done(null, user);
                    }
                       
                });
        })
);