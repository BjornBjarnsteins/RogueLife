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
}

Room.prototype.isSetup = false;
Room.prototype.tileHeight = 50;
Room.prototype.tileWidth = 50;
Room.prototype.gridRows = 12;
Room.prototype.gridCols = 20;
Room.prototype.defaultScheme = [
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

Room.prototype.hasTopExit = false;
Room.prototype.hasBottomExit = false;
Room.prototype.hasRightExit = false;
Room.prototype.hasLeftExit = false;

Room.prototype.isVisited = false;

Room.prototype.insertWallAt = function (x, y) {
	var col = this.findColAt(x);
	var row = this.findRowAt(y);

	this.insertWallInTile(row, col, "w" );
};

Room.prototype.insertPlatformAt = function (x, y) {
	var col = this.findColAt(x);
	var row = this.findRowAt(y);

	this.insertPlatformInTile(row, col);
};

Room.prototype.emptyTileAt = function(x, y) {
	var col = this.findColAt(x);
	var row = this.findRowAt(y);

	this.emptyTile(row, col);
};

Room.prototype.emptyRoom = function () {
	console.log("emptying room: " + this._roomID);
	entityManager._emptyRoom(this._roomID);
};

Room.prototype.insertWallInTile = function (row, col, type) {
	if (this.grid[row][col]) return;
	var tipa = type;

	this.grid[row][col] = entityManager._makeWall({cx : col*this.tileWidth + this.tileWidth/2,
												   cy : row*this.tileHeight + this.tileHeight/2,

												   halfHeight : this.tileHeight/2,
												   halfWidth  : this.tileWidth/2,
												   type : tipa
												   },


												 this._roomID);
};

Room.prototype.insertPlatformInTile = function (row, col) {
	if (this.grid[row][col]) return;

	this.grid[row][col] = entityManager._makePlatform({cx : col*this.tileWidth + this.tileWidth/2,
													   cy : row*this.tileHeight + 10,

													   halfWidth  : this.tileWidth/2},

													 this._roomID);

};

Room.prototype.insertSpikeInTile = function (row, col) {
	if (this.grid[row][col]) return;

	this.grid[row][col] = entityManager._makeSpike({cx : col*this.tileWidth + this.tileWidth/2,
												   cy : row*this.tileHeight + this.tileHeight/2,

												   halfHeight : this.tileHeight/2,
												   halfWidth  : this.tileWidth/2},

												 this._roomID);
};

Room.prototype.SpawnChest = function (row, col) {
	if (this.grid[row][col]) return;

	this.grid[row][col] = entityManager._spawnChest({cx : col*this.tileWidth +50,
												   cy : row*this.tileHeight + this.tileHeight/2,
													roomID : this._roomID},

												 this._roomID);
};

Room.prototype.insertSpikeTrapInTile = function (row, col) {
	if (this.grid[row][col]) return;

	this.grid[row][col] = entityManager._makeSpikeTrap({cx : col*this.tileWidth + this.tileWidth/2,
												   cy : row*this.tileHeight + this.tileHeight/2,

												   halfHeight : this.tileHeight/2,
												   halfWidth  : this.tileWidth/2,
												   trap 	  : false	},

												 this._roomID);
};

Room.prototype.insertDoor = function () {

	this.grid[1][0] = entityManager._makeDoor({cx : 0*this.tileWidth + this.tileWidth/2 ,
												   cy : 10*this.tileHeight -100,

												   halfHeight : this.tileHeight,
												   halfWidth  : this.tileWidth/2,
												   locked 	  : false	},

												 this._roomID);
};

Room.prototype.makeKey = function (x,y) {

	this.grid[10][18] = entityManager._makeKey({     cx : 19*this.tileWidth - this.tileWidth,
												   cy : 11*this.tileHeight - this.tileHeight ,

												   halfHeight : 5,
												   halfWidth  : 5,
												   roomID 	  :	 this._roomID
												   	},

												 this._roomID);
};

Room.prototype.insertRangedEnemy = function (row,col)
{
    if(this.grid[row][col])
        return;
    this.grid[row][col] =entityManager._makeRangedEnemy({cx: col*this.tileHeight - 10,
                                                         cy:row *this.tileWidth,
                                                         roomID : this._roomID
                                                        },this._roomID);
}



Room.prototype.emptyTile = function (row, col) {
  if (this.grid[row][col] instanceof Wall) entityManager._removeWall(this.grid[row][col], this._roomID);
	else if (this.grid[row][col] instanceof Platform) entityManager._removePlatform(this.grid[row][col], this._roomID);
  /*else if (this.grid[row][col] instanceof Spike) entityManager._removeSpike(this.grid[row][col], this._roomID);
  else if (this.grid[row][col] instanceof SpikeTrap) entityManager._removeSpikeTrap(this.grid[row][col], this._roomID);
  else if (this.grid[row][col] instanceof Key) entityManager._removeKey(this._roomID);
  else if (this.grid[row][col] instanceof Door) entityManager._removeDoor(this._roomID);*/

	this.grid[row][col] = null;
};

Room.prototype.addLeftExit = function () {
	if (this.hasLeftExit) return;

	this.emptyTile(9, 0);
	this.emptyTile(10, 0);

	this.hasLeftExit = true;
};

Room.prototype.addRightExit = function () {
	if (this.hasRightExit) return;

	this.emptyTile(9, 19);
	this.emptyTile(10, 19);

	this.hasRightExit = true;
};

Room.prototype.addTopExit = function () {
	if (this.hasTopExit) return;

	this.emptyTile(0, 8);
	this.emptyTile(0, 9);
	this.emptyTile(0, 10);
	this.emptyTile(0, 11);

	this.hasTopExit = true;
};

Room.prototype.addBottomExit = function () {
	if (this.hasBottomExit) return;

	this.emptyTile(11, 8);
	this.emptyTile(11, 9);
	this.emptyTile(11, 10);
	this.emptyTile(11, 11);

	this.insertPlatformInTile(11, 8);
	this.insertPlatformInTile(11, 9);
	this.insertPlatformInTile(11, 10);
	this.insertPlatformInTile(11, 11);

	this.hasBottomExit = true;
};

Room.prototype.interiorDesign = function (scheme) {
	if (!scheme) scheme = this.defaultScheme;

	this.scheme = scheme;

	for (var row = 0; row < this.gridRows; row++) {
		for (var col = 0; col < this.gridCols; col++) {
			if (scheme[row][col] === "w" ) {
				this.insertWallInTile(row, col, "w");
			}
			if (scheme[row][col] === "g" ) {
				this.insertWallInTile(row, col, "g");
			}
			if (scheme[row][col] === "b" ) {
				this.insertWallInTile(row, col, "b");
			}
			if (scheme[row][col] === "p") {
				this.insertPlatformInTile(row, col);
			}
			if (scheme[row][col] === "S") {
				this.insertSpikeInTile(row, col);
			}
			if (scheme[row][col] === "T") {
				this.insertSpikeTrapInTile(row, col);
			}
			if (scheme[row][col] === "C") {
				if(Math.random() > 0.3 ){
					this.SpawnChest(row, col);
				}
			}
            if(scheme[row][col] === "R") {
            	if(Math.random() > 0.7 ){
					this.insertRangedEnemy(row,col);
				}
                
            }

		}
	}

	this.isSetup = true;
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

			if (this.grid[row][col]){
				entitiesInRange.push(this.grid[row][col]);
				//console.log(this.grid[row][col])
			}
		}
	}

	//console.log(entitiesInRange);

	return entitiesInRange;
};

Room.prototype.outSide = function(){


}

Room.prototype.enter = function (character) {
	if (!this.isSetup) this.interiorDesign(this.scheme);

	this.isVisited = true;

	if (character.cy < 0) character.snapTo(character.cx, g_canvas.height - character.halfHeight);
	else if (character.cy > g_canvas.height) character.snapTo(character.cx, character.halfHeight);
	else if (character.cx < 0) character.snapTo(g_canvas.width - character.halfWidth, character.cy);
	else if (character.cx > g_canvas.width) character.snapTo(character.halfWidth, character.cy);

};

Room.prototype.isAccessible = function () {
	return (this.hasTopExit || this.hasLeftExit || this.hasRightExit || this.hasBottomExit);
};
