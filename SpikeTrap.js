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
SpikeTrap.prototype.isActive = false;

SpikeTrap.prototype.activateTrap = function(){
	
	if(!this.isActive){
		this.timeActive = 0.7*SECS_TO_NOMINALS;
		this.isActive = true
	}
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
	/*util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "blue");*/

	var sx = g_sprites.Trap.sx;
	var sy = g_sprites.Trap.sy;
	var height = g_sprites.Trap.height;
	var width = g_sprites.Trap.width;
	var image = g_sprites.Trap;
	var x = this.cx;
	var y = this.cy+1;

	g_sprites.Trap.drawWall(ctx, image, sx, sy, x, y, height, width);


	ctx.restore();


};
SpikeTrap.prototype.update = function(du){

	if(this.timeActive > 0){
		this.timeActive -= du;
	}else{
		this.timeActive = 0;
		this.trap = false;
		this.isActive = false;
	}
	if(this.timeActive < (0.5*SECS_TO_NOMINALS) && this.isActive){
		this.trap = true;

	}
	if(this.timeActive  < (0.4*SECS_TO_NOMINALS) ){
		this.offset = 2*this.timeActive;
	}else{
		this.offset = 10;
	}
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
					console.log(this.trap)
					if(this.trap){
						entity.takeDamage(10);
						entity.cy -=25;
						return -1;
					}else{
						return entity.BOTTOM_COLLISION;
					}

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
