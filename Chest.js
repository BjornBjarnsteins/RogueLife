Chest = function(descr){
	this.setup(descr);
}

Chest.prototype = new Entity();
Chest.prototype.halfHeight = 25;
Chest.prototype.halfWidth = 50;
Chest.prototype.Dead = false;

Chest.prototype.render = function(ctx){

		ctx.save();
		var x = this.cx-50;
		var y = this.cy+1-this.halfHeight;

		g_sprites.Chest.drawAt(ctx, x, y);

		
		

			ctx.restore();
		
}

Chest.prototype.takeDamage = function(amnt){

	
	this.Dead = true;
}

Chest.prototype.update = function(dt){
	spatialManager.unregister(this);

	if(this.Dead){

		this.dropPowerUp();
		this.kill();
		g_audio.breaking.Play();
		for(var i = 0; i < 5; i++){
			entityManager._generateParticles({	cx : this.cx,
										cy : this.cy,
										colr : "pink"},
										entityManager._currentRoomID);
		}
		return this.KILL_ME_NOW;
	}

	if(this.roomID === entityManager._currentRoomID){
		spatialManager.register(this);
	}

}

Chest.prototype.dropPowerUp = function(){

	var randomxVel = Math.floor(Math.random()*5);

	if(Math.random() > 0.5){
		randomxVel = -randomxVel;
	}

	entityManager._spawnPowerup({	cx : this.cx,
									cy : this.cy,
									velX : randomxVel,
									velY : -5},
									entityManager._currentRoomID);

}

Chest.prototype.getRadius = function(){
	return this.halfWidth;
}

Chest.prototype.groundMe = function (entity){
	util.maybeCall(entity.landOn,
				   entity,
				   [this.getUpperBound()]);
};

// side is the side of the Chest to which entity should snap, -1 for left, 1 for right
Chest.prototype.stopMe = function (entity, side){
	util.maybeCall(entity.snapTo,
				   entity,
				   [this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy]);
};

// Assumes entity is within the bounding circle
Chest.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
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
				this.groundMe(entity);
				return entity.TOP_COLLISION;
			} else if (entity.getUpperBound() >= this.getLowerBound()) {
        entity.snapTo(entity.cx, this.getLowerBound() + entity.halfHeight);
				return entity.BOTTOM_COLLISION;
			} else if (oldX < this.cx){
				this.stopMe(entity, -1);
			} else {
				this.stopMe(entity, 1);
			}

			return entity.SIDE_COLLISION;
		}
	}

	return false;
}
