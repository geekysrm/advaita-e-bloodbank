var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var crypto = require('crypto');

//for database
var Pool = require('pg').Pool;


var config = {
  host: 'localhost',
  user: 'admin',
  password: 'blood_password',
  database: 'blood_donor'
};

var pool = new Pool(config);

var XMLHttpRequest = require('xhr2');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'client/build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*',function(req,res){
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.post('/add-donor',function(req,res){

  var nm = req.body.name;
  var age1 = req.body.age;
  var location = req.body.place;
  var gen = req.body.gender;
  var blood_grp = req.body.blood_group;

  pool.query(`INSERT INTO "donors" ("name", "age", "place", "gender", "blood_group")
              VALUES ($1, $2, $3, $4, $5);`,[nm,age1,location,gen,blood_grp],function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      res.status(200).send("insert succesfull");
    }
  });

});

app.post('/get-donors',function(req,res){

  var blood_grp = req.body.blood_group;

  if(blood_grp === 'A+')
  {
      pool.query(`SELECT * FROM "donors"
      WHERE blood_group = "A+"
      AND blood_group = "A-"
      AND blood_group = "O+"
      AND blood_group = "O-";`,function(err,result){
      if(err)
      {
        res.status(500).send(err.toString());
      }
      else
      {
        if(result.rows.length === 0)
        {
          res.status(403).send("No donors found");
        }
        else
        {
          res.status(200).send(result.rows);
        }
      }
    });
  }
  else if(blood_grp === 'B+')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "B+"
    AND blood_group = "B-"
    AND blood_group = "O+"
    AND blood_group = "O-";`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'O+')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "O+"
    AND blood_group = "O-";`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'AB+')
  {
    pool.query(`SELECT * FROM "donors";`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'A-')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "A-"
    AND blood_group = "O-"`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'B-')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "B-"
    AND blood_group = "O-"`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'O-')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "O-"`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }
  else if(blood_grp === 'AB-')
  {
    pool.query(`SELECT * FROM "donors"
    WHERE blood_group = "AB-"
    AND blood_group = "A-"
    AND blood_group = "B-"
    AND blood_group = "O-";`,function(err,result){
    if(err)
    {
      res.status(500).send(err.toString());
    }
    else
    {
      if(result.rows.length === 0)
      {
        res.status(403).send("No donors found");
      }
      else
      {
        res.status(200).send(result.rows);
      }
    }
  });
  }

});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
