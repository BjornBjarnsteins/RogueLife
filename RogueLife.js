
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/



// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    processDiagnostics();

    entityManager.update(du);

	HUD.update(du);

	dungeon.update(du);

	if (!g_musicmute) {	
		if (entityManager._getPlayer().life > 20) {
			g_audio.soundtrack2.sound.pause();
			g_audio.soundtrack.soundtrackPlay();
		} else {
			g_audio.soundtrack.sound.pause();
			g_audio.soundtrack2.soundtrackPlay();
		}
	}
	else {
		g_audio.soundtrack2.sound.pause();
		g_audio.soundtrack.sound.pause();
	}
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;

var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_toggleGrid = false;
var g_mute = false;
var g_musicmute = false;

var KEY_MIXED   = keyCode('M');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');
var KEY_GRID_TOGGLE = keyCode('G');
var KEY_MUTE_TOGGLE = keyCode('O');
var KEY_MUSICMUTE_TOGGLE = keyCode('L');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

	if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

	if (eatKey(KEY_GRID_TOGGLE)) g_toggleGrid = !g_toggleGrid;

	if (eatKey(KEY_MUTE_TOGGLE)) g_mute = !g_mute;
	
	if (eatKey(KEY_MUSICMUTE_TOGGLE)) g_musicmute = !g_musicmute;
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

	HUD.render(ctx);

	dungeon.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);

	if (g_toggleGrid) dungeon._currentRoom.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {


    var requiredImages = {
      dagger      : "sprites/dagger.png",
      character   : "sprites/rogueLife.PNG",
      wall        : "sprites/penis.png",
      Trap        : "sprites/midgetcowboys.png",
      Background  : "sprites/interior.png",
      Platform    : "sprites/platform.png",
      Ground      : "sprites/Ground.png",
      outSide     : "sprites/outSide.png",
      Chest       : "sprites/Chest.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
    preLoadAudio();


}

var g_sprites = {};

function preloadDone() {
    var constructorObjects = {image : g_images.dagger,
                              sx    : 0,
                              sy    : 0,
                              Width : 10,
                              Height : 4}
    g_sprites.dagger = new Sprite(constructorObjects);

    //Running
    var cellHeight = 64;
    var cellWidth = 64;
    var numRows = 10;
    var numCols = 9;

    var walking = [];
    var wSprite;

    for (var row = 9; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            var constructorObjects = {image : g_images.character,
                                      sx    : col * cellWidth,
                                      sy    : row * cellHeight,
                                      Width : cellWidth,
                                      Height: cellHeight}
            wSprite = new Sprite(constructorObjects);
            walking.push(wSprite);
        }
    }

    g_sprites.walk = walking;

    //dashing
    var constructorObjects = {image : g_images.character,
                              sx    : 256,
                              sy    : 960,
                              Width : cellWidth,
                              Height : cellHeight}


    g_sprites.dash = new Sprite(constructorObjects);

    //jumping
    var constructorObjects = {image : g_images.character,
                              sx    : 320,
                              sy    : 195,
                              Width : cellWidth,
                              Height : cellHeight}


    g_sprites.jump = new Sprite(constructorObjects);

    //crouching

     var constructorObjects = {image : g_images.character,
                              sx    : 130,
                              sy    : 1280,
                              Width : cellWidth,
                              Height : cellHeight}

    g_sprites.crouch = new Sprite(constructorObjects);

    //attacking w. sword

    var cellHeight = 64;
    var cellWidth = 64*3;
    var numRows = 32;
    var numCols = 6;

    var attacking = [];
    var aSprite;

    for (var row = 31; row < numRows; ++row) {
        for (var col = 0; col < numCols; ++col) {
            var constructorObjects = {image : g_images.character,
                                      sx    : 64 + cellWidth*col,
                                      sy    : row * cellHeight,
                                      Width : cellWidth,
                                      Height: cellHeight}
            aSprite = new Sprite(constructorObjects);
            attacking.push(aSprite);
        }
    }

    g_sprites.attackSw = attacking;

      //wall
    var constructorObjects = {image : g_images.wall,
                              sx    : 0,
                              sy    : 0,
                              Width : 100,
                              Height : 100}


    g_sprites.wall = new Sprite(constructorObjects);

    //Chest
    var constructorObjects = {image : g_images.Chest,
                              sx    : 0,
                              sy    : 0,
                              Width : 200,
                              Height : 100}


    g_sprites.Chest = new Sprite(constructorObjects);

     //SpikeTrap
    var constructorObjects = {image : g_images.Trap,
                              sx    : 0,
                              sy    : 0,
                              Width : 100,
                              Height : 100}


    g_sprites.Trap = new Sprite(constructorObjects);

    //Background
    var constructorObjects = {image : g_images.Background,
                              sx    : 0,
                              sy    : 0,
                              Width : 750,
                              Height : 500}


    g_sprites.Background = new Sprite(constructorObjects);

    //outSide
    var constructorObjects = {image : g_images.outSide,
                              sx    : 0,
                              sy    : 0,
                              Width : 750,
                              Height : 500}


    g_sprites.outSide = new Sprite(constructorObjects);

    //Platform
    var constructorObjects = {image : g_images.Platform,
                              sx    : 0,
                              sy    : 0,
                              Width : 50,
                              Height : 20}


    g_sprites.Platform = new Sprite(constructorObjects);


    //Ground
    var constructorObjects = {image : g_images.Ground,
                              sx    : 0,
                              sy    : 0,
                              Width : 100,
                              Height : 100}


    g_sprites.Ground = new Sprite(constructorObjects);

    //creates initial objects
	dungeon.init();
    entityManager.init();

    main.init();
}



// Kick it off
requestPreloads();
