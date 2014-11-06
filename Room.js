"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

function Room(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }

	this._roomID = dungeon.getNewRoomID();
};

Room.prototype.tileHeight = 50;
Room.prototype.tileWidth = 50;
Room.prototype.gridRows = 12;
Room.prototype.gridCols = 20;

Room.prototype.insertWallAt = function (x, y) {
	var col = Math.floor(x/this.tileWidth);
	var row = Math.floor(y/this.tileHeight);

	entityManager._makeWall({cx : col*this.tileWidth + this.tileWidth/2,
							 cy : row*this.tileHeight + this.tileHeight/2,

							 halfHeight : this.tileHeight/2,
							 halfWidth  : this.tileWidth/2});
};

Room.prototype.insertPlatformAt = function (x, y) {
	var col = Math.floor(x/this.tileWidth);
	var row = Math.floor(y/this.tileHeight);

	entityManager._makePlatform({cx : col*this.tileWidth + this.tileWidth/2,
							 	 cy : row*this.tileHeight + 10,

								 halfWidth  : this.tileWidth/2});
}

Room.prototype.render = function(ctx) {

	ctx.save();
	ctx.strokeStyle = "white";

	for (var i = 1; i < this.gridRows; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i*this.tileHeight);
		ctx.lineTo(g_canvas.width, i*this.tileHeight);
		ctx.stroke();
	}

	for (var i = 1; i < this.gridCols; i++) {
		ctx.beginPath();
		ctx.moveTo(i*this.tileWidth, 0);
		ctx.lineTo(i*this.tileWidth, g_canvas.height);
		ctx.stroke();
	}

	ctx.restore();
};

Room.prototype.getRoomID = function () {
	return this._roomID;
};
