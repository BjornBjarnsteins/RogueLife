/*
placeholder that will need to be adapted for roguelife
TODO: adapt

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_characters  : [],
_platforms   : [],
_projectiles : [],
_walls       : [],
_spikes		 : [],
_spikestrap  : [],

weapon : null,

_currentRoomID : null,

setRoom : function (room) {
	var oldRoomID = this._currentRoomID;
	this._currentRoomID = room.getRoomID();
	if (this._characters[oldRoomID][0]) {
		this._characters[this._currentRoomID] = [this._characters[oldRoomID][0]];
		this._characters[oldRoomID].splice(0, 1);
	}
},

KEY_INSERT_WALL : "1".charCodeAt(0),
KEY_INSERT_PLATFORM : "2".charCodeAt(0),
KEY_EMPTY_SQUARE : 46,
KEY_NAV_UP : 38,
KEY_NAV_DOWN : 40,
KEY_NAV_LEFT : 37,
KEY_NAV_RIGHT : 39,
dungeonX : 5,
dungeonY : 5,

// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {

    this._categories = [this._platforms, this._walls, this._characters, this._projectiles, this._spikes, this._spikestrap];
},

init: function() {

    this.weapon = new Weapon();
	this._spawnPlayer({cx : 100,
			   cy : g_canvas.height - 100,
			   weapon: this.weapon},

					 this._currentRoomID);

	console.log(this._walls.length);

    /*this._makePlatform({cx:300,cy:200});

    this._makeWall({cx:500,cy:300});*/


},

_getPlayer : function () {
	return this._characters[this._currentRoomID][0];
},

_spawnPlayer : function(descr, roomID) {
	var newCharacter = new Character(descr);
	if (!this._characters[roomID]) this._characters[roomID] = [newCharacter];
	else this._characters[roomID].push(newCharacter);
	return newCharacter;
},

_makePlatform : function  (descr, roomID) {
	var newPlatform = new Platform(descr);
	if (!this._platforms[roomID]) this._platforms[roomID] = [newPlatform];
	else this._platforms[roomID].push(newPlatform);
	return newPlatform;
},

_makeWall : function  (descr, roomID) {
	var newWall = new Wall(descr);
	if (!this._walls[roomID]) this._walls[roomID] = [newWall];
	else this._walls[roomID].push(newWall);
	return newWall;
},

_makeSpike : function  (descr, roomID) {
	var newSpike = new Spike(descr);
	if (!this._spikes[roomID]) this._spikes[roomID] = [newSpike];
	else this._spikes[roomID].push(newSpike);
	return newSpike;
},

_makeSpikeTrap : function  (descr, roomID) {
	var newSpiketrap = new SpikeTrap(descr);
	if (!this._spikestrap[roomID]) this._spikestrap[roomID] = [newSpiketrap];
	else this._spikestrap[roomID].push(newSpiketrap);
	return newSpiketrap;
},


_generateProjectile : function (descr, roomID) {
	var newProjectile = new Projectile(descr);
	if (!this._projectiles[roomID]) this._projectiles[roomID] = [newProjectile];
	else this._projectiles[roomID].push(newProjectile);

	return newProjectile;
},

_removeWall : function (wall, roomID) {
	var index = -1;

	for (var i = 0; i < this._walls.length; i++) {
		if (this._walls[roomID][i] === wall) {
			index = i;
			break;
		}
	}

	if (index !== -1) this._walls[roomID].splice(index, 1);
},

_removePlatform : function (platform, roomID) {
	var index = -1;

	if (!this._platforms[roomID]) return;

	for (var i = 0; i < this._platforms.length; i++) {
		if (this._platforms[roomID][i] === platform) {
			index = i;
			break;
		}
	}

	if (index !== -1) this._platforms[roomID].splice(index, 1);
},

update: function(du) {

	if (eatKey(this.KEY_INSERT_WALL)) dungeon._currentRoom.insertWallAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_INSERT_PLATFORM)) dungeon._currentRoom.insertPlatformAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_EMPTY_SQUARE)) dungeon._currentRoom.emptyTileAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_NAV_UP)) this._currentRoomID = dungeon.grid[this.dungeonX][++this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_DOWN)) this._currentRoomID = dungeon.grid[this.dungeonX][--this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_LEFT)) this._currentRoomID = dungeon.grid[--this.dungeonX][this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_RIGHT)) this._currentRoomID = dungeon.grid[++this.dungeonX][this.dungeonY].getRoomID();

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c][this._currentRoomID];
		if (!aCategory) continue;
        var i = 0;

		while (i < aCategory.length) {
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array

                aCategory.splice(i,1);
            }
            else if(status === -2) {
            	console.log("here");
            	//do death stuff
            }else{
                ++i;
            }
        }
    }

},

render: function(ctx) {
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c][this._currentRoomID];

		if (!aCategory) continue;

        for (var i = 0; i < aCategory.length; ++i) {
            	aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);
        }
        debugY += 10;
    }
}


};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

