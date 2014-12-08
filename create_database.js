/* 

Note: This is a standalone file, and does not interacts with any other part of the server.
This program just adds dummy values in mongoDB for testing purposes.
Details:
It creates a database named "ngoserver", 
and in it creates two collections, "ngo" and "stickies";


Author: Hemant Kumar (www.github.com/hemant6488)

*/





var dburl = 'localhost/ngoserver'; //url of our database.
var collections = ['ngo','stickies']; // a stickies model object will be used, for sending collections to db.

var mdb = require('mongojs').connect(dburl, collections);

//A stickies model object, (schema for the collection -> ngo)

function ngo(head, ngoname){ //constructor
	this.head = head;
	this.ngoname = ngoname;
}


	function stickies(firstname, lastname){ //constructor
	this.firstname = firstname;
	this.lastname = lastname;
}




//creating stickies n ngo JSON object.

var st1 = new stickies('namrata','name');
var st2 = new stickies('kartik','jain');
var st3 = new stickies('rahul','sandhu');
var st4 = new stickies('shivam','bhalla');

var ng1 = new ngo('satin','ngo1');
var ng2 = new ngo('shubham','ngo2');
var ng3 = new ngo('shivam','ngo3');
var ng4 = new ngo('hemant','ngo4');


//adding stickies manually without a loop of any kind.
mdb.stickies.save(st1, function(err, savedstickies){
	if(err) console.log(err);
	else console.log("stickies "+ savedstickies.firstname +" saved")
}); //requires call back funciton, follows nodejs.

mdb.stickies.save(st2, function(err, savedstickies){
	if(err) console.log(err);
	else console.log("stickies "+ savedstickies.firstname +" saved")
}); 

mdb.stickies.save(st3, function(err, savedstickies){
	if(err) console.log(err);
	else console.log("stickies "+ savedstickies.firstname +" saved")
}); 

mdb.stickies.save(st4, function(err, savedstickies){
	if(err) console.log(err);
	else console.log("stickies "+ savedstickies.firstname +" saved")
}); 

mdb.ngo.save(ng1, function(err, savedngo){
	if(err) console.log(err);
	else console.log("ngo "+ savedngo.ngoname +" saved")
}); 

mdb.ngo.save(ng2, function(err, savedngo){
	if(err) console.log(err);
	else console.log("ngo "+ savedngo.ngoname +" saved")
}); 

mdb.ngo.save(ng3, function(err, savedngo){
	if(err) console.log(err);
	else console.log("ngo "+ savedngo.ngoname +" saved")
});

mdb.ngo.save(ng4, function(err, savedngo){
	if(err) console.log(err);
	else console.log("ngo "+ savedngo.ngoname +" saved")
});