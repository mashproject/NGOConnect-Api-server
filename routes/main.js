// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var ObjectId = Schema.ObjectId;
// var express = require('express');
// var models = require('../models');
// var utils = require('../utils');
// var router = express.Router();

// //All routes other then related to authentication go in this file.
// /**
//  * Render the home page.
//  */
//  router.get('/', function(req, res) {

//   //res.render('index.jade');
// });

// /**
//  * Render the dashboard page.
//  */

// router.get('/dashboard', utils.requireLogin, function(req, res) {
// 	console.log('dashboard reached');
// 	if(req.session.user.usertype==0)
//   {
//     models.Volunteer.findOne({ volunteer_id: req.session.user._id }, ' first_name  last_name  dob  contact  gender  address  location  date_created  date_updated  resume ', function(err, volunteer){
//       res.json(volunteer);
//     });
//         //res.render('login.jade', { error: "Incorrect email / password." });
//   } else {
//     models.NGO.findOne({ ngo_id: req.session.user._id }, ' name location date_created date_updated registration_status description  contact contact_person', function(err, ngo){
//       res.json(ngo);
//     });
//   }
// });

// /**
//  * Render the search page.
//  */
// router.get('/search', function(req, res) {

//   var databaseUrl = "mongodb://localhost:27017/ngoconnect1"; // "username:password@example.com/mydb"
//   var collections = ["ngoopportunity"]
//   var db = require("mongojs").connect(databaseUrl, collections);
//   console.log();

//   var query1 = {};
//   var query2 = {};
//   var query3 = {};
//   if(req.query.ngoname){
//     query1['ngo.name'] = eval('/'+req.query.ngoname+'/');
//   }else{
//     var operator = {};
//     operator['$exists'] = true;
//     query1['ngo.name'] = operator;
//   }
//   if(req.query.ngolocation){
//     query2['location.name'] = eval("/"+req.query.ngolocation+"/");
//   }else{
//     var operator = {};
//     operator['$exists'] = true;
//     query2['location.name'] = operator;
//   }

//   if(req.query.cause){
//     query3['cause.name'] = eval('/'+req.query.cause+'/') ;
//   }else{
//     var operator = {};
//     operator['$exists'] = true;
//     query3['cause.name'] = operator;
//   }

//   db.ngoopportunity.find({$or:[query1,query2,query3]}).toArray(function(err, documents) {
//     if (err) {
//       console.log(err);
//     }else{
//      //console.log(query);
//       console.log(documents);
//       res.json(documents);
//       console.log('dashboard reached');
//     }
//   });
//  console.log('da');
//   //res.render('dashboard.jade');
// });


// router.post('/createopportunity', utils.requireLogin, function(req, res){
// 	var ngoOpportunity = new models.NGO_Opportunity({

//     name              :     req.body.name,
//     description       :     req.body.description,
//     location          :     req.body.location,
//     opportunity_type  :     req.body.opportunity_type,
//    // cause             :          req.body.cause,
//     required_skills   :     req.body.required_skills,
//     compensation      :     req.body.compensation,
//     date_start        :     req.body.date_start,
//     date_end          :     req.body.date_end
//    //date_created needs to be added here.
//   });
//   ngoOpportunity.save(function(err) {
//     if (err) {
//       var error = 'Something bad happened! Please try again.';
//       res.json({"res_code":4006, "error":err})
//     }
//   });
// });

// router.post('/updateopportunity',utils.requireLogin, function(req,res) {
//   models.NGO_Opportunity.findById(req.body.id, function(err, doc) {
//     if (!err) {
//       for(var i in req.body) {
//         if(req.body[i] != doc[i]){
//           doc[i] = req.body[i];
//         }
//       }
//       doc.save();
//     }
//   });
// });

// module.exports = router;


