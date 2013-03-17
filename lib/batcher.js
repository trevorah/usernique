var Batcher = function(receiver, cooldownTime) {
	this.receiver = receiver;
	this.cooldownTime = cooldownTime || 0;
	this.queue = [];
	this.isCoolingDown;
};

Batcher.prototype.push = function(query) {
	this.queue.push(query);
	this._trigger();
};

Batcher.prototype._trigger = function() {
	if(!this.isCoolingDown && this.queue.length) {
		this.receiver(this.queue);
		this.isCoolingDown = true;
		this.queue = [];
		var self = this;
		setTimeout(function() {
			self.isCoolingDown = false;
			self._trigger();
		}, this.cooldownTime);
	}
};

exports.Batcher = Batcher;
