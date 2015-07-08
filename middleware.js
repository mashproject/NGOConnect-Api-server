// var models = require('./models');
var utils = require('./utils');
var userModel = require('./models/user');
console.log(3)
/**
 * A simple authentication middleware for Express.
 *
 * This middleware will load users from session data, and handle all user
 * proxying for convenience.
 */
module.exports.simpleAuth = function(req, res, next) {  
  if (req.session && req.session.user) {
    console.log(1)
    userModel.User.findOne({ email: req.session.user.email }, 'firstName lastName email is_person ', function(err, user) {
      if (user) {
        utils.createUserSession(req, res, user);
      }
      next();
    });
  } else {
    next();
  }
};
