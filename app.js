var express = require('express');
var mongojs = require('mongojs'); 
var app = express();
var collections = ['ngos','stickies'];
var databaseURI = process.env.MONGO_URL || "localhost:27017/ngoserver";
var port = process.env.PORT || 3000;
console.log(databaseURI);
var db = mongojs(databaseURI,collections);

app.configure(function () {
    app.use(express.logger('dev'));     
    app.use(express.bodyParser());
});


/* enabling CORS see : http://www.html5rocks.com/en/tutorials/cors/ */
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.listen(port);
console.log('Listening on port 3000...');
app.get('/', function(req, res) {
    db.stickies.find(function(err, docs) {

       // docs.toArray(function(err, items) {
            res.send(docs);
            console.log('sending all ....')
        //});
    });

});

app.get('/pinboard', function(req, res) {
    db.stickies.find(function(err, docs) {

       // docs.toArray(function(err, items) {
            res.send(docs);
            console.log('sending all ....')
        //});
    });

});

app.get('/pinboard/:id', function(req, res) {
    var id = req.params.id;
    console.log('Retrieving stickies: ' + id);
    db.stickies.findOne({'_id':mongojs.ObjectId(id)}, function(err, doc) {
        
            if(err)
                res.send(error);
            else
            res.send(doc);
        });  
});
