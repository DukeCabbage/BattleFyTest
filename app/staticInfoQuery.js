var express = require('express');
var router = express.Router();
var request = require("request");
var requestMaker = require('./requestMaker');
var staticInfoDB = require('./staticInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

router.get('/summonerName/:name', function(req, res){
	console.log('summonerName');
	var name = req.params.name.toLowerCase();
	staticInfoDB.findSummoner('nameKey', name, 
		function(items){
		    if (items.length == 0){
		    	console.log('no matching summoner name in db');
		        requestMaker.requestForSummoner('name', name,
		        	function(playerObj){
		        		if (playerObj == null){
							res.writeHead(404, {"Content-Type": "text/text"});
							res.end('No summoner found');
		        		}else{
		        			staticInfoDB.insertSummoner(playerObj, function(){
								console.log('Insertion success');
							});
		        			res.send(playerObj);
		        		}
		        	}
		        );
		    }else{
		        console.log('summoner already in db:');
		    	res.send(items[0]);
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
		        requestMaker.requestForSummoner('id', id,
		        	function(playerObj){
		        		if (playerObj == null){
							res.writeHead(404, {"Content-Type": "text/text"});
							res.end('No summoner found');
		        		}else{
		        			staticInfoDB.insertSummoner(playerObj, function(){
								console.log('Insertion success');
							});
		        			res.send(playerObj);
		        		}
		        	}
		        );
		    }else{
		        console.log('summoner already in db:');
		    	res.send(items[0]);
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
		        requestMaker.requestForChampion('name', '',
		        	function(championObj){
		        		if (championObj == null){
							res.writeHead(404, {"Content-Type": "text/text"});
							res.end('No champion found');
		        		}else{
		        			staticInfoDB.insertChampion(championObj, function(){
								console.log('Insertion success');
							});
		        			res.send(championObj);
		        		}
		        	}
		        );
		    }else{
		        console.log('champion already in db:');
		    	res.send(items[0]);
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
		    	requestMaker.requestForChampion('id', id,
		    		function(championObj){
		        		if (championObj == null){
							res.writeHead(404, {"Content-Type": "text/text"});
							res.end('No champion found');
		        		}else{
		        			staticInfoDB.insertChampion(championObj, function(){
								console.log('Insertion success');
							});
		        			res.send(championObj);
		        		}
		        	}
		        );
		    }else{
		        console.log('champion already in db:');
		    	res.send(items[0]);
		    }
		}
	);
});

module.exports = router;