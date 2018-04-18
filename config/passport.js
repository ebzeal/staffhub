const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Staff = mongoose.model('staff');

module.exports = function(passport) {
    passport.use(new LocalStrategy ({usernameField : 'email'}, (email,password,done) => {
        Staff.findOne({

        })
    }))
};