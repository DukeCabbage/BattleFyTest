var db = require('monk')('localhost:27017/nodetest1');
var collection = db.get('usercollection');

exports.find = function(key, value, callback, res) {
	var obj = {};
	obj[key] = value;
	
	collection.find(obj, function(err, items){
		callback(items, res, value);
	});
	
};

exports.insert = function(obj, callback) {
	collection.insert(obj, function(err, result){
		callback();
	})
};