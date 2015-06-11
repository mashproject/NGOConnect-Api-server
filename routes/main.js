var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var express = require('express');
var models = require('../models');

var utils = require('../utils');
var router = express.Router();


//All routes other then related to authentication go in this file.
/**
 * Render the home page.
 */
router.get('/', function(req, res) {
  //res.render('index.jade');
});

/**
 * Render the dashboard page.
 */
router.get('/dashboard', utils.requireLogin, function(req, res) {
	console.log('dashboard reached');
	 if(req.session.user.usertype==0)
  {
      models.Volunteer.findOne({ volunteer_id: req.session.user._id }, ' first_name  last_name  dob  contact  gender  address  location  date_created  date_updated  resume ', function(err, volunteer){
       res.json(volunteer);
     });
  
      //res.render('login.jade', { error: "Incorrect email / password." });
  
   }
   else 
  {
  models.NGO.findOne({ ngo_id: req.session.user._id }, ' name  location  date_created 	date_updated   registration_status description  contact contact_person', function(err, ngo){
       res.json(ngo);
     });
  

   }

  //res.render('dashboard.jade');
});


router.post('/createopportunity', utils.requireLogin, function(req, res){
	var ngoOpportunity = new models.NGO_Opportunity({
        name:                 req.body.name,
		location:             req.body.location,
		description:          req.body.description,
	//	cause: 				  req.body.cause,
		required_skills:      req.body.required_skills,
		//date_created needs to be added here.
		compensation: 		  req.body.compensation
    });

    ngoOpportunity.save(function(err) {
        if (err) {
          var error = 'Something bad happened! Please try again.';
          if (err.code === 11000) {
            error = 'That email is already taken, please try another.';
            res.json({"res_code":4005});
          } else { 
            res.json({"res_code":4006, "error":err})
          }
        }

	});

});

router.post('/updateopportunity',utils.requireLogin, function(req,res) {
  models.NGO_Opportunity.findById(req.body.id, function(err, doc) {
    if (!err) {
      for(var i in req.body) {
  if(req.body[i] != doc[i]){
    doc[i] = req.body[i];
    }
  }
    
      doc.save();
  

  }
});
});

module.exports = router;


