Character = function(descr)
{
    this.setup(descr);
};

Character.prototype = new Entity();
Character.prototype.cy =g_canvas.height-150;
Character.prototype.halfHeight=40;
Character.prototype.halfWidth=20;
Character.prototype.cx=g_canvas.width/2;
Character.prototype.velX=0;
Character.prototype.velY=0;
Character.prototype.aveVelX=0;
Character.prototype.aveVelY=0;
Character.prototype.weapon=null;
// Direction is either 1 or -1. 1 means right, -1 means left
Character.prototype.direction=1;
// Placeholder value
Character.prototype.maxJumps = 3;
Character.prototype.jumpsLeft = 3;
Character.prototype.inAir = false;
Character.prototype.isDashing = false;
Character.prototype.dashSpeed = 50;
Character.prototype.dashDuration = 0.1*SECS_TO_NOMINALS;
Character.prototype.currentDashDuration = 0;

Character.prototype.KEY_UP = "W".charCodeAt(0);
Character.prototype.KEY_DOWN = "S".charCodeAt(0);
Character.prototype.KEY_LEFT = "A".charCodeAt(0);
Character.prototype.KEY_RIGHT = "D".charCodeAt(0);
Character.prototype.KEY_THROW = " ".charCodeAt(0);
Character.prototype.KEY_DASH_RIGHT = "E".charCodeAt(0);
Character.prototype.KEY_DASH_LEFT = "Q".charCodeAt(0);

//TODO:Images and sounds for character

Character.prototype.update = function(dt)
{
    spatialManager.unregister(this)
    //Gravity computation should probably be moved
    //to entity manager when we get one of those up
    var accelX=0;
    var accelY=this.computeGravity();

    var oldX = this.cx;
	var oldY = this.cy;

    if(keys[this.KEY_LEFT] && !this.isDashing)
    {
		this.cx -=5;
		this.direction = -1;
    }

    if(keys[this.KEY_RIGHT] && !this.isDashing)
    {
		this.cx +=5;
		this.direction = 1;
    }

    //jumping code assumes we want to have jumps work
    //in such a way that if the character is falling
    //at too high a speed a jump will only slow him down
    //we might want to add a threshhold to make
    //sure he goes upward in all circumstances

    if(eatKey(this.KEY_UP) &&
	   this.hasJumpsLeft() &&
	   !this.isDashing)
    {
		this.jump();
    }

    var fallsThrough = false;
	if (eatKey(this.KEY_DOWN)) {
		fallsThrough = true;
	}

	if (eatKey(this.KEY_THROW)) {
		this.throwDagger();
	}

	if (eatKey(this.KEY_DASH_LEFT)) {
		this.dash(-1);
	} else if (eatKey(this.KEY_DASH_RIGHT)) {
		this.dash(1);
	}

	if (this.isDashing) {
		this.updateDash(dt);
	}


	var aveVel = this.applyAccel(accelX,accelY,dt);

	// s = s + v_ave * t
    var nextX = this.cx + this.aveVelX * dt;
    var nextY = this.cy + this.aveVelY * dt;

	var hitEntity = this.findHitEntity();

	var collisionCode = 0;

	collisionCode = util.maybeCall(hitEntity.collidesWith,
								   hitEntity,
								   [this, oldX, oldY, nextX, nextY, fallsThrough]);

	this.resolveCollision(collisionCode);

	//console.log("velX: " + this.velX + " velY: " + this.velY);
	//console.log("aveVelX: " + aveVel.X + " aveVelY: " + aveVel.Y);


	// s = s + v_ave * t
    this.cx += dt * this.aveVelX;
    this.cy += dt * this.aveVelY;

	var oldCy = this.cy;
	this.clampToBounds();

	if (this.cy !== oldCy) {
		this.velY = 0;
	}

	if (this.weapon) this.weapon.update(dt, this);

	spatialManager.register(this);

};

Character.prototype.resolveCollision = function(collisionCode) {
	if (collisionCode === this.TOP_COLLISION ||
	    collisionCode === this.BOTTOM_COLLISION) {
		this.velY = 0;
		this.aveVelY = 0;
	} else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	}
};

Character.prototype.hasJumpsLeft = function()
{
     return this.jumpsLeft !== 0;
};

Character.prototype.computeGravity = function()
{
    //placeholder
    //may be permanent
    return 1.2;
};

Character.prototype.applyAccel = function(accelX,accelY,dt)
{


    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;

    // v = u + at
    this.velX += accelX * dt;
    this.velY += accelY * dt;

    // v_ave = (u + v) / 2
	this.aveVelX = (oldVelX + this.velX) / 2;
	this.aveVelY = (oldVelY + this.velY) / 2;

};

Character.prototype.clampToBounds = function()
{
    var leftBoundary = 0+this.halfWidth;
    var rightBoundary = g_canvas.width-this.halfWidth;

    var topBoundary = 0+this.halfHeight;
    var bottomBoundary = g_canvas.height-this.halfHeight;

	var oldY = this.cy;
    //uses already provided clamping function
    this.cx=util.clampRange(this.cx,leftBoundary,rightBoundary);
    this.cy=util.clampRange(this.cy,topBoundary,bottomBoundary);

    if (this.cy < oldY) this.resetJumps();

};

Character.prototype.render = function (ctx)
{
    //Ævintýri rauða kassans!
    ctx.save();
    util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "red");

    ctx.restore();

	if (this.weapon) this.weapon.render(ctx);
};

Character.prototype.throwDagger = function() {
	entityManager._generateProjectile({cx : this.cx + this.direction*this.halfWidth,
								  	   cy : this.cy,

									   velX : 10*this.direction,
									   velY : 0});
};

Character.prototype.jump = function() {
	if (!this.hasJumpsLeft()) return;

	this.velY -= 25;
	this.jumpsLeft--;
	this.inAir = true;
};

Character.prototype.dash = function (dir) {
	if (!this.isDashing) {
		this.velX = dir*this.dashSpeed;
		this.currentDashDuration = 0;
		this.isDashing = true;
	}
};

Character.prototype.updateDash = function (du) {
	this.currentDashDuration += du;

	if (this.currentDashDuration >= this.dashDuration) {
		// stop dash
		this.velX = 0;
		this.isDashing = false;
	}
};

Character.prototype.landOn = function(surfaceY) {
	this.cy = surfaceY - this.halfHeight;
	this.velY = 0;
	this.inAir = false;
	this.resetJumps();
};

Character.prototype.snapTo = function (destX, destY) {
	this.cx = destX;
	this.cy = destY;
};

Character.prototype.resetJumps = function() {
	this.jumpsLeft = this.maxJumps;
};

Character.prototype.getRadius = function() {
	return this.halfHeight;
}
