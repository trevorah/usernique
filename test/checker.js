var assert = require('assert');
var sandbox = require('sandboxed-module');

describe('checker', function(){
	it('should return taken when twitter returns 200', function(done){
		var checker = getChecker(200);

		checker.checkTwitter('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'taken');
			done();
		});
	});

	it('should return free when twitter returns 404', function(done){
		var checker = getChecker(404);

		checker.checkTwitter('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'free');
			done();
		});
	});

	it('should return unknown when twitter returns 500', function(done){
		var checker = getChecker(500);

		checker.checkTwitter('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'unknown');
			done();
		});
	});

	it('should return taken when github returns 200', function(done){
		var checker = getChecker(200);

		checker.checkGithub('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'taken');
			done();
		});
	});

	it('should return free when github returns 404', function(done){
		var checker = getChecker(404);

		checker.checkGithub('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'free');
			done();
		});
	});

	it('should return unknown when github returns 500', function(done){
		var checker = getChecker(500);

		checker.checkGithub('mynrtrtertertetreretame', function(resp){
			assert.equal(resp,'unknown');
			done();
		});
	});
});

var getChecker = function(stubStatusCode){
	var stubRequest = function(url, callback) {
		callback(null, {'statusCode': stubStatusCode});
	};
	
	return sandbox.require('../lib/checker', {requires: {'request': stubRequest}});
};
