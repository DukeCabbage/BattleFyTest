var $       = require('jquery');
var rootUrl = "http://localhost:8080";

exports.rootUrl = rootUrl;

exports.submitInquiry = function(name, callback) {
	$.ajax(rootUrl+"/player/"+name, {
		success: callback,
		timeout: 10*1000,
		type: 'GET',
		error: callback
	});
}