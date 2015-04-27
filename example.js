var path = require('path');
var express = require('express');
var logger = require('morgan');
var app = express();

var port = 8080;
var domain = 'localhost';

// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 

// NEW: Handle requests for a player
app.get('/players/:name', function(req, res){
  res.send('The details of player ' + req.params.name + ' should go here');
});

// NEW: Handle request for a list of all players
app.get('/players', function(req, res){
  res.send('A list of players should go here');
});

// Route for everything else.
app.get('*', function(req, res){
  res.send('Hello World');
});


app.listen(port, domain);
console.log('Server running at', domain+':'+port);