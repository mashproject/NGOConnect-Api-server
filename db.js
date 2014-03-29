var mongojs = require('mongojs');

var databaseURI = process.env.MONGOHQ_URL || "localhost:27017/ngoserver";
var collections = ['ngos','stickies'];
var db = mongojs(databaseURI,collections);

module.exports = db;


