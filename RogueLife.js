
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

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;

var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_toggleGrid = false;

var KEY_MIXED   = keyCode('M');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');
var KEY_GRID_TOGGLE = keyCode('G');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

	if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

	if (eatKey(KEY_GRID_TOGGLE)) g_toggleGrid = !g_toggleGrid;
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

    if (g_renderSpatialDebug) spatialManager.render(ctx);

	if (g_toggleGrid) testroom.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
      dagger      : "sprites/dagger.png",
      character   : "sprites/rogueLife.PNG"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
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

    //creates initial objects
	dungeon.init();
    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
