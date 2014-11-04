Wall = function(descr)
{
    this.setup(descr);
};

Wall.prototype = new Entity();
Wall.prototype.halfWidth = 20;
Wall.prototype.halfHeight = 300;



Wall.prototype.render = function(ctx){

	ctx.save();
	util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "blue");
	ctx.restore();


};


Wall.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};

Wall.prototype.stopMeLeft = function (entity){
	entity.haltOnWallLeft(this.getLeftBound());
};

Wall.prototype.stopMeRight = function (entity){
	entity.haltOnWallRight(this.getRightBound());
};

// Assumes entity is within the bounding circle
Wall.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
	

	var oldRightSide = oldX + entity.halfWidth;
	var nextRightSide  = nextX + entity.halfWidth;
	var wallLeftBound = this.getLeftBound();

	console.log(oldRightSide, wallLeftBound);
	//check for left side collision
	if(oldRightSide <= wallLeftBound &&
		wallLeftBound < nextRightSide){

		if(nextY + entity.halfHeight >= this.cy - this.halfHeight &&
			nextY - entity.halfHeight <= this.cy + this.halfHeight){


			this.stopMeLeft(entity);
			return entity.SIDE_COLLISION;
		}
	} 

	var oldLeftSide = oldX - entity.halfWidth;
	var nextLeftSide  = nextX - entity.halfWidth;
	var wallRightBound = this.getRightBound();

	//check for right side collision
	if(oldLeftSide >= wallRightBound &&
		wallRightBound > nextLeftSide){

		if(nextY + entity.halfHeight >= this.cy - this.halfHeight &&
			nextY - entity.halfHeight <= this.cy + this.halfHeight){

			this.stopMeRight(entity);
			return entity.SIDE_COLLISION;
		}
	} 

	var oldLowerBoundEnt = oldY + entity.halfHeight;
	var nextLowerBoundEnt = nextY + entity.halfHeight;
	var wallUpperBound = this.getUpperBound();

	// oldLowerBoundEnt >= platformUpperBound > nextLowerBoundEnt
	if (oldLowerBoundEnt <= wallUpperBound &&
		wallUpperBound < nextLowerBoundEnt) {
		// Checks X axis
		if (nextX + entity.halfWidth >= this.cx - this.halfWidth &&
			nextX - entity.halfWidth <= this.cx + this.halfWidth) {
			this.groundMe(entity);
			return entity.TOP_COLLISION;
		}
	}


	return false;
}

Wall.prototype.update = function(dt)
{
	spatialManager.unregister(this);
	spatialManager.register(this);
	return;
};

Wall.prototype.getRadius = function() {
	return this.halfHeight;
};

Wall.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};

Wall.prototype.getRightBound = function() {
	return this.cx + this.halfWidth;
};

Wall.prototype.getLeftBound = function() {
	return this.cx - this.halfWidth;
};
