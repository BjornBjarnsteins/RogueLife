"use strict";

var dungeon = {
	// first room
	_currentRoom : null,

	_nextRoomID : 1,

	getNewRoomID : function () {
		return this._nextRoomID++;
	},

	init : function () {
		this.initializeDungeonGrid();
		this.currentPosX = 5;
		this.currentPosY = 5;
		this._currentRoom = this.grid[this.currentPosX][this.currentPosY];
		entityManager._currentRoomID = this._currentRoom.getRoomID();
	},

	// TODO: randomize dungeon generation
	initializeDungeonGrid : function () {
		this.grid = new Array(10);
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
		for (var i = 0; i < this.grid.length; i++) {
			for (var j = 0; j < this.grid[i].length; j++) {
				var room = this.grid[i][j];
				if (this.grid[i-1] && this.grid[i-1][j]) room.addLeftExit();
				if (this.grid[i+1] && this.grid[i+1][j]) room.addRightExit();
				if (this.grid[i][j-1]) room.addTopExit();
				if (this.grid[i][j+1]) room.addBottomExit();
			}
		}
	},

	enterRoom : function (room, character) {
		console.log("entering room " + room);
		this._currentRoom = room;
		entityManager.setRoom(room);
		room.enter(character);
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

	updatePosition : function (character) {
		this.enterRoom(this.grid[this.currentPosX][this.currentPosY], character);
	},

	getCurrentRoom : function () {
		return this._currentRoom;
	}
};
