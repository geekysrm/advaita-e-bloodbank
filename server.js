var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var crypto = require('crypto');

var XMLHttpRequest = require('xhr2');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

app.get('/',function(req,res){
  res.send('Welcome to new app!');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
