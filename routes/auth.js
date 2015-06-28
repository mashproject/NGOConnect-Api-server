var bcrypt = require('bcryptjs');
var express = require('express');
var models = require('../models');
var utils = require('../utils');
var router = express.Router();
var userModel = require('../models/user');
var personModel = require('../models/person');

router.post('/register', function(req, res) {
  /* 
  Username and password will be stored in USER collection
  Person and Organisation collections will be selected on the basis of "is_person" variable.
  */  
  
    var user = new userModel.User({
    username:   req.body.username,
    password:   req.body.password,
    is_person:  req.body.usertype
  });
  user.save(function(err) { //save user-email and password in "USERS" collection.
    if (err) {
      var error = 'Something bad happened! Please try again.';
      if (err.code === 11000) {
        error = 'That email is already taken, please try another.';
        res.json( 
            {"res_code":4005,
            "message": error}
        );
      } else { 
        res.json(
          {"res_code":4006,
          "error":err}
        )
      }      
    }else {//if saving of user-email and password are successful, then store volunteer or NGO details, in their respective collections.
      if(is_person){ 
         //true for person, false for organisation
        var person = new personModel.Person({
          name   :    user._id,
          given_name     :    req.body.given_name,
          family_name    :    req.body.family_name,
          contact        :    req.body.contact,
          address        :    req.body.address,
          birthdate      :    req.body.birthdate,
          email          :    req.body.email,
          gender         :    req.body.gender          
        });
        volunteer.save(function(err) {
          if (err) {
            var error = 'Something bad happened! Please try again.';
            res.json({"res_code":4006, "error":err});
          }
        });

      }else if(!is_person){ // if Org details to be saved.
      //org model to be added and this part to be updated
      //   var org = new models.organisation({
      //     ngo_id               :     user._id,
      //     name                 :     req.body.name,
      //     location             :     req.body.location,
      //     //date_created needs to be added here.
      //     registration_status  :     req.body.registration_status,
      //     description          :     req.body.description,
      //     contact              :     req.body.contact,
      //     contact_person       :     req.body.contact_person,
      //     website              :     req.body.website
      //   });
      //   ngo.save(function(err) {
      //     if (err) {
      //       var error = 'Something bad happened! Please try again.';
      //       res.json({"res_code":4006, "error":err});
      //       //handle error
      //     }          
      //   });
      // }
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
  models.User.findOne({ email: req.body.email }, 'firstName lastName email password usertype data', function(err, user) {
    if (!user) {
      res.json({"res_code":4007});
      //res.render('login.jade', { error: "Incorrect email / password." });
    } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          utils.createUserSession(req, res, user);
          res.json(
            {"res_code":4002,
            "message": "Login Successful"}
          );
        } else {
          res.json(
            {"res_code":4008,
            "message": "Login Error-> User password incorrect"}
          );        
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
