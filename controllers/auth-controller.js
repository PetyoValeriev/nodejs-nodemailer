let mongoose = require('mongoose');
let passport = require('passport');
let User = require('../models/User.schema');
let _ = require('lodash');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, newUser) => {
        if (!err) {
            res.send(newUser)
        } else if(err.code === 11000) {
            res.status(422).send(['Duplicated email address!!!'])
        } else {
           next(err)
            console.log('jjjjjj', err)
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userDetails = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                // return res.status(200).json({ status: true, user : _.pick(user,['fullName','email']) });
                return res.status(200).json({ status: true, user : _.pick(user,['_id','fullName','userName','email'])  });
        }
    );
}