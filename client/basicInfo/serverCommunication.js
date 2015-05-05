var $       = require('jquery');
var rootUrl = "http://localhost:8080";

exports.rootUrl = rootUrl;

exports.submitBasicInquiry = function(name, callback) {
	$.ajax(rootUrl+"/staticInfo/summonerName/"+name, {
		success: callback,
		timeout: 10*1000,
		type: 'GET',
		error: callback
	});
};

exports.submitRecentGamesInquiry = function(name, callback) {
	$.ajax(rootUrl+"/recentGames/"+name, {
		success: callback,
		timeout: 10*1000,
		type: 'GET',
		error: callback
	});
};