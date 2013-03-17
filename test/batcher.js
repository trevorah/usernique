var Batcher = require('../lib/batcher').Batcher;
var assert = require('assert');

describe('batcher', function(){
	it('should call the function', function(done){
		var batchedFunction = new Batcher(function(array) {
			assert.equal(array.length, 1);
			assert.equal(array[0], 1);
			done();
		});
		batchedFunction.push(1);
	});

	it('should batch up 5 calls into 1 immidiate and one delayed call', function(done){
		var numberOfCalls = 0;
		var batchedFunction = new Batcher(function(array) {
			numberOfCalls++;
			if(numberOfCalls === 2) {
				done();
			}
			if(numberOfCalls > 2) {
				throw new Error("More than two calls");
			}
		});
		batchedFunction.push(1);
		batchedFunction.push(2);
		batchedFunction.push(3);
		batchedFunction.push(4);
		batchedFunction.push(5);
	});
});