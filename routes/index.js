const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

  router.get('/', (req,res) => {
      res.render('index/welcome');
     });

// router.post('/welcome', (req,res) => {
//     let errors = [];
//     if(req.body.password != req.body.password2){
//         errors.push({text : 'Passwords do not match!'});
//     }
//     if (req.body.password < 4) {
//         errors.push({text:'Password should be more than 4 characters'});
//     }
//     if (!req.body.fullname){
//         errors.push({text : 'Please enter First and Last Name'});
//     }
//     if (!req.body.email){
//         errors.push({text : 'Email field cannot be empty'});
//     }
//     if(errors.length > 0 ){
//         res.render('/', {
//             errors : errors,
//             fullname : req.body.fullname,
//             email : req.body.email,
//             password: req.body.password,
//             password2: req.body.password2
//         });
//     } else {
//         Staff.findOne({email : req.body.email})
//         .then(user => {
//             if(user){
//                 req.flash ('error_msg', 'Email already registered');
//                 res.redirect('/');
//             } else {
//                 let fullname = req.body.fullname;
//                 let staffname = fullname.split(/\b(\s)/);
//                 let firstName = staffname[0];
//                 let lastName = staffname[1];

//                 const newStaff = new Staff({
//                     firstName : firstName,
//                     lastName : lastName,
//                     email : req.body.email,
//                     password : req.body.password
//                 });

//                 bcrypt.genSalt(10, (err, salt) => {
//                     bcrypt.hash(newStaff.password, salt, (err, hash) => {
//                         if(err) throw (err);
//                         newStaff.password = hash ;
//                         newStaff.save()
//                         .then(user => {
//                             req.flash('succcess_msg', "Registration Succesful. Admin will verify statusbefore you can proceed.");
//                             res.redirect('staff/profile')
//                         })
//                     })
//                 })
//             }
//         })
//     }
// });


router.get('/about', (req,res) => {
    res.render('index/about');
} )

module.exports = router;
