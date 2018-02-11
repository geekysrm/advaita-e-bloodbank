<<<<<<< HEAD
var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var crypto = require('crypto');

var XMLHttpRequest = require('xhr2');


=======
const express = require('express');
const app = express();

>>>>>>> 05b24fc77130a97333521b8aa870af53e8ba67b9
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
<<<<<<< HEAD
=======

app.get('/',function(req,res){
  res.send("hello");
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
>>>>>>> 05b24fc77130a97333521b8aa870af53e8ba67b9



<<<<<<< HEAD
app.get('/',function(req,res){
  res.send('Welcome!');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
=======
app.listen(port, () => `Server running on port ${port}`);
>>>>>>> 05b24fc77130a97333521b8aa870af53e8ba67b9
