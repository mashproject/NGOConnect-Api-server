var bcrypt = require('bcryptjs');
var express = require('express');

var models = require('../models');
var utils = require('../utils');

var router = express.Router();

/**
 * Render the registration page.
 */
router.get('/register', function(req, res) {
 // res.render('register.jade', { csrfToken: req.csrfToken() });
});

/**
 * Create a new user account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */
router.post('/register', function(req, res) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var user = new models.User({
    firstName:  req.body.firstName,
    lastName:   req.body.lastName,
    email:      req.body.email,
    password:   hash,
  });
  user.save(function(err) {
    if (err) {
      var error = 'Something bad happened! Please try again.';

      if (err.code === 11000) {
        error = 'That email is already taken, please try another.';
        res.json({"res_code":4005});
      }

      res.json({"res_code":4006});
      res.json({ error: error });
      //res.render('register.jade', { error: error });
    } else {
      utils.createUserSession(req, res, user);
      res.json({"res_code":4001});
      //res.redirect('/dashboard');
    }
  });
});

/**
 * Render the login page.
 */
router.get('/login', function(req, res) {
 // res.render('login.jade', { csrfToken: req.csrfToken() });
});

/**
 * Log a user into their account.
 *
 * Once a user is logged in, they will be sent to the dashboard page.
 */



router.post('/login', function(req, res) {
  console.log(req);
  models.User.findOne({ email: req.body.email }, 'firstName lastName email password data', function(err, user) {
    if (!user) {
      res.json({"res_code":4007});
      //res.render('login.jade', { error: "Incorrect email / password." });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        utils.createUserSession(req, res, user);
        res.json({"res_code":4002});
        //res.redirect('/dashboard');
      } else {
        res.json({"res_code":4008});
        //res.render('login.jade', { error: "Incorrect email / password."  });
      }
    }
  });
});

/**
 * Log a user out of their account, then redirect them to the home page.
 */
router.get('/logout', function(req, res) {
  if (req.session) {
    req.session.reset();
    res.json({"res_code":4010});
  }
  //res.redirect('/');
});

module.exports = router;
