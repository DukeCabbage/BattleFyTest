var express = require('express');
// var http = require('http');
var path = require('path');
var logger = require('morgan');
var request = require("request");
// var exphbs = require('express3-handlebars');

var app = express();

var port = 8080;
var domain = 'localhost';

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';

var playerInfo;
var id;
var name;
var level;

app.set('port', port);
app.set('views', __dirname + '/views');
app.use(logger('dev'));
// app.use(app.router);

// Serve static files
app.use(express.static(path.join(__dirname, 'public'))); 

// NEW: Handle requests for a player
app.get('/players/:name', function(req, res){
	var name = req.params.name;
	var requestUrl = requestStr+name+apiKey;
	console.log('Sending request: ' + requestUrl);

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			handleInfo(body);

			res.writeHead(200, {"Content-Type": "text/json"});
			res.write('id: ' + id + '\n');
			res.write('name: '+name + '\n');
			res.write('level: '+level + '\n');
			res.end();
		}else{
			res.writeHead(response.statusCode, {"Content-Type": "text/text"});
			res.end(error);
		}
	});
});

function handleInfo(body){
	console.log('what');
	playerInfo = JSON.parse(body);
	var key = Object.keys(playerInfo)[0];
	id = playerInfo[key]['id'];
	name = playerInfo[key]['name'];
	level = playerInfo[key]['summonerLevel'];
	console.log(id);
}

//routes list:
// routes.initialize(app);

app.listen(port, domain);
console.log('Server up: http://'+domain+':'+app.get('port'));
console.log('Listening...');

