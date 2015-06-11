var bodyParser = require('body-parser');
//var csrf = require('csurf');
var express = require('express');
var mongoose = require('mongoose');
var session = require('client-sessions');
require('dotenv').load();
var middleware = require('./middleware');
var autoIncrement = require('mongoose-auto-increment');
/**
 * Given a user object:
 *
 *  - Store the user object as a req.user
 *  - Make the user object available to templates as #{user}
 *  - Set a session cookie with the user object
 *
 *  @param {Object} req - The http request object.
 *  @param {Object} res - The http response object.
 *  @param {Object} user - A user object.
 *  author: Hemant Kumar - hemant6488@gmail.com.
 */
module.exports.createUserSession = function(req, res, user) {
 
  var cleanUser = {
    _id: user._id,
    email:      user.email,
    usertype : user.usertype,
   
  };
  
  
  req.session.user = cleanUser;
  req.user = cleanUser;
  res.locals.user = cleanUser;
};

/**
 * Create and initialize an Express application that is 'fully loaded' and
 * ready for usage!
 *
 * This will also handle setting up all dependencies (like database
 * connections).
 *
 * @returns {Object} - An Express app object.
 */
module.exports.createApp = function() {
  var connection= mongoose.createConnection('mongodb://localhost/ngoconnect');
  autoIncrement.initialize(connection);
  var app = express();
  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type');
    next();
  });
  // settings
 // app.set('view engine', 'jade');

  // middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    cookieName: 'session',
    secret: process.env.secret_key,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));
  //app.use(csrf());
  app.use(middleware.simpleAuth);

  // routes
  app.use(require('./routes/auth'));
  app.use(require('./routes/main')); 
  return app;
};

/**
 * Ensure a user is logged in before allowing them to continue their request.
 *
 * If a user isn't logged in, they'll be redirected back to the login page.
 */
module.exports.requireLogin = function(req, res, next) {
  if (!req.user) {
   // res.redirect('/login');
   res.json({"res_code":4009});
  } else {
    next();
  }
};


/*

Error/ Response Codes:
4001: Registration Successful, logged in.
4002: Login Successful.
4005: Register-> email already taken.
4006: Error occurred in registration, try again.
4007: Login Error-> User email not found in database.
4008: Login Error-> User password incorrect.
4009: Unauthorized user access, redirect to /login
4010: Logout Successful

*/
