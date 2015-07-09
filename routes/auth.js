var bcrypt = require('bcryptjs');
var express = require('express');
// var models = require('../models');
var utils = require('../utils');
var router = express.Router();
var userModel = require('../models/user');
var personModel = require('../models/person');

function checkValidInput(object){
    if(object.username && object.password && object.is_person && object.given_name && object.family_name && object.contact && object.email){
      return object;
    }else{
      throw new Error('insufficient input parameters');
    }
}
router.post('/register', function(req, res) {
  /*
  Username and password will be stored in USER collection
  Person and Organisation collections will be selected on the basis of "is_person" variable.
  */
    var validatedBody=checkValidInput(req.body);
    var user = new userModel.User({
    username:   validatedBody.username,
    password:   validatedBody.password,
    is_person:  validatedBody.is_person
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
        console.log(err)
        res.json(
          {"res_code":4006,
          "error":err}
        )
      }
    }else {//if saving of user-email and password are successful, then store volunteer or NGO details, in their respective collections.
      if(validatedBody.is_person){
         //true for person, false for organisation
         if(!req.body.address){
           req.body.address=null;
         }
         var person = new personModel.Person({
          user_id        :    user._id,
          given_name     :    validatedBody.given_name,
          family_name    :    validatedBody.family_name,
          contact        :    validatedBody.contact,
          address        :    req.body.address,
          birthdate      :    validatedBody.birthdate,
          email          :    validatedBody.email,
          gender         :    validatedBody.gender
        });
        person.save(function(err) {
          if (err) {
            console.log(err);
            res.json({"res_code":4006, "error":err});
          }
        });
      }
    }
  });
});

/**
 * Log a user into their account.
 *
 */
router.post('/login', function(req, res) {
  models.User.findOne({ email: req.body.email }, 'firstName lastName email password is_person data', function(err, user) {
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
 * Log a user out of their account
 */
router.get('/logout', function(req, res) {
  if (req.session) {
    req.session.reset();
    res.json({"res_code":4010});
  }
  //res.redirect('/');
});

module.exports = router;
