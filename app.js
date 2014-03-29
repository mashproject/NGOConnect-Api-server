var express = require('express'),
    stickies = require('./routes/stickies');
 
var app = express();
 

app.configure(function () {
    app.use(express.logger('dev'));     
    app.use(express.bodyParser());
});

app.get('/', stickies.findAll);
app.get('/pinboard', stickies.findAll);
app.get('/pinboard/:id', stickies.detaild);
app.get('/test', stickies.test);
 
app.listen(3000);
console.log('Listening on port 3000...');