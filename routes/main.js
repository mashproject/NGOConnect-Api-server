var express = require('express');

var utils = require('../utils');

var router = express.Router();

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
	res.json(1);
  //res.render('dashboard.jade');
});
/**
 * Render the search page.
 */
 router.get('/search', function(req, res) {
	
	// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db

  var databaseUrl = "mongodb://localhost:27017/ngoconnect1"; // "username:password@example.com/mydb"
var collections = ["ngoopportunity"]
var db = require("mongojs").connect(databaseUrl, collections);

  	var query="";
	if(req.ngoname){
		query += "{'ngo.name':/";
        query += req.name;
        query += "/},";
	}

	if(req.ngolocation){
		query += "{'location.name':/";
        query += req.loc;
	    query += "/},";
    }
	if(req.cause){
	 query += "{'cause.name':/";
     query += req.cause;
     query += "/},";

	}
	console.log(db.ngoopportunity.find());
	/*if(query.length>2){
res.json(collection.find({$or:[query.substr(1,query.length -2)]}));
	console.log('dashboard reached');
	}*/

  //res.render('dashboard.jade');
});

module.exports = router;
