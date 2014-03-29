/*

Routes for stickies

*/

var db = require('../db.js');
var mycollection = db.collection('stickies');

var mongojs = require('mongojs');


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