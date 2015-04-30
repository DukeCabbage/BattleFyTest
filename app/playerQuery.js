var express = require('express');
var router = express.Router();
var request = require("request");
var playerInfoDB = require('./playerInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';
var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';

// NEW: Handle requests for a player
router.get('/:name', function(req, res){
	var name = req.params.name;

	playerInfoDB.find('name', name, findCallback, res);
	

});

var findCallback = function(items, res, value){
    if (items.length == 0){
        requestToLolDatabase(value, res);
    }else{
        res.writeHead(404);
        res.end(items[0]);
        console.log('player already in db:' + items[0]);
    }
}

var requestToLolDatabase = function(name, res) {
	var requestUrl = requestStr+name+apiKey;
	console.log('Sending request: ' + requestUrl);

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var playerInfo = JSON.parse(body);
			var key = Object.keys(playerInfo)[0];
			var playerObj = {
				name : playerInfo[key]['name'],
				level : playerInfo[key]['summonerLevel'],
				update: playerInfo[key]['revisionDate']
			}

			res.writeHead(200);
			res.end(JSON.stringify(playerObj));
		}else{
			res.writeHead(response.statusCode, {"Content-Type": "text/text"});
			res.end(error);
		}
	});
}

module.exports = router;