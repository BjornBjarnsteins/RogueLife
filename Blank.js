Blank = function(descr)
{
    this.setup(descr);
};

Blank.prototype = new Entity();
Blank.prototype.halfWidth = 20;
Blank.prototype.halfHeight = 150;



Blank.prototype.render = function(ctx){

	return;
};


Blank.prototype.BlankMe = function (entity){
	entity.landOn(this.getUpperBound());
};

// side is the side of the Blank to which entity should snap, -1 for left, 1 for right
Blank.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy);
};

// Assumes entity is within the bounding circle
Blank.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
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
				this.BlankMe(entity);
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

Blank.prototype.update = function(dt)
{
	return;
};

Blank.prototype.getRadius = function() {
	return this.halfHeight*1.7;
};

/*Blank.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};

Blank.prototype.getRightBound = function() {
	return this.cx + this.halfWidth;
};

Blank.prototype.getLeftBound = function() {
	return this.cx - this.halfWidth;
};*/
