Powerup = function (descr) {
	this.setup(descr);

	this.initializeEffects();

	this.randomizeEffect();
};

Powerup.prototype = new Entity();
Powerup.prototype.halfHeight = 20;
Powerup.prototype.halfWidth = 20;
Powerup.prototype.velX = 0;
Powerup.prototype.velY = 1;

Powerup.prototype.takeDamage = function(a){
	return;
};

Powerup.prototype.update = function (du) {

	console.log("cx = " + this.cx)
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

	//this.cx += this.aveVelX * du;
	this.cy += this.aveVelY * du;

	spatialManager.register(this);
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
	player.score += 5;
	entityManager._removePowerup(this, entityManager._currentRoomID);
	spatialManager.unregister(this);
};

Powerup.prototype.randomizeEffect = function () {
	var isPermanent = Math.floor(Math.random()*2);

	var effectsArray = isPermanent ? this.permanentEffects : this.temporaryEffects;

	var seed = Math.floor(Math.random()*effectsArray.length);

	this.effect = effectsArray[seed].effect;

	if (effectsArray[seed].sprite) {
		this.sprite = effectsArray[seed].sprite;
	} else {
		this.sprite = g_sprites.unknownEffect;
	}
};

Powerup.prototype.render = function (ctx) {
	if (this.sprite) {
		this.sprite.drawCentredAt(ctx, this.cx, this.cy, 0);
	} else {
		util.fillCircle(ctx, this.cx, this.cy, this.halfWidth, "red");
	}
};

Powerup.prototype.initializeEffects = function () {
	this.permanentEffects = [
		{effect : function (player) {
			player.maxLife += 10;
			player.life += 10;
			player.sendMessage("+10 max HP", "yellow");
		},
		 sprite : g_sprites.plusMaxHealth
		},

		{effect : function (player) {
			player.energyRegen += 1.1;
			player.sendMessage("+1.1 energy regen", "yellow");
		}
		},
		{effect : function (player) {
			//player.attack += x
			player.sendMessage("+x attack", "yellow");
		}
		},
		{effect : function (player) {
			player.maxJumps++;
			player.sendMessage("+1 air jump", "yellow");
		}
		},
		{effect : function (player) {
			player.increaseAttack(2);
			player.sendMessage("+2 attack power", "yellow");
		}
		}

	];

	this.temporaryEffects = [
		{effect : function (player) {
			player.tempSpeedBonus += 1;
			player.sendMessage("speed boost!", "green");
		}
		},
		{effect : function (player) {
			player.gainLife(50);
			player.sendMessage("+50 HP", "green");
		}
		},
		{effect : function (player) {
			player.ammo += 3;
			player.sendMessage("+3 daggers", "green");
		},
		 sprite : g_sprites.dagger
		}

	];
};
