Platform = function(descr)
{
    this.cx = descr.cx;
    this.cy = descr.cy;
};

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

Platform.prototype.groundMe(entity){
	entity.velY = 0;
	entity.cy=util.clampRange(this.cy,topBoundary,this.cy);

};

Platform.prototype.update = function(dt)
{
	return;
};