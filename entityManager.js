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
_powerups	 : [],
_chests		 : [],
_door 		 : [],
_messages	 : [],
_key 		 : [],
_particles   : [],

weapon : null,

_currentRoomID : null,

_oldRoomID : 1,

reseting : function(){
	this._walls = null;
	this._platforms = null;
	this._walls = null;
	this._spikes = null;
	this._spikestrap = null;
	this._powerups = null;
	this._chests = null;
	this._door = null;
	this._messages = null;
	this._key = null;
	this._particles = null; 

	this._walls = [];
	this._platforms = [];
	this._walls = [];
	this._spikes = [];
	this._spikestrap = [];
	this._powerups = [];
	this._chests = [];
	this._door = [];
	this._messages = [];
	this._key = [];
	this._particles = [];

	this._currentRoomID  = 1;
	this._spawnPlayer();


},

setRoom : function (room) {


	this._currentRoomID = room.getRoomID();

	if (this._characters[this._oldRoomID][0]) {
		this._characters[this._currentRoomID] = [this._characters[this._oldRoomID][0]];
		this._characters[this._oldRoomID].splice(0, 1);
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

    this._categories = [this._platforms,
    					this._door,
    					this._walls,
    					this._characters,
    					this._projectiles,
    					this._spikes,
    					this._spikestrap,
    					this._powerups,
    					this._chests,
						this._messages,
						this._key,
						this._particles
    					];
},

init: function(player) {

    this.weapon = new Weapon();

	if (player) this._characters[this._currentRoomID] = [player];
	else {
		this._spawnPlayer({cx : 100,
						   cy : g_canvas.height - 100,
						   weapon: this.weapon},

						  this._currentRoomID);
	}

	console.log(this._walls.length);

    /*this._makePlatform({cx:300,cy:200});

    this._makeWall({cx:500,cy:300});*/


},

_getPlayer : function () {

	return this._characters[this._currentRoomID][0];
},

getPlayerList : function () {
    return this.characters[this._currentRoomID];
},


// Generators

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

// Projectile stuff

looseArrow : function (startX,startY,speedX,speedY,roomID)
{
	var descr ={cx:startX,
                cy:startY,
				velX:speedX,
				velY:speedY,
				halfWidth:10
                };
    this._generateProjectile(descr,roomID);
},


_generateProjectile : function (descr, roomID) {
	var newProjectile = new Projectile(descr);
	if (!this._projectiles[roomID]) this._projectiles[roomID] = [newProjectile];
	else this._projectiles[roomID].push(newProjectile);

	return newProjectile;
},

_generateParticles : function (descr, roomID) {

		var newParticle = new Particle(descr);
		if (!this._particles[roomID]) this._particles[roomID] = [newParticle];
		else this._particles[roomID].push(newParticle);

		return newParticle;

},

// Powerup stuff

KEY_SPAWN_POWERUP : keyCode("C"),

_spawnPowerup : function (descr, roomID) {
	var newPowerUp = new Powerup(descr);
	if (!this._powerups[roomID]) this._powerups[roomID] = [newPowerUp];
	else this._powerups[roomID].push(newPowerUp);
	return newPowerUp;
},

_spawnChest : function (descr, roomID) {

	var newChest = new Chest(descr);
	if (!this._chests[roomID]) this._chests[roomID] = [newChest];
	else this._chests[roomID].push(newChest);
	return newChest;
},

_makeDoor : function (descr, roomID) {

	var newDoor = new Door(descr);
	if (!this._door[roomID]) this._door[roomID] = [newDoor];
	else this._door[roomID].push(newDoor);
	return newDoor;
},

// Cleanup stuff

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

_emptyRoom : function (roomID) {
	for (var c = 0; c < this._categories.length; ++c) {
		this._categories[c][roomID] = [];
    }
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

_removePowerup : function (powerup, roomID) {
	var index = -1;

	if (!this._powerups[roomID]) return;

	for (var i = 0; i < this._powerups.length; i++) {
		if (this._powerups[roomID][i] === powerup) {
			index = i;
			break;
		}
	}

	if (index !== -1) this._powerups[roomID].splice(index, 1);
},

_makeKey : function (descr, roomID) {

	var newKey = new Key(descr);
	if (!this._key[roomID]) this._key[roomID] = [newKey];
	else this._key[roomID].push(newKey);
	return newKey;
},

_removeKey : function (roomID) {
	this._key.splice(0, 1);
},

// message stuff
_generateMessage : function (descr, roomID) {
	if (!roomID) roomID = this._currentRoomID;

	var newMessage = new Message(descr);
	if (!this._messages[roomID]) this._messages[roomID] = [newMessage];
	else this._messages[roomID].push(newMessage);
	return newMessage;
},

update: function(du) {

	if (eatKey(this.KEY_INSERT_WALL)) dungeon._currentRoom.insertWallAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_INSERT_PLATFORM)) dungeon._currentRoom.insertPlatformAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_EMPTY_SQUARE)) dungeon._currentRoom.emptyTileAt(g_mouseX, g_mouseY);
	if (eatKey(this.KEY_NAV_UP)) this._currentRoomID = dungeon.grid[this.dungeonX][++this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_DOWN)) this._currentRoomID = dungeon.grid[this.dungeonX][--this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_LEFT)) this._currentRoomID = dungeon.grid[--this.dungeonX][this.dungeonY].getRoomID();
	if (eatKey(this.KEY_NAV_RIGHT)) this._currentRoomID = dungeon.grid[++this.dungeonX][this.dungeonY].getRoomID();
	if (eatKey(this.KEY_SPAWN_POWERUP)) this._spawnPowerup({cx : g_mouseX,
															cy : g_mouseY}, this._currentRoomID)

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c][this._currentRoomID];
		if (!aCategory) continue;
        var i = 0;

		while (i < aCategory.length) {
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array

                if(aCategory[0].life === 0){

                	//restart the game if the thing that died was the player
                	//but i cant do it :(
                	aCategory[0].life = 100;
                	restart();

                }else{
                	console.log("her nuna")
                	aCategory.splice(i,1);
                }


            }else{
                ++i;
            }
        }

    }

},

CleanSmanager: function(du){

	for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c][this._oldRoomID];
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

