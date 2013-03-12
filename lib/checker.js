var request = require("request");

var checkTwitter = function(username, callback) {
	request('http://www.twitter.com/' + username, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			callback('taken');
		} else if(response.statusCode == 404) {
			callback('free');
		} else {
			callback('unknown');
		}
	});
};

var checkGithub = function(username, callback) {
	request('http://www.github.com/' + username, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			callback('taken');
		} else if(response.statusCode == 404) {
			callback('free');
		} else {
			callback('unknown');
		}
	});
};

exports.checkTwitter = checkTwitter;
exports.checkGithub = checkGithub;