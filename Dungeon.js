"use strict";

var dungeon = {
	// first room
	_currentRoom : null,

	_nextRoomID : 1,

	_showMap : false,

	getNewRoomID : function () {
		return this._nextRoomID++;
	},

	init : function () {
		this.currentPosX = 5;
		this.currentPosY = 5;
		this.initializeDungeonGrid();
		this._currentRoom = this.grid[this.currentPosX][this.currentPosY];
		entityManager._currentRoomID = this._currentRoom.getRoomID();
	},

	initializeDungeonGrid : function () {
		this.grid = new Array(10);
		this.mapGrid = new Array(10);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(10);
			for (var j = 0; j < this.grid[i].length; j++) {
				this.grid[i][j] = new Room();
				this.grid[i][j].interiorDesign(getRandomScheme());
			}
		}

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

		while (i < steps) {
			var stepSeed = Math.floor(Math.random()*4);

			if (stepSeed === 0) {
				// step up
				if (!this.grid[posX][posY-1]) continue;

				this.grid[posX][posY--].addTopExit();
				this.grid[posX][posY].addBottomExit();
			} else if (stepSeed === 1) {
				// step down
				if (!this.grid[posX][posY+1]) continue;

				this.grid[posX][posY++].addBottomExit();
				this.grid[posX][posY].addTopExit();
			} else if (stepSeed === 2) {
				// step left
				if (!this.grid[posX-1]) continue;

				this.grid[posX--][posY].addLeftExit();
				this.grid[posX][posY].addRightExit();
			} else {
				//step right
				if (!this.grid[posX+1]) continue;

				this.grid[posX++][posY].addRightExit();
				this.grid[posX][posY].addLeftExit();
			}

			i++;
		}

		this.removeInaccessibleRooms();

		this.printLayoutToConsole();
	},

	removeInaccessibleRooms : function () {
		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				if (!this.grid[i][j].isAccessible()) delete this.grid[i][j];
			}
		}
	},

	enterRoom : function (room, character) {
		this._currentRoom = room;
		entityManager.setRoom(room);
		room.enter(character);
		this.printLayoutToConsole();
	},

	goUp : function (character) {
		this.currentPosY--;
		this.updatePosition(character);
	},

	goDown : function (character) {
		this.currentPosY++;
		this.updatePosition(character);
	},

	goRight : function (character) {
		this.currentPosX++;
		this.updatePosition(character);
	},

	goLeft : function (character) {
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
		console.log("dungeon layout:");

		for (var i = 0; i < this.grid.length; i++) {
			var lineString1 = "";
			var lineString2 = "";
			for (var j = 0; j < this.grid[i].length; j++) {
				if (!this.grid[j][i]) {
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
			console.log(lineString1);
			console.log(lineString2);
		}
	}
};
