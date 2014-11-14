Platform = function(descr)
{
    this.setup(descr);
};

Platform.prototype = new Entity();
Platform.prototype.halfWidth = 100;
Platform.prototype.halfHeight = 10;

Platform.prototype.takeDamage = function(a){
	return;
}


Platform.prototype.render = function(ctx){

	g_sprites.Platform.drawAt(ctx,this.cx- this.halfWidth,this.cy - this.halfHeight);


};


Platform.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};

// Assumes entity is within the bounding circle
Platform.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY, fallsThrough) {
	if (entity.velY < 0 ||
      fallsThrough) return false;

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

	return false;
}

Platform.prototype.update = function(dt)
{
	return;
};

Platform.prototype.getRadius = function() {
	return this.halfWidth;
};

Platform.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};
