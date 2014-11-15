Message = function (descr) {
	for (var property in descr) {
		this[property] = descr[property];
	}
};

Message.prototype.font = "15px georgia";
Message.prototype.textAlign = "center";
Message.prototype.fillStyle = "black";
Message.prototype.baseLine = "middle";
Message.prototype.velY = -1.5;
Message.prototype.lifeSpan = 1 * SECS_TO_NOMINALS;
Message.prototype.lifeLeft = 1 * SECS_TO_NOMINALS;

Message.prototype.update = function (du) {
	this.cy += this.velY * du;

	this.lifeLeft -= du;

	if (this.lifeLeft <= 0) return entityManager.KILL_ME_NOW;
};

Message.prototype.render = function (ctx) {
	ctx.save();

	ctx.font = this.font;
	ctx.textAlign = this.textAlign;
	ctx.fillStyle = this.fillStyle;
	ctx.baseLine = this.baseLine;

	ctx.globalAlpha = this.lifeLeft/this.lifeSpan;

	ctx.fillText(this.message, this.cx, this.cy);

	ctx.restore();
};
