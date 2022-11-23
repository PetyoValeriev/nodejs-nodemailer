let mongoose = require('mongoose');
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
const dotenv = require('dotenv').config({
    path: '../.env'
})

let UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First name can\'t be empty',

    },
    lastName: {
        type:String,
        required: 'last name cant be empty'
    },
    userName: {
        type:String,
      //  validate:[/^(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[_/-]).*$/gm],
        //todo regex for having atleast one special character
        // one _ / - min lenght 5
        minlength: [5, 'Username must have at least 5 chars']
    },
    email: {
        type: String,
        unique: true,
        validate: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, 'Email not valid'],
        required: [true, 'Email can\'t be empty']
    },
    password: {
        type: String,
      //  path: ...
      //validate: ['Wrong password format', /^(?=(?:.*[A-Z]){2,})(?=(?:.*[a-z]){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,20})$/gmx]
        //TODO: regex: min 8 lenght, at least one lowercase and min 2 uppercase, at least one special char
    },
    saltSecret: String
});

// Events
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
})

// custom validation for email
// UserSchema.path('email').validate((value) => {
//     let emailREGEX = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
// }, 'Invalid email');

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
     //   process.env.JWT_SECRET,
     "This is secret",
    {
        expiresIn: 60000000
    //    expiresIn: process.env.JWT_EXP
    });
}

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);