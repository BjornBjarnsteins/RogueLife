"use strict";
var dungeon = {
	// first room
	_currentRoom : null,

	_nextRoomID : 1,

	_showMap : false,

	_showFullMap : false,

	KEY_SHOW_MAP : 9, //tab

	KEY_SHOW_FULL_MAP : keyCode("T"),

	getNewRoomID : function () {
		return this._nextRoomID++;
	},

	init : function (player) {
		console.log("initializing dungeon");
		this.currentPosX = 0;
		this.currentPosY = 0;
		this.initializeDungeonGrid();
		this._currentRoom = this.grid[this.currentPosX][this.currentPosY];
		this._currentRoom.isVisited = true;
		entityManager._currentRoomID = this._currentRoom.getRoomID();
	},

	initializeDungeonGrid : function () {
		this.grid = new Array(10);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(10);
			for (var j = 0; j < this.grid[i].length; j++) {
				this.grid[i][j] = new Room();

				console.log(this.grid[i][j]._roomID)

				var adjacent = [];
				/*if (this.grid[i - 1]) adjacent.push(this.grid[i - 1][j]);
					if (this.grid[i][j - 1]) adjacent.push(this.grid[i][j - 1]);*/

				this.grid[i][j].interiorDesign(getRandomScheme(adjacent));
				if(i===1 && j===0){
					this.grid[i][j].insertDoor();

				}
			}
		}

		this.grid[0][0] = new Room();
		this.grid[0][0].interiorDesign(getOutSideScheme());

		this.addExits();
	},

	addExits : function () {
		// Crappy fill everything implementation
		/*for (var i = 0; i < this.grid.length; i++) {
				for (var j = 0; j < this.grid[i].length; j++) {
					var room = this.grid[i][j];
					if (this.grid[i-1] && this.grid[i-1][j]) room.addLeftExit();
					if (this.grid[i+1] && this.grid[i+1][j]) room.addRightExit();
					if (this.grid[i][j-1]) room.addTopExit();
					if (this.grid[i][j+1]) room.addBottomExit();
				}
			}*/

		// Drunkard's walk algorithm
		this.drunkardsWalk(150);

	},

	drunkardsWalk : function (steps) {
		var i = 0;

		var posX = this.currentPosX;
		var posY = this.currentPosY;

		var largestX = 0;
		var largestY = 0;

		while (i < steps) {
			var stepSeed = Math.floor(Math.random()*4);
			if (stepSeed === 0) {
				// step up
				if(posX === 0 && posY === 1 ) continue;
				if (!this.grid[posX][posY-1]) continue;

				this.grid[posX][posY--].addTopExit();
				this.grid[posX][posY].addBottomExit();
			} else if (stepSeed === 1) {
				// step down
				if(posX === 0 && posY === 0 ) continue;
				if (!this.grid[posX][posY+1]) continue;

				this.grid[posX][posY++].addBottomExit();
				this.grid[posX][posY].addTopExit();
				if(largestY < posY ){
					largestY = posY;
				}
			} else if (stepSeed === 2) {
				// step left
				if(posX === 1 && posY === 0 ) continue;
				if (!this.grid[posX-1]) continue;

				this.grid[posX--][posY].addLeftExit();
				this.grid[posX][posY].addRightExit();
			} else {
				//step right
				if (!this.grid[posX+1]) continue;

				this.grid[posX++][posY].addRightExit();
				this.grid[posX][posY].addLeftExit();

				if(largestX < posX ){
					largestX = posX;
				}
			}

			i++;
		}


		this.makeOutdoors();

		this.removeInaccessibleRooms(largestX,largestY);

		this.printLayoutToConsole();
	},

	removeInaccessibleRooms : function (largestX,largestY) {
		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {

				if (!this.grid[largestX][largestY].isAccessible())largestX--
				if (!this.grid[i][j].isAccessible()) {
					this.grid[i][j].emptyRoom();
					delete this.grid[i][j];
				}
			}
		}


		this.grid[largestX][largestY].makeKey();
	},

	makeOutdoors : function(){
		this.grid[0][0].addRightExit();
		this.grid[1][0].addLeftExit();
	},

	clearDungeon : function() {
		var character = entityManager._getPlayer();

		for (var i = 0; i < this.grid.length; i++) {
			if (!this.grid[i]) continue;

			for (var j = 0; j < this.grid[i].length; j++) {
				if (this.grid[i][j]) {
					this.grid[i][j].emptyRoom();
					delete this.grid[i][j];
				}
			}
		}

		return character;
	},

	enterRoom : function (room, character) {

		this._currentRoom = room;
		entityManager.setRoom(room);
		room.enter(character);
	},

	goUp : function (character) {

		entityManager._oldRoomID = this._currentRoom.getRoomID();
		this.currentPosY--;
		this.updatePosition(character);
	},

	goDown : function (character) {

		entityManager._oldRoomID = this._currentRoom.getRoomID();
		this.currentPosY++;
		this.updatePosition(character);
	},

	goRight : function (character) {

		entityManager._oldRoomID = this._currentRoom.getRoomID();
		this.currentPosX++;
		this.updatePosition(character);
	},

	goLeft : function (character) {

		entityManager._oldRoomID = this._currentRoom.getRoomID();

		this.currentPosX--;
		this.updatePosition(character);
	},

	setPosition : function (x, y) {
		this.currentPosX = x;
		this.currentPosY = y;
		this.updatePosition();
	},

	updatePosition : function (character) {
		this.enterRoom(this.grid[this.currentPosX][this.currentPosY], character);
	},

	getCurrentRoom : function () {
		return this._currentRoom;
	},

	printLayoutToConsole : function () {
		for (var i = 0; i < this.grid.length; i++) {
			var lineString1 = "";
			var lineString2 = "";
			for (var j = 0; j < this.grid[i].length; j++) {
				if (!this.grid[j][i] ||
					!this.grid[j][i].isVisited) {
					lineString1 += "    ";
					lineString2 += "    ";
				} else {
					if (j=== this.currentPosX &&
						i === this.currentPosY) {
						lineString1 += "@ ";
					} else {
						lineString1 += "# ";
					}

					if (this.grid[j][i].hasRightExit) lineString1 += "- ";
					else lineString1 += "  ";

					if (this.grid[j][i].hasBottomExit) lineString2 += "|   ";
					else lineString2 += "    ";
				}
			}
		}
	},

	update : function (du) {
		if (eatKey(this.KEY_SHOW_MAP)) this._showMap = !this._showMap;

		if (eatKey(this.KEY_SHOW_FULL_MAP)) this._showFullMap = !this._showFullMap;

		//console.log("showFullMap: " + this._showFullMap);
		//console.log("showMap: " + this._showMap);
	},

	mapHeight : g_canvas.height*0.5,

	mapWidth : g_canvas.height*0.5,

	mapX : 200,

	mapY : 100,

	mapCellSpacing : 30,

	mapCellSize : 20,

	pathWidth : 10,

	drawMap : function (ctx) {
		ctx.save();

		// semitransparent overlay
		ctx.globalAlpha = 0.25;
		util.fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height, "black");

		var gap = this.mapCellSpacing - this.mapCellSize;

		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				var fill = "white";
				if (this.grid[j][i] &&
					(this.grid[j][i].isVisited ||
					 this._showFullMap)) {
					if (j === this.currentPosX &&
						i === this.currentPosY) {
						fill = "red";
					}

					var cellX = this.mapX + this.mapCellSpacing*j;
					var cellY = this.mapY + this.mapCellSpacing*i;

					// draw the cell itself
					util.fillBox(ctx,
								 cellX,
								 cellY,
								 this.mapCellSize,
								 this.mapCellSize,
								 fill);

					// draw the exits
					if (this.grid[j][i].hasRightExit) {
						util.fillBox(ctx,
									 cellX + this.mapCellSize,
									 cellY + this.mapCellSize/2 - this.pathWidth/2,
									 gap,
									 this.pathWidth,
									 "white");
					}

					if (this.grid[j][i].hasLeftExit) {
						util.fillBox(ctx,
									 cellX - gap,
									 cellY + this.mapCellSize/2 - this.pathWidth/2,
									 gap,
									 this.pathWidth,
									 "white");
					}

					if (this.grid[j][i].hasTopExit) {
						util.fillBox(ctx,
									 cellX + this.mapCellSize/2 - this.pathWidth/2,
									 cellY - gap,
									 this.pathWidth,
									 gap,
									 "white");
					}

					if (this.grid[j][i].hasBottomExit) {
						util.fillBox(ctx,
									 cellX + this.mapCellSize/2 - this.pathWidth/2,
									 cellY + this.mapCellSize,
									 this.pathWidth,
									 gap,
									 "white");
					}
				}
			}
		}

		ctx.restore();
	},

	render : function (ctx) {
		if (this._showMap) this.drawMap(ctx);
	}
};
