const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

require('../models/Staff');
const Staff = mongoose.model('staff');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Process Registration Form
router.post('/register', (req,res) => {
    let errors = [];
    
    if (!req.body.fullname){
        errors.push({text : 'Please enter First and Last Name'});
    }
    if (!req.body.email){
        errors.push({text : 'Email field cannot be empty'});
    }
    if(req.body.password != req.body.password2){
        errors.push({text : 'Passwords do not match!'});
    }
    if (req.body.password < 4) {
        errors.push({text:'Password should be more than 4 characters'});
    }
    if(errors.length > 0 ){
        res.render('index/welcome', {
            errors : errors,
            fullname : req.body.fullname,
            email : req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        Staff.findOne({email : req.body.email})
        .then(staff => {
            if(staff){
                req.flash ('error_msg', 'Email already registered');
                res.redirect('/');
            } else {
                let fullname = req.body.fullname;
                let staffname = fullname.split(/\b(\s)/);
                let firstName = staffname[0];
                let lastName = staffname[2];

                const newStaff = new Staff({
                    firstName : firstName,
                    lastName : lastName,
                    email : req.body.email,
                    password : req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newStaff.password, salt, (err, hash) => {
                        if(err) throw (err);
                        newStaff.password = hash ;
                        newStaff.save()
                        .then(staff => {
                            req.flash('succcess_msg', "Registration Succesful. Admin will verify status before you can proceed.");
                            res.redirect(`/staff/profile/${staff.id}`)
                        })
                    })
                })
            }
        })
    }
});

//login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect : '/staff/dashboard',
        failureRedirect : '/',
        failureFlash : true
    }) (req, res, next)
});

//dashboard 
router.get('/dashboard', ensureAuthenticated, (req,res) =>{
    Staff.findOne({staff :req.staff})
    .then(staff => {
        if (staff.registrationStatus == false){
            req.flash('success_msg', 'Registration Succesful. Admin will verify status before you can proceed.')
            res.redirect('/')
        } else {
            res.render('staff/dashboard', {
                staff:staff
            });
        }
    });
});

//show profile
router.get ('/profile/:id', ensureAuthenticated, (req, res) => {
    Staff.findOne({
        _id :req.params.id
    })
    .then(staff => {
        if (staff.registrationStatus == false){
            req.flash('success_msg', 'Registration Succesful. Admin will verify status before you can proceed.')
            res.redirect('/')
        } else {
            res.render('staff/profile', {
                staff:staff
            });
        }
    });
});

router.get('/edit-profile/:id', ensureAuthenticated, (req,res) => {
    Staff.findOne({
        _id : req.params.id
    })
    .then(staff => {
        if(staff.id != req.params.id || staff.staffPriviledge != 'staff') {
           // req.flash('error_msg', 'You are not authorized');
            res.redirect('/dashboard')
        } else {
            res.render('staff/edit-profile', {
                staff : staff
            });
        }
    });
});

module.exports = router;
