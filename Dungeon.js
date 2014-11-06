"use strict";

console.log("initiating dungeon");

var dungeon = {
	// first room
	_currentRoom : null,

	_nextRoomID : 1,

	getNewRoomID : function () {
		return this._nextRoomID++;
	},

	init : function () {
		this._currentRoom = new Room();
		this.enterRoom(this._currentRoom);
		this._currentRoom.interiorDesign(this._currentRoom.scheme);
	},

	// TODO: láta þennan hlut halda utan um öll herbergi

	enterRoom : function (room) {
		this.currentRoom = room;
		entityManager.setRoom(room);
		//room.enter();
	},

	getCurrentRoom : function () {
		return this._currentRoom;
	}
};

console.log(dungeon);
