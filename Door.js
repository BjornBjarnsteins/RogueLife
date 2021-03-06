Door = function(descr){
	this.setup(descr);
}

Door.prototype = new Entity();
Door.prototype.halfHeight = 25;
Door.prototype.halfWidth = 50;
Door.prototype.ShouldPlay = true;
Door.prototype.ShouldPlay2 = true;


Door.prototype.render = function(ctx){


		ctx.save();
		var x = this.cx-25;
		var y = this.cy+1-this.halfHeight;

		g_sprites.Gate.drawAt(ctx, x, y);

		ctx.restore();
		
}

Door.prototype.takeDamage = function(amnt){

	return;
}

Door.prototype.update = function(dt){

	if(this.locked){
		if(this.cy < 500 ){
			this.cy += dt;
			if(this.ShouldPlay2){
					g_audio.Door.Play();
					this.ShouldPlay2 = false;
				}
		}
	}else{
		if(entityManager._currentRoomID === 11){
			if(this.cy > 400){
				if(this.ShouldPlay){
					g_audio.Door.Play();
					this.ShouldPlay = false;
				}
				this.cy -= dt;
			}
		}
	}

	return;

}

Door.prototype.getRadius = function(){
	return this.halfWidth;
}

Door.prototype.groundMe = function (entity){
	util.maybeCall(entity.landOn,
				   entity,
				   [this.getUpperBound()]);
};

// side is the side of the Door to which entity should snap, -1 for left, 1 for right
Door.prototype.stopMe = function (entity, side){
	util.maybeCall(entity.snapTo,
				   entity,
				   [this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy]);
};

// Assumes entity is within the bounding circle
Door.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {

	if(this.locked){
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
	}
	return false;
}
