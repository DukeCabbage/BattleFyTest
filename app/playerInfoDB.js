var db = require('monk')('localhost:27017/nodetest1');
var collection = db.get('usercollection');

exports.find = function(key, value, callback, res) {
	if (key!='all') {
		var obj = {};
		obj[key] = value;
		
		collection.find(obj, function(err, items){
			callback(items, res, value);
		});
	}else{
		collection.find({}, function(err, items){
			var i;
			for (i=0; i<items.length; i++) {
				console.log(items[i]);
			}
		});
	}
};

exports.insert = function(obj, callback) {
	collection.insert(obj, function(err, result){
		callback();
	})
};