const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Staff = mongoose.model('staff');

module.exports = function(passport) {
passport.use(new LocalStrategy({usernameField:'email'}, (email, password, done) => {
    //Match staff
    Staff.findOne ({ //Match email
        email:email
    }).then(staff=> {
        if(!staff){
            return done(null, false, {message : 'No staff found'});
        }
        // Match Password
        bcrypt.compare(password, staff.password, (err, isMatch) => {
            if (err) throw err;
            if(isMatch) {
                return done(null, staff);
            } else {
                return done(null, false, {message: "Password Incorrect"})
            }
        })
    })
}));
    passport.serializeUser(function (staff, done) {
        done(null, staff.id);
    });
    passport.deserializeUser(function(id, done){
        Staff.findById(id, function(err, staff){
            done(err, staff)
        });
    }); 
}