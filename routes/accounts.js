const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

require('../models/Staff');
const Account = mongoose.model('accounts');

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

router.get('/', (req,res) => {
 req.render('accounts/index')
})


module.exports = router;