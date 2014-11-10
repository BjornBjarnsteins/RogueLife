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