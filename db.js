var mongojs = require('mongojs');

var databaseURI = process.env.MONGO_URL || "localhost:27017/ngoserver";
var collections = ['ngo','stickies'];
var db = mongojs(databaseURI,collections);

exports.db = db;
exports.mongojs = mongojs;


