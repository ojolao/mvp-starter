var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.post('/items/add', function(req, res) {
  console.log('req.body.item is', req.body.item);
  var itemInfo = {
    content: req.body.item
  };
  items.insertItem(itemInfo, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.send('item has been added to the database');
    }
  });
});

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.delete('/items/delete', function(req, res) {
  console.log('req.body is', req.body);
  var itemInfo = req.body.item.id;
  items.deleteItem(itemInfo, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
      res.send('item has been deleted from the database');
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

