Powerup = function (descr) {
	this.setup(descr);
};

Powerup.prototype = new Entity();
Powerup.prototype.halfHeight = 10;
Powerup.prototype.halfWidth = 10;
Powerup.prototype.velY = 7;

Powerup.prototype.update = function (du) {
	var accelX = 0;
	var accelY = this.computeGravity();

	var oldX = this.cx;
	var oldY = this.cy;

	this.applyAccel(accelX, accelY, du);

	var nextX = this.cx + this.aveVelX * du;
	var nextY = this.cy + this.aveVelY * du;

	var hitObstacles = dungeon.getCurrentRoom().getObstaclesInRange(this);

	var collisionCode = -1;

	for (var i = 0; i < hitObstacles.length; i++) {
		if(!hitObstacles[i]._isDeadNow){
			collisionCode = util.maybeCall(hitObstacles[i].collidesWith,
									   hitObstacles[i],
									   [this, oldX, oldY, nextX, nextY, false]);
		}
		this.resolveCollision(collisionCode);
	}

	this.cx += this.aveVelX * du;
	this.cy += this.aveVelY * du;
};

Powerup.prototype.resolveCollision = function(collisionCode) {
	if (collisionCode === this.TOP_COLLISION ||
	    collisionCode === this.BOTTOM_COLLISION) {
		this.velY = -this.velY*0.5;

		if (Math.abs(this.velY) < 1) {
			this.velY = 0;
			this.landOn = function (surfaceY) {
				this.cy = surfaceY - this.halfHeight;
			};
		}

		this.aveVelY = 0;
	} else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	}
};

Powerup.prototype.render = function (ctx) {
	// placeholder
	// við viljum hafa sprites
	util.fillCircle(ctx, this.cx, this.cy, this.halfWidth, "red");
};
