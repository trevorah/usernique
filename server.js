var request = require("request");
var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/public'));

app.get('/github/:username', function(req, res) {
	request('http://www.github.com/' + req.params.username, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send('taken');
		} else {
			res.send('free');
		}
	});
});

app.get('/twitter/:username', function(req, res) {
	request('http://www.twitter.com/' + req.params.username, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send('taken');
		} else {
			res.send('free');
		}
	});
});

app.get('/reddit/:username', function(req, res) {
	request('http://reddit.com/user/' + req.params.username, function (error, response, body) {
		if(!error && response.statusCode == 200) {
			res.send('taken');
		} else {
			res.send('free');
		}
	});
});

app.listen(process.env.PORT || 8080);
