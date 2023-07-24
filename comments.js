// Create web server to handle comment requests

// Express is a web framework for node.js
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Create a route for the app
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Create a route for the app
app.get('/comments', function(req, res) {
  console.log('GET request received at /comments');
  res.set('Content-Type', 'application/json');
  res.send(readData());
});

// Create a route for the app
app.post('/comments', function(req, res) {
  console.log('POST request received at /comments');
  console.log('Request body = ' + JSON.stringify(req.body));
  res.set('Content-Type', 'text/plain');
  res.send('Thanks for your comment!');
  storeData(req.body);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

function readData() {
  var data = fs.readFileSync('data.json');
  return JSON.parse(data);
}

function storeData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data));
}