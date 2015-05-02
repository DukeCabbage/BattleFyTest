var express = require('express');
var router = express.Router();
var request = require("request");
var staticInfoDB = require('./staticInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

router.get('/summonerName/:name', function(req, res){
	console.log('summonerName');
	var name = req.params.name.toUpperCase();
	staticInfoDB.findSummoner('summonerName', name, 
		function(items){
		    if (items.length == 0){
		    	console.log('no matching summoner name in db');
		        requestForSummoner('name', name, res);
		    }else{
		        console.log('summoner already in db:');
		    	res.writeHead(200);
		        res.end(JSON.stringify(items[0]));
		    }
		}
	);
});

router.get('/summonerId/:id', function(req, res){
	console.log('summonerId');
	var id = Number(req.params.id);
	staticInfoDB.findSummoner('summonerId', id,
		function(items){
		    if (items.length == 0){
		    	console.log('no matching summoner id in db');
		        requestForSummoner('id', id, res);
		    }else{
		        console.log('summoner already in db:');
		    	res.writeHead(200);
		        res.end(JSON.stringify(items[0]));
		    }
		}
	);
});

router.get('/championName/:name', function(req, res){
	var name = req.params.name;
	staticInfoDB.findChampion('championName', name,
		function(items){
		    if (items.length == 0){
		    	console.log('no matching champion id in db');
		        requestForChampion('name', '', res);
		    }else{
		        console.log('champion already in db:');
		    	res.writeHead(200);
		        res.end(JSON.stringify(items[0]));
		    }
		}
	);
});

router.get('/championId/:id', function(req, res){
	var id = Number(req.params.id);
	staticInfoDB.findChampion('championId', id,
		function(items){
		    if (items.length == 0){
		    	console.log('no matching champion name in db');
		    	requestForChampion('id', id, res);
		    }else{
		        console.log('champion already in db:');
		    	res.writeHead(200);
		        res.end(JSON.stringify(items[0]));
		    }
		}
	);
});

var requestForSummoner = function(method, value, res) {
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
			res.end();
			return;
	}

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var playerInfo = JSON.parse(body);
			var key = Object.keys(playerInfo)[0];
			var playerObj = {
				summonerId : playerInfo[key]['id'],
				summonerName : playerInfo[key]['name'],
				profileIconId : playerInfo[key]['profileIconId'],
				summonerLevel : playerInfo[key]['summonerLevel'],
				revisionDate: playerInfo[key]['revisionDate']
			}

			staticInfoDB.insertSummoner(playerObj, function(){
				console.log('Insertion success');
			});

			res.writeHead(200);
			res.end(JSON.stringify(playerObj));
		}else{
			res.writeHead(response.statusCode, {"Content-Type": "text/text"});
			res.end('No summoner found');
		}
	});
}

var requestForChampion = function(method, value, res) {
	switch(method) {
		case 'id' :
			var requestStr = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/';
			var requestUrl = requestStr+value+apiKey;
			console.log('Sending request: ' + requestUrl);
		break;
		default:
			res.end();
			return;
	}

	request(requestUrl, function(error, response, body){
		if (!error && response.statusCode == 200) {
			var championInfo = JSON.parse(body);
			var championObj = {
				championId : championInfo['id'],
				championName : championInfo['name'],
				championTitle : championInfo['title']
			}

			staticInfoDB.insertChampion(championObj, function(){
				console.log('Insertion success');
			});

			res.writeHead(200);
			res.end(JSON.stringify(championObj));
		}else{
			res.writeHead(response.statusCode, {"Content-Type": "text/text"});
			res.end('No champion found');
		}
	});
}

module.exports = router;