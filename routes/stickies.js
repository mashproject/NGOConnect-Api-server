/*

Routes for stickies

*/

var dbconfig = require('../db.js');
var db = dbconfig.db;

var mongojs = dbconfig.mongojs;
var mycollection = db.collection('stickies', 'ngo'); //specifying the collections with which we will be working with.




exports.findAll = function(req, res) {
    db.stickies.find(function(err, docs) {

       // docs.toArray(function(err, items) {
            res.send(docs);
            console.log('sending all ....')
        //});
    });

}

exports.test = function(req, res) {

    res.send('test test');
}
 
exports.detaild = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving stickies: ' + id);
    db.stickies.findOne({'_id':mongojs.ObjectId(id)}, function(err, doc) {
        
            if(err)
                res.send(error);

            res.send(doc);
        });
   
}

/*
Changes made, 8 December 2014, by Hemant kumar.
*/


//definining a schema for NGO, we are going to use its object at a later stage.

function ng(head, ngoname){ //constructor
    this.head = head;
    this.ngoname = ngoname;
}


//Function for saving an item in our collection.
exports.saveEntry = function(req, res) {

//creating a object of the form ngo and extracting values from post data.

var ng1 = new ng(req.body.headname, req.body.ngoname);
//Note: when sending post data,through POSTMAN, for sending ngo's headname as postdata:
//      in 'name' field type 'headname' and in value type its respective value->'hemant'. refer to postman_example.png for details.

//saving the ng1 object in our collection named NGO.
db.ngo.save(ng1, function(err, savedngo){
    if(err) console.log(err);
    else{
         console.log("Ngo "+ savedngo.ngoname +" saved");
         res.send("NGO: "+savedngo.ngoname+ "  is now saved in our database.");

    }
}); //requires call back funciton, follows nodejs.


/*
changes end.
*/



}

