var express = require('express');
var router = express.Router();
var request = require("request");
var staticInfoDB = require('./staticInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

router.get('/:name', function(reeq, res){
	var name = req.params.name.toLowerCase();
	staticInfoDB.findSummoner('nameKey', name,
		function(items){
		    if (items.length == 0){
		    	console.log('no matching summoner name in db');
		        // requestForSummoner('name', name, res);
		    }else{
		        console.log('summoner already in db:');
		    	res.send(items[0]);
		    }
		}
	);
});

module.exports = router;