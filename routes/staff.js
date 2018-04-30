const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

require("../models/Staff");
const Staff = mongoose.model("staff");

const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

// Process Registration Form
router.post("/register", (req, res) => {
  let errors = [];

  if (!req.body.fullname) {
    errors.push({ text: "Please enter First and Last Name" });
  }
  if (!req.body.email) {
    errors.push({ text: "Email field cannot be empty" });
  }
  if (req.body.password != req.body.password2) {
    errors.push({ text: "Passwords do not match!" });
  }
  if (req.body.password < 4) {
    errors.push({ text: "Password should be more than 4 characters" });
  }
  if (errors.length > 0) {
    res.render("index/welcome", {
      errors: errors,
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    Staff.findOne({ email: req.body.email }).then(staff => {
      if (staff) {
        req.flash("error_msg", "Email already registered");
        res.redirect("/");
      } else {
        let fullname = req.body.fullname;
        let staffname = fullname.split(/\b(\s)/);
        let firstName = staffname[0];
        let lastName = staffname[2];

        const newStaff = new Staff({
          firstName: firstName,
          lastName: lastName,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newStaff.password, salt, (err, hash) => {
            if (err) throw err;
            newStaff.password = hash;
            newStaff.save().then(staff => {
              req.flash(
                "succcess_msg",
                "Registration Succesful. Admin will verify status before you can proceed."
              );
              res.redirect(`/staff/profile/${staff.id}`);
            });
          });
        });
      }
    });
  }
});

//login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/staff/dashboard",
    failureRedirect: "/",
    failureFlash: true
  })(req, res, next);
});

//dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Staff.findOne({
    _id: req.user.id
  }).then(staff => {
    res.render("staff/dashboard", {
      staff: staff
    });
  });
  //    console.log(req.user.id)
});

//show profile
router.get("/profile/:id", ensureAuthenticated, (req, res) => {
  Staff.findOne({
    _id: req.params.id
  }).then(staff => {
    if (staff.registrationStatus == false) {
      req.flash(
        "success_msg",
        "Registration Succesful. Admin will verify status before you can proceed."
      );
      res.redirect("/");
    } else {
      res.render(`staff/profile`, {
        staff: staff
      });
    }
  });
});

// router.get("/edit-profile/:id", ensureAuthenticated, (req, res) => {
//   Staff.findOne({
//     _id: req.params.id
//   }).then(staff => {
//     if (staff.id != req.params.id || staff.staffPriviledge != "staff") {
//       // req.flash('error_msg', 'You are not authorized');
//       res.redirect("/dashboard");
//     } else {
//       req.flash("succcess_msg", "Changes successfully added to your profile");
//       res.render(`staff/edit-profile/${staff.id}`, {
//         staff: staff
//       });
//     }
//   });
// });

//EDIT STAFF PROFILE

// router.put("/edit-profile/:id", (req, res) => {
//   Staff.findOne({
//     _id: req.params.id
//   }).then(staff => {
//     const newHomeAddress = {
//       street: req.body.homeAddress1,
//       town: req.body.homeAddress2,
//       state: req.body.homeAddress3
//     };
//     const newRelations = {
//       maritalStatus: req.body.maritalstatus,
//       nextOfKin: req.body.nextofkin,
//       childrenNumber: req.body.childrennumber
//     };

//     staff.homeAddress.unshift(newHomeAddress);
//     staff.relations.unshift(newRelations);

//     staff.firstName = req.body.firstname;
//     staff.middleName = req.body.middlename;
//     staff.lastName = req.body.lastname;
//     staff.email = req.body.email;
//     staff.phoneNumber = req.body.phonenumber;

//     staff.save().then(staff => {
//       res.redirect(`/staff/profile/${staff.id}`);
//     });
//   });
// });

// editprofile
router.post("/edit-profile/:id", (req, res) => {
  let staffid = req.params.id;
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $set: {
        firstName: req.body.firstname,
        middleName: req.body.middlename,
        lastName: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phone
      }
    }
  ).then(staff => {
    res.redirect(`/staff/profile/${staffid}`);
  });
});

//editaddress
router.post("/edit-profile-address/:id", (req, res) => {
  let staffid = req.params.id;
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $push: {
        homeAddress: {
          $each: [
            {
              street: req.body.homeAddress1,
              town: req.body.homeAddress2,
              state: req.body.homeAddress3
            }
          ],
          $position: 0
        }
      }
    }
  ).then(staff => {
    res.redirect(`/staff/profile/${staffid}`);
  });
});

//editrelations
router.post("/edit-profile-relations/:id", (req, res) => {
  let staffid = req.params.id;
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $push: {
        relations: {
          $each: [
            {
              maritalStatus: req.body.maritalstatus,
              nextOfKin: req.body.nextofkin,
              childrenNumber: req.body.childrennumber
            }
          ],
          $position: 0
        }
      }
    }
  ).then(staff => {
    res.redirect(`/staff/profile/${staffid}`);
  });
});

//editqualification
router.post("/edit-profile-qualification/:id", (req, res) => {
  let staffid = req.params.id;
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $push: {
        qualification: {
          $each: [
            {
              qualificationName: req.body.qualificationname,
              institution: req.body.institution,
              year: req.body.year
            }
          ],
          $position: 0
        }
      }
    }
  ).then(staff => {
    res.redirect(`/staff/profile/${staffid}`);
  });
});

// router.get("/all-staff-admin", ensureAuthenticated, (req, res) => {
//   Staff.find({}).then(staff => {
//     res.render("staff/all-staff", {
//       staff: staff
//     });
//   });
// });

module.exports = router;
