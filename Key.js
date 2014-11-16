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
		

		util.fillCircle(ctx, this.cx-25, this.cy-25, this.halfWidth, "red");
	
};


Key.prototype.effect = function(player){

	console.log("WHY!!!!")
	entityManager._door[11][0].locked = false;
	player.hasKey = true;
}

Key.prototype.getRadius = function(){
	return 5;
}