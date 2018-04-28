const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

  router.get('/', ensureGuest, (req,res) => {
      res.render('index/welcome');
     });


router.get('/about', (req,res) => {
    res.render('index/about');
} );

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;
