var express = require('express');
var router = express.Router();
var request = require("request");

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';

var playerInfo;
var id;
var name;
var level;

// NEW: Handle requests for a player
router.get('/:name', function(req, res){
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

module.exports = router;