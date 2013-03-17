var request = require("request");
var Batcher = require('./batcher').Batcher;

var oauth = {
	consumer_key: process.env.twitter_consumer_key,
	consumer_secret: process.env.twitter_consumer_secret,
	token: process.env.twitter_token,
	token_secret: process.env.twitter_token_secret
};

var urlBase = 'https://api.twitter.com/1.1/users/lookup.json?screen_name=';

var batcher = new Batcher(function(queries) {
	lookupNames(queries);
}, 5000);

var checkTwitter = function(username, callback){
	var query = {
		'username': username,
		'callback': callback
	}
	batcher.push(query);
};

var lookupNames = function(lookups) {
	lookups.forEach(function(query) {
		query.username = query.username.toLowerCase();
	});

	var nameList = lookups.map(function(item){
		return item.username;
	});
	var newUrl = urlBase + nameList.join(',');
	request({url: newUrl, oauth: oauth, json:true}, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var foundNames = body.map(function(item){
				return item.screen_name.toLowerCase();
			});
			lookups.forEach(function(query){
				if(foundNames.indexOf(query.username) > -1) {
					query.callback('taken');
				} else {
					query.callback('free');
				}
			});
		} else if(response.statusCode == 404) {
			lookups.forEach(function(query){
				query.callback('free');
			});
		} else {
			lookups.forEach(function(query){
				query.callback('unknown');
			});
		}
	});
};

exports.checkTwitter = checkTwitter;
exports.lookupNames = lookupNames;