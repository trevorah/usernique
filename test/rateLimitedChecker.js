var assert = require('assert');
var sandbox = require('sandboxed-module');

describe('twitter lookup', function() {
	var mockRequest200 = function(url, callback) {
		callback(null, {'statusCode': 200}, [{screen_name: 'tester'}, {screen_name: 'cAsE'}]);
	};

	var mockRequest404 = function(url, callback) {
		callback(null, {'statusCode': 404}, []);
	};

	var mockRequest500 = function(url, callback) {
		callback(null, {'statusCode': 500}, []);
	};

	describe('when it finds a match', function() {
		it('should return \'taken\' for the match', function(done) {
			var twitter = sandbox.require('../lib/rateLimitedChecker', {
				requires: { 'request': mockRequest200 }
			});

			var query = {
				username: 'tester',
				callback: function(resp) {
					assert.equal(resp, 'taken');
					done();
				}
			};

			twitter.lookupNames([query]);
		});

		it('should return \'taken\' for the match even with a mismatched case', function(done) {
			var twitter = sandbox.require('../lib/rateLimitedChecker', {
				requires: { 'request': mockRequest200 }
			});

			var query = {
				username: 'CaSe',
				callback: function(resp) {
					assert.equal(resp, 'taken');
					done();
				}
			};

			twitter.lookupNames([query]);
		});

		it('should return \'free\' for any missing usernames', function(done){
			var twitter = sandbox.require('../lib/rateLimitedChecker', {
				requires: { 'request': mockRequest200 }
			});

			var query1 = {
				username: 'tester',
				callback: function(resp) {}
			};

			var query2 = {
				username: 'someone_else',
				callback: function(resp) {
					assert.equal(resp, 'free');
					done();
				}
			};

			twitter.lookupNames([query1, query2]);
		});
	});

	it('should return \'unknown\' when twitter returns a 500 error', function(done){
		var twitter = sandbox.require('../lib/rateLimitedChecker', {
			requires: { 'request': mockRequest500 }
		});

		var query = {
			username: 'tester',
			callback: function(resp) {
				assert.equal(resp, 'unknown');
				done();
			}
		};

		twitter.lookupNames([query]);
	});

	it('should return \'taken\' when twitter returns 404', function(done){
		var twitter = sandbox.require('../lib/rateLimitedChecker', {
			requires: { 'request': mockRequest404 }
		});
		var query = {
			username: 'tester',
			callback: function(resp) {
				assert.equal(resp, 'free');
				done();
			}
		};
		twitter.lookupNames([query]);
	});
});
