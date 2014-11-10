Spike = function(descr)
{
    this.setup(descr);
};

Spike.prototype = new Entity();
Spike.prototype.halfWidth = 20;
Spike.prototype.halfHeight = 150;

Spike.prototype.render = function(ctx){

	ctx.save();
	ctx.fillStyle = "gray";
	ctx.beginPath();
	ctx.moveTo(this.cx-this.halfWidth, this.cy+this.halfHeight);
	ctx.lineTo(this.cx, this.cy-this.halfHeight)
	ctx.lineTo(this.cx+this.halfWidth, this.cy+this.halfHeight)
	ctx.fill();
	ctx.restore();


};

Spike.prototype.update = function(du){
	return;
};

Spike.prototype.collidesWith = function(entity, oldX, oldY, nextX, nextY){

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

				entity.takeDamage(10);
				return -1;

			} else if (oldX < this.cx){
				this.stopMe(entity, -1);
			} else {
				this.stopMe(entity, 1);
			}

			return entity.SIDE_COLLISION;
		}
	}

	return false;

};

Spike.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy);
};

Spike.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};