SpikeTrap = function(descr)
{
    this.setup(descr);
};

SpikeTrap.prototype = new Entity();
SpikeTrap.prototype.halfWidth = 20;
SpikeTrap.prototype.halfHeight = 150;
SpikeTrap.prototype.trap = false;
SpikeTrap.prototype.timeActive = 0;
SpikeTrap.prototype.offset = 0;

SpikeTrap.prototype.activateTrap = function(){
	console.log("here");
	this.trap = true;
	this.timeActive = 0.4*SECS_TO_NOMINALS;
};

SpikeTrap.prototype.render = function(ctx){

	ctx.save();
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(this.cx-this.halfWidth, this.cy+this.halfHeight-this.offset);
	ctx.lineTo(this.cx-(this.halfWidth/2), this.cy-this.halfHeight-this.offset)
	ctx.lineTo(this.cx, this.cy+this.halfHeight-this.offset)
	ctx.lineTo(this.cx+(this.halfWidth)/2, this.cy-this.halfHeight-this.offset)
	ctx.lineTo(this.cx+this.halfWidth, this.cy+this.halfHeight-this.offset)
	ctx.fill();

	util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "purple");

	ctx.restore();


};
SpikeTrap.prototype.update = function(du){

	if(this.timeActive > 0){
		this.timeActive -= du;
	}else{
		this.timeActive = 0;
		this.trap = false;
	}
	this.offset = 2*this.timeActive;
	return;
};

SpikeTrap.prototype.collidesWith = function(entity, oldX, oldY, nextX, nextY){

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

				this.activateTrap();
				entity.takeDamage(10);
				entity.cy -=25;
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

SpikeTrap.prototype.stopMe = function (entity, side){
	entity.snapTo(this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy);
};

SpikeTrap.prototype.groundMe = function (entity){
	entity.landOn(this.getUpperBound());
};