const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

require("../models/Staff");
const Staff = mongoose.model("staff");

const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

//ALL STAFF LIST PAGE
router.get("/all-staff", ensureAuthenticated, (req, res) => {
  Staff.find()
    .sort({ department: "asc", lastName: "asc" })
    .then(allstaff => {
      res.render("admin/all-staff", {
        allstaff: allstaff
      });
    });
});

// APPROVE STAFF
router.get("/approve/:id", (req, res) => {
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $set: { registrationStatus: true }
    }
  )
    //.then(allstaff => {
    //allstaff.save()
    .then(allstaff => {
      res.redirect("/admin/all-staff");
      // });
    });
});

// UNAPPROVE STAFF
router.get("/unapprove/:id", (req, res) => {
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $set: { registrationStatus: false }
    }
  )
    //.then(allstaff => {
    //allstaff.save()
    .then(allstaff => {
      res.redirect("/admin/all-staff");
      // });
    });
});

//VIEW STAFF PROFILE

router.get("/staffprofile/:id", ensureAuthenticated, (req, res) => {
  Staff.findOne({
    _id: req.params.id
  }).then(staff => {
    res.render("admin/staffprofile", {
      staff: staff
    });
  });
});

router.post("/update/employment-date/:id", (req, res) => {
  Staff.update(
    {
      _id: req.params.id
    },
    {
      $set: { employmentDate: req.body.employmentDate }
    }
  ).then(allstaff => {
    res.redirect(`/admin/staffprofile/${req.body.staffid}`);
  });
});

module.exports = router;
