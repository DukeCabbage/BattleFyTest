var db = require('monk')('localhost:27017/nodetest1');
var summonerCollection = db.get('summoner_collection');
var championCollection = db.get('champion_collection');

exports.findSummoner = function(key, value, callback) {
	var obj = {};
	obj[key] = value;

	// console.log(obj);
	
	summonerCollection.find(obj, function(err, items){
		callback(items);
	});
};

exports.findChampion = function(key, value, callback) {
	var obj = {};
	obj[key] = value;
	
	// console.log(obj);
	
	championCollection.find(obj, function(err, items){
		callback(items);
	});
};

exports.insertSummoner = function(obj, callback) {
	summonerCollection.insert(obj, function(err, result){
		callback();
	})
};

exports.insertChampion = function(obj, callback) {
	championCollection.insert(obj, function(err, result){
		callback();
	})
};