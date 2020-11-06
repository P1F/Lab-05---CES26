const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = {};

function initialSetup(){
  fs.writeFile("./users.json", JSON.stringify(users), function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`users.json initialized`);
    }
  });
};

initialSetup();

app.get('/api/users', (req, res) => {
  fs.readFile('./users.json', 'utf8', (err, jsonString) => {
    if (err) {
        throw err;
    } else {
      res.send(jsonString); 
    }
  })
});

app.post('/api/users', (req, res) => {
  users[`user${Object.keys(users).length + 1}`] = {
    name: req.body.username,
    age: req.body.age
  }

  fs.writeFile("./users.json", JSON.stringify(users), function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`user added -> ${JSON.stringify(req.body)}`);
    }    
  })

  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));