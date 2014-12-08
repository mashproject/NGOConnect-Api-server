NGOConnect-Api-server
=====================

API server

MongoDB Integration with our server, Using MongoJS module.

1. MongoDB is a database but is not in SQL family of databases, i.e. its not a relational database,
2. MongoDB is a document oriented database, that is it stores structured data as JSON like documents with dynamic schemas. Instead of storing data in tables, which is 		what RDB do.
3. Pass a JSON object, it stores them easily without predefining the schema(the fact that it takes JSON objects directly makes it ideal for NODEJS), this data 			 flexibility has made MongoDB so popular.


-----------------------------------------------------------------------------------------------------------------------------------------------

Steps to setup MongoDB server:

1. Download and install your OS specific bundle from: http://mongodb.org/downloads
2. Launch MongoDB : $ (sudo) mongod



------------------------------------------------------------------------------------------------------------------------------------------------

Integration with our Server:

1. MongoJS is a very simple wrapper for MongoDB driver for NODEJS, it mimics the actual MongoDB Api very closely.
2. Grab MongoJS : npm install mongojs
3. Require MongoJS and assign it to an object, var db = require('mongojs');.
4. Now, db.connect(dburl, collections); //here dburl = "localhost/databasename" //Collections: similar to tables RDB, used to group similar data together.


5. !! To construct a database to use in url, first go to terminal and type "mongo newdatabasename", this will create your new database. Type help in mongo interpreter.
6. Some basic commands for the Mongo interpreter: 
	
	>*>show dbs;*

	>*>show collections;*  -> show existing collections in a database
	
	>*>db.xyz.save({'firstname':'hemant', 'lastname': 'kumar'})* -> save to the collection 'xyz'
	
	>*>show collections*  -> result : xyz
	
	>*>db.xyz.find()*     -> finds all the records in a collection.

	>*>db.xyz.drop()*     -> remove a collection
	
7. For doing the above tasks using NodeJs example: 

```
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
```	