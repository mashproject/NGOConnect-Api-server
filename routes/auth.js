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
  console.log(req.body);


  /* 
  Username and password will be stored in USERS collection
  Volunteer and NGO collections will be selected on the basis of "usertype" variable.
  */
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var user = new models.User({
      email:      req.body.email,
      password:   hash,
    });

    user.save(function(err) {
        if (err) {
          var error = 'Something bad happened! Please try again.';
          if (err.code === 11000) {
            error = 'That email is already taken, please try another.';
            res.json({"res_code":4005});
          } else { 
            res.json({"res_code":4006, "error":err})
          }
          //res.render('register.jade', { error: error });
        } else {//if email and password are successfully stored, then store volunteer or NGO details.

              if(req.body.usertype == 0){ 

              //0 for volunteer, 1 for NGO
                var volunteer = new models.Volunteer({
                  first_name:  req.body.first_name,
                  last_name:   req.body.last_name,
                  contact:     req.body.contact,
                  address:     req.body.address,
                  dob:         req.body.dob,
                  location:    req.body.location,
                  gender:      req.body.gender,
                  resume:      req.body.resume
                });

                volunteer.save(function(err) {
                  if (err) {
                      var error = 'Something bad happened! Please try again.';
                      res.json({"res_code":4006, "error":err})
                  }
                }

               }else if(req.body.usertype==1){ // if NGO details to be saved.

                var ngo = new models.Ngo({
                  name:                 req.body.name,
                  location:             req.body.location,
                  //date_created needs to be added here.
                  registration_status:  req.body.registration_status,
                  description:          req.body.description,
                  contact:              req.body.contact,
                  contact_person:       req.body.contact_person,
                  website:              req.body.website
                });

                ngo.save(function(err) {
                  if (err) {
                      var error = 'Something bad happened! Please try again.';
                      res.json({"res_code":4006, "error":err})
                }
                  
                  //res.render('register.jade', { error: error });

                }

              }
              
              //if users collection is updated successfully and then entries to NGO or Volunteer collection has been entered successfully then create session for the user and log him/her in.            

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
