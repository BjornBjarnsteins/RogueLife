Ground = function(descr)
{
    this.setup(descr);
};

Ground.prototype = new Entity();
Ground.prototype.halfWidth = 20;
Ground.prototype.halfHeight = 150;



Ground.prototype.render = function(ctx){

	ctx.save();
	/*util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "blue");*/

	var sx = g_sprites.Ground.sx;
	var sy = g_sprites.Ground.sy;
	var height = g_sprites.Ground.height;
	var width = g_sprites.Ground.width;
	var image = g_sprites.Ground;
	var x = this.cx;
	var y = this.cy+1;

	g_sprites.Ground.drawWall(ctx, image, sx, sy, x, y, height, width);
	
	ctx.restore();
};


Ground.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};

// side is the side of the Ground to which entity should snap, -1 for left, 1 for right
Ground.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy);
};

// Assumes entity is within the bounding circle
Ground.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
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

Ground.prototype.update = function(dt)
{
	return;
};

Ground.prototype.getRadius = function() {
	return this.halfHeight*1.7;
};

/*Ground.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};

Ground.prototype.getRightBound = function() {
	return this.cx + this.halfWidth;
};

Ground.prototype.getLeftBound = function() {
	return this.cx - this.halfWidth;
};*/
