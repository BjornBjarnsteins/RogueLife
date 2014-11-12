Wall = function(descr)
{
    this.setup(descr);
};

Wall.prototype = new Entity();
Wall.prototype.halfWidth = 20;
Wall.prototype.halfHeight = 150;
Wall.prototype.type = "b";



Wall.prototype.render = function(ctx){

	ctx.save();
	/*util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "blue");*/


	if(this.type === "w"){
		var sx = g_sprites.wall.sx;
		var sy = g_sprites.wall.sy;
		var height = g_sprites.wall.height;
		var width = g_sprites.wall.width;
		var image = g_sprites.wall;
		var x = this.cx;
		var y = this.cy+1;

		g_sprites.wall.drawWall(ctx, image, sx, sy, x, y, height, width);
	}else if(this.type === "g"){
		var sx = g_sprites.Ground.sx;
		var sy = g_sprites.Ground.sy;
		var height = g_sprites.Ground.height;
		var width = g_sprites.Ground.width;
		var image = g_sprites.Ground;
		var x = this.cx;
		var y = this.cy+1;

		g_sprites.Ground.drawWall(ctx, image, sx, sy, x, y, height, width);
	}else{
		return;
	}
	
	ctx.restore();
};


Wall.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};

// side is the side of the wall to which entity should snap, -1 for left, 1 for right
Wall.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy);
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
