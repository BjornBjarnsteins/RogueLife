Particle = function (descr) {
	this.setup(descr);

	this.halfHeight = Math.floor(Math.random()*5)+3;
	this.velX =  Math.floor(Math.random()*5)+1;
	if(Math.random() < 0.5){
		this.velX = -this.velX;
	}
	this.velY =  Math.floor(Math.random()*5)-10;
	this.lifeSpan = Math.floor(Math.random()*30)+60;
	this.originalLifeSpan = this.lifeSpan;
};

Particle.prototype = new Entity();

Particle.prototype.takeDamage = function(a){
	return;
};


Particle.prototype.update = function (dt) {
	
	this.lifeSpan -= dt;
	var accelX=0;
    var accelY=this.computeGravity();

    var fallsThrough = false;

    var oldX = this.cx;
	var oldY = this.cy;

	this.applyAccel(accelX,accelY,dt);

	var nextX = this.cx + this.aveVelX * dt;
    var nextY = this.cy + this.aveVelY * dt;

    this.cx += dt * this.aveVelX;
    this.cy += dt * this.aveVelY;

    if(this.lifeSpan < 0){
    	return this.KILL_ME_NOW;
    }

};



Particle.prototype.render = function (ctx) {

	ctx.save();
	ctx.globalAlpha= (this.lifeSpan/this.originalLifeSpan);
	ctx.fillStyle = this.colr;
	ctx.fillRect(this.cx-this.halfHeight,this.cy-this.halfHeight,this.halfHeight*2,this.halfHeight*2)
	ctx.restore();
};
