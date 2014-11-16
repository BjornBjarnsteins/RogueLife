Key = function (descr) {
	this.setup(descr);
};

Key.prototype = new Entity();
Key.prototype.halfHeight = 10;
Key.prototype.halfWidth = 10;

Key.prototype.takeDamage = function(a){
	return;
};


Key.prototype.update = function (du) {
	spatialManager.unregister(this);

	if(this.roomID === entityManager._currentRoomID){
		spatialManager.register(this);
	}
};



Key.prototype.resolveEffect = function (player) {
	this.effect(player);
	entityManager._removeKey(entityManager._currentRoomID);
	spatialManager.unregister(this);
};

Key.prototype.render = function (ctx) {
		

	if(this.roomID === entityManager._currentRoomID){
		ctx.save();
		var x = this.cx-45;
		var y = this.cy-15;

		g_sprites.Key.drawAt(ctx, x, y);

		ctx.restore();
	}
		
	
};


Key.prototype.effect = function(player){

	entityManager._door[11][0].locked = false;
	player.hasKey = true;
}

Key.prototype.getRadius = function(){
	return 5;
}