var express = require('express');
var router = express.Router();
var request = require("request");
var playerInfoDB = require('./staticInfoDB');

var apiKey = '?api_key=d188a667-b0ca-4c80-9110-8bfcbbf6d82b';

router.get('/:name', function(reeq, res){
	res.end('Work in progress...');
});

module.exports = router;