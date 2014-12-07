var dburl = 'localhost/mydb';
var collections = ['xyz']; // a xyz model object will be used, for sending collections to db.

var mdb = require('mongojs').connect(dburl, collections);

//A xyz model object, (blue print for the collection xyz)

function xyz(firstname, lastname){ //constructor
	this.firstname = firstname;
	this.lastname = lastname;
}



//creating an xyz object.

var xyz1 = new xyz('namrata','gupta');

mdb.xyz.save(xyz1, function(err, savedXyz){
	if(err) console.log(err);
	else console.log("Xyz "+ savedXyz.firstname +" saved")
}); //requires call back funciton, follows nodejs.