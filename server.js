var express = require('express'),
    stickies = require('./routes/stickies');
 
var app = express();
 
app.get('/', stickies.findAll);
app.get('/pinboard', stickies.findAll);
app.get('/pinboard/:id', stickies.detaild);
 
app.listen(3000);
console.log('Listening on port 3000...');