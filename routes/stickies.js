/*

Routes for stickies

*/

var dbconfig = require('../db.js');
var db = dbconfig.db;

var mongojs = dbconfig.mongojs;
var mycollection = db.collection('stickies');




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