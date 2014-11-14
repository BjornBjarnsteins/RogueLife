Powerup = function (descr) {
	this.setup(descr);

	this.randomizeEffect();
};

Powerup.prototype = new Entity();
Powerup.prototype.halfHeight = 10;
Powerup.prototype.halfWidth = 10;
Powerup.prototype.velX = 0;
Powerup.prototype.velY = 1;

Powerup.prototype.takeDamage = function(a){
	return;
};

Powerup.prototype.update = function (du) {
	spatialManager.unregister(this);

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
		collisionCode = util.maybeCall(hitObstacles[i].collidesWith,
									   hitObstacles[i],
									   [this, oldX, oldY, nextX, nextY, false]);

		this.resolveCollision(collisionCode);
	}

	this.cx += this.aveVelX * du;
	this.cy += this.aveVelY * du;

	spatialManager.register(this)
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

Powerup.prototype.resolveEffect = function (player) {
	this.effect(player);
	entityManager._removePowerup(this, entityManager._currentRoomID);
	spatialManager.unregister(this);
};

Powerup.prototype.permanentEffects = [
	{effect : function (player) {
			console.log("+10 hp");
			player.life += 10;
		}
	},

	{effect : function (player) {
			console.log("+5 energy regen");
			player.energyRegen += 5;
		}
	}
	];

Powerup.prototype.randomizeEffect = function () {
	var isPermanent = Math.floor(Math.random()*2);

	if (isPermanent) {
		var seed = Math.floor(Math.random()*this.permanentEffects.length);

		console.log(seed);

		this.effect = this.permanentEffects[seed].effect;

		if (this.permanentEffects[seed].sprite) {
			this.sprite = this.permanentEffects[seed].sprite;
		} else {
			this.sprite = g_sprites.unknownEffect;
		}

		console.log(this.effect);
		console.log(this.sprite);
	} else {
		this.effect = function () { console.log("temporary"); };

		this.sprite = g_sprites.unknownEffect;
	}
};

Powerup.prototype.render = function (ctx) {
	console.log("("+this.cx+","+this.cy+")");
	if (this.sprite) {
		this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0);
	} else {
		util.fillCircle(ctx, this.cx, this.cy, this.halfWidth, "red");
	}
};
