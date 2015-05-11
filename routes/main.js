var express = require('express');

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
	 if(req.session.user==0)
  {
   res.json("volunteer"); 
   }
   else 
  {
 res.json("ngo"); 
   }
	res.json(1);
  //res.render('dashboard.jade');
});


router.post('/createopportunity', utils.requireLogin, function(req, res){
	var ngoOpportunity = new models.NGO_Opportunity({
        name:                 req.body.name,
		location:             req.body.location,
		description:          req.body.description,
		cause: 				  req.body.cause,
		required_skills:      req.body.required_skills,
		//date_created needs to be added here.
		compensation: 		  req.body.compensation,
		description:          req.body.description,
		contact:              req.body.contact,
		contact_person:       req.body.contact_person,
		website:              req.body.website
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
        }

	});

});

module.exports = router;


