var path = require('path');
var express = require('express');
var logger = require('morgan');
var request = require("request");
var app = express();

var port = 8080;
var domain = 'localhost';

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';

// Log the requests
app.use(logger('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 

// NEW: Handle requests for a player
app.get('/players/:name', function(req, res){
	var name = req.params.name;
	var requestUrl = requestStr+name+apiKey;
	console.log('Sending request: ' + requestUrl);

	var playerInfo;
	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			playerInfo = JSON.parse(body);
			var key = Object.keys(playerInfo)[0];
			// console.log(playerInfo[key]['name']);

			res.writeHead(200, {"Content-Type": "text/json"});
			res.write('id: ' + playerInfo[key]['id'] + '\n');
			res.write('name: '+playerInfo[key]['name'] + '\n');
			res.write('level: '+playerInfo[key]['summonerLevel']) + '\n';
			res.end();

		}
	});
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