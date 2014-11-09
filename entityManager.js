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

weapon : null,

_currentRoomID : null,

setRoom : function (room) {
	console.log(room);
	console.log(room.getRoomID);
	this._currentRoomID = room.getRoomID();
	if (this._characters[0]) this._characters[0].roomID = this._currentRoomID;
},

KEY_INSERT_WALL : "1".charCodeAt(0),
KEY_INSERT_PLATFORM : "2".charCodeAt(0),
KEY_EMPTY_SQUARE : 46,
KEY_NAV_UP : 38,
KEY_NAV_DOWN : 40,
KEY_NAV_LEFT : 37,
KEY_NAV_RIGHT : 39,

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

    this._categories = [this._platforms, this._characters, this._projectiles, this._walls];
},

init: function() {

    this.weapon=new Weapon();
	this._spawnPlayer({cx : 100,
			   cy : g_canvas.height - 100,
			   weapon: this.weapon});

    /*this._makePlatform({cx:300,cy:200});

    this._makeWall({cx:500,cy:300});*/


},

_spawnPlayer : function(descr) {
	var newCharacter = new Character(descr);
	this._characters.push({roomID : this._currentRoomID,
						   entity : newCharacter});
	return newCharacter;
},

_makePlatform : function  (descr) {
	var newPlatform = new Platform(descr);
	this._platforms.push({roomID : this._currentRoomID,
						  entity : newPlatform});
	return newPlatform;
},

_makeWall : function  (descr) {
	var newWall = new Wall(descr);
	this._walls.push({roomID : this._currentRoomID,
					  entity : newWall});
	return newWall;
},

_generateProjectile : function (descr) {
	var newProjectile = new Projectile(descr);
	this._projectiles.push({roomID : this._currentRoomID,
							entity : newProjectile});

	return newProjectile;
},

_removeWall : function (wall, roomID) {
	var index = -1;

	for (var i = 0; i < this._walls.length; i++) {
		if (this._walls[i].entity === wall &&
		    this._walls[i].roomID === roomID) {
			index = i;
			break;
		}
	}

	if (index !== -1) this._walls.splice(index, 1);
},

_removePlatform : function (platform, roomID) {
	var index = -1;

	for (var i = 0; i < this._platforms.length; i++) {
		if (this._platforms[i].entity === platform &&
		    this._walls[i].roomID === roomID) {
			index = i;
			break;
		}
	}

	if (index !== -1) this._platforms.splice(index, 1);
},

update: function(du) {
	if (eatKey(this.KEY_INSERT_WALL)) this._currentRoom.insertWallAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_INSERT_PLATFORM)) this._currentRoom.insertPlatformAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_EMPTY_SQUARE)) this._currentRoom.emptyTileAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_NAV_UP)) {
		this._currentRoom = dungeon.grid[dungeon.currentPosX][dungeon.currentPosY + 1];
		console.log("checking up");
	}

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

		while (i < aCategory.length) {
			if (aCategory[i].roomID !== this._currentRoomID) continue;

            var status = aCategory[i].entity.update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }

},

render: function(ctx) {
    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {
			if (aCategory[i].roomID === this._currentRoomID) {
            	aCategory[i].entity.render(ctx);
			}
            //debug.text(".", debugX + i * 10, debugY);
        }
        debugY += 10;
    }
}


};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

