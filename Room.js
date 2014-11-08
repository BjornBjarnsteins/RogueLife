"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

function Room(descr) {
	for (var property in descr) {
        this[property] = descr[property];
    }

	this._roomID = dungeon.getNewRoomID();

	this.grid = new Array(this.gridRows);

	for (var i = 0; i < this.grid.length; i++) {
		this.grid[i] = new Array(this.gridCols);
	}
};

Room.prototype.tileHeight = 50;
Room.prototype.tileWidth = 50;
Room.prototype.gridRows = 12;
Room.prototype.gridCols = 20;
Room.prototype.scheme = [
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "p", "p", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
	];

Room.prototype.insertWallAt = function (x, y) {
	var col = this.findColAt(x);
	var row = this.findRowAt(y);

	this.insertWallInTile(row, col);
};

Room.prototype.insertPlatformAt = function (x, y) {
	var col = this.findColAt(x);
	var row = this.findRowAt(y);

	this.insertPlatformInTile(row, col);
};

Room.prototype.insertWallInTile = function (row, col) {
	this.grid[row][col] = entityManager._makeWall({cx : col*this.tileWidth + this.tileWidth/2,
												   cy : row*this.tileHeight + this.tileHeight/2,

												   halfHeight : this.tileHeight/2,
												   halfWidth  : this.tileWidth/2});
};

Room.prototype.insertPlatformInTile = function (row, col) {
	this.grid[row][col] = entityManager._makePlatform({cx : col*this.tileWidth + this.tileWidth/2,
													   cy : row*this.tileHeight + 10,

													   halfWidth  : this.tileWidth/2});
};

Room.prototype.interiorDesign = function (scheme) {
	for (var row = 0; row < this.gridRows; row++) {
		for (var col = 0; col < this.gridCols; col++) {
			if (scheme[row][col] === "w") {
				this.insertWallInTile(row, col);
			}
			if (scheme[row][col] === "p") {
				this.insertPlatformInTile(row, col);
			}
		}
	}
};

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

Room.prototype.findColAt = function (x) {
	return Math.floor(x/this.tileWidth);
};

Room.prototype.findRowAt = function (y) {
	return Math.floor(y/this.tileHeight);
};

// assumes entity has a square hitbox
Room.prototype.getObstaclesInRange = function (entity) {
	var minRow = this.findRowAt(entity.getUpperBound());
	var maxRow = Math.min(this.findRowAt(entity.getLowerBound()) + 2, this.gridRows);

	var minCol = this.findColAt(entity.getRightBound());
	var maxCol = this.findColAt(entity.getLeftBound()) + 2;

	//console.log("rows: " + minRow + " - " + maxRow);
	//console.log("cols: " + minCol + " - " + maxCol);

	//console.log(this.grid[minRow][minCol]);

	var entitiesInRange = [];
/*
	for (var row = minRow - 1; row < maxRow; row++) {
		for (var col = minCol - 1; col < maxCol; col++) {
			if (this.grid[row][col]) entitiesInRange.push(this.grid[row][col]);
		}
	}*/

	// For now, just return all environment entities in the Room
	for (var row = 0; row < this.gridRows; row++) {
		for (var col = 0; col < this.gridCols; col++) {
			if (this.grid[row][col]) entitiesInRange.push(this.grid[row][col]);
		}
	}

	//console.log(entitiesInRange);

	return entitiesInRange;
};
