var express = require('express');
var router = express.Router();
var requestMaker = require('./requestMaker');
var staticInfoDB = require('./staticInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

router.get('/:name', function(req, res){
	var _scope = this;
	var name = req.params.name.toLowerCase();
	var summonerId;
	staticInfoDB.findSummoner('nameKey', name,
		function(items){
		    if (items.length == 0){
		    	console.log('no matching summoner name in db');
		        requestMaker.requestForSummoner('name', name, 
		        	function(playerObj){
		        		if(playerObj == null){
		        			res.writeHead(404, {"Content-Type": "text/text"});
							res.end('No summoner found');
		        		}else{
		        			staticInfoDB.insertSummoner(playerObj, function(){
								console.log('Insertion success');
							});

							_scope.summonerId = playerObj['summonerId'];
		        			requestMaker.requestForRecentGames(_scope.summonerId, res,
		        				recentGamesRequestCallback
		        			);
		        		}
		        		
		        	}
		        );
		    }else{
		        _scope.summonerId = (items[0])['summonerId'];
    			requestMaker.requestForRecentGames(_scope.summonerId, res,
    				recentGamesRequestCallback
    			);
		    }
		}
	);
});

var recentGamesRequestCallback = function(res, result){
	if(result==null){
		res.writeHead(404, {"Content-Type": "text/text"});
		res.end('No summoner found');
	}else{
		var gameCount = result.length;
		var gamesToClient = [];
		syncLoop(gameCount, res, gamesToClient, result);
	}
};

var syncLoop = function(count, res, array, rawData){
	var totalCount = rawData.length;
	if(count == 0){
		res.send(array);
	}else{
		var game = rawData[totalCount-count];
		var tempGame = {
			gameId: game['gameId'],
			createDate: game['createDate'],
			totalDamageDealtToChampions: (game['stats'])['totalDamageDealtToChampions'],
			totalDamageTaken: (game['stats'])['totalDamageTaken'],
			killingSprees: (game['stats'])['killingSprees']
		};

		staticInfoDB.findChampion('championId', game['championId'],
			function(items){
			    if (items.length == 0){
			    	console.log('no matching champion name in db');
			    	requestMaker.requestForChampion('id', game['championId'],
			    		function(championObj){
			        		if (championObj == null){
			        			tempGame['championName'] = 'Unknown';
			        			console.log(tempGame);
			        			array.push(tempGame);
			        			count--;
			        			syncLoop(count, res, array, rawData);
			        		}else{
			        			staticInfoDB.insertChampion(championObj, function(){
									console.log('Insertion success');
								});
			        			tempGame['championName'] = championObj['championName'];
			        			console.log(tempGame);
			        			array.push(tempGame);
			        			count--;
			        			syncLoop(count, res, array, rawData);
			        		}
			        	}
			        );
			    }else{
			        console.log('champion already in db:');
			    	tempGame['championName'] = (items[0])['championName'];
			    	// console.log(tempGame);
			    	array.push(tempGame);
        			count--;
        			syncLoop(count, res, array, rawData);
			    }
			}
		);
	}
}

module.exports = router;