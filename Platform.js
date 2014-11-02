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
	if (entity.velY < 0) return;
	entity.velY = 0;
	entity.cy=util.clampRange(entity.cy,
							  this.cy - this.halfWidth,
							  entity.cy);

};

Platform.prototype.update = function(dt)
{
	spatialManager.register(this);
	return;
};

Platform.prototype.getRadius = function() {
	return this.halfWidth;
};
