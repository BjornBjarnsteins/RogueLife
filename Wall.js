Wall = function(descr)
{
    this.setup(descr);
};

Wall.prototype = new Entity();
Wall.prototype.halfWidth = 20;
Wall.prototype.halfHeight = 150;



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

// side is the side of the wall to which entity should snap, -1 for left, 1 for right
Wall.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*this.halfWidth + side*entity.halfWidth, entity.cy);
};

// Assumes entity is within the bounding circle
Wall.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
	var entUpperBound = nextY - entity.halfHeight;
	var entLowerBound = nextY + entity.halfHeight;
	var entRightBound = nextX + entity.halfWidth;
	var entLeftBound  = nextX - entity.halfWidth;

	if (entLeftBound  <= this.getRightBound() &&
		entRightBound >= this.getLeftBound()) {
		if (entLowerBound >= this.getUpperBound() &&
			entUpperBound <= this.getLowerBound()) {
			// checks for collision details

			if (entity.getLowerBound() <= this.getUpperBound()) {
				this.groundMe(entity);
				return entity.TOP_COLLISION;
			} else if (entity.getUpperBound() >= this.getLowerBound()) {
        entity.snapTo(entity.cx, this.getLowerBound() + entity.halfHeight);
				return entity.BOTTOM_COLLISION;
			} else if (oldX < this.cx){
				this.stopMe(entity, -1);
			} else {
				this.stopMe(entity, 1);
			}

			return entity.SIDE_COLLISION;
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
	return this.halfHeight*1.7;
};

/*Wall.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};

Wall.prototype.getRightBound = function() {
	return this.cx + this.halfWidth;
};

Wall.prototype.getLeftBound = function() {
	return this.cx - this.halfWidth;
};*/
