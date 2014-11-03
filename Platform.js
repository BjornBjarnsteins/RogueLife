Platform = function(descr)
{
    this.setup(descr);
};

Platform.prototype = new Entity();
Platform.prototype.halfWidth = 100;
Platform.prototype.halfHeight = 10;



Platform.prototype.render = function(ctx){

	ctx.save();
	util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "orange");
	ctx.restore();


};

Platform.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};

// Assumes entity is within the bounding circle
Platform.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
	if (entity.velY < 0) return false;

	var oldLowerBoundEnt = oldY + entity.halfHeight;
	var nextLowerBoundEnt = nextY + entity.halfHeight;
	var platformUpperBound = this.getUpperBound();

	// oldLowerBoundEnt >= platformUpperBound > nextLowerBoundEnt
	if (oldLowerBoundEnt <= platformUpperBound &&
		platformUpperBound < nextLowerBoundEnt) {
		// Checks X axis
		if (nextX + entity.halfWidth >= this.cx - this.halfWidth &&
			nextX - entity.halfWidth <= this.cx + this.halfWidth) {
			this.groundMe(entity);
			return entity.TOP_COLLISION;
		}
	}

	/*if (lowerBoundEnt < this.cy + this.halfHeight &&
		lowerBoundEnt > this.cy - this.halfHeight) {
		if (entity.cx + entity.halfWidth < this.cx + this.halfWidth &&
		    entity.cx - entity.halfWidth > this.cx - this.halfWidth)
		this.groundMe(entity);
		return true;
	}*/

	return false;
}

Platform.prototype.update = function(dt)
{
	spatialManager.register(this);
	return;
};

Platform.prototype.getRadius = function() {
	return this.halfWidth;
};

Platform.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};
