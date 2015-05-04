var request = require("request");
var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

exports.requestForSummoner = function(method, value, callback) {
	switch(method) {
		case 'name':
			var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/';
			var requestUrl = requestStr+value+apiKey;
			console.log('Sending request: ' + requestUrl);
		break;
		case 'id' :
			var requestStr = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/';
			var requestUrl = requestStr+value+apiKey;
			console.log('Sending request: ' + requestUrl);
		break;
		default:
			callback();
			return;
	}

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var playerInfo = JSON.parse(body);
			var key = Object.keys(playerInfo)[0];
			var playerObj = {
				nameKey : key.toLowerCase(),
				summonerId : playerInfo[key]['id'],
				summonerName : playerInfo[key]['name'],
				profileIconId : playerInfo[key]['profileIconId'],
				summonerLevel : playerInfo[key]['summonerLevel'],
				revisionDate: playerInfo[key]['revisionDate']
			};

			callback(playerObj);
		}else{
			callback();
		}
	});
};

exports.requestForChampion = function(method, value, callback) {
	switch(method) {
		case 'id' :
			var requestStr = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
			var requestUrl = requestStr+value+apiKey;
			console.log('Sending request: ' + requestUrl);
		break;
		default:
			callback();
			return;
	}

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var championInfo = JSON.parse(body);
			var championObj = {
				championId : championInfo['id'],
				championName : championInfo['name'],
				championTitle : championInfo['title']
			};

			callback(championObj);
		}else{
			callback();
		}
	});
};