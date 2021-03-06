// Multi-Audio Preloader

"use strict";

/*jslint browser: true, devel: true, white: true */

var canvas = document.getElementById("myCanvas");
var s_ctx = canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

Audio.prototype.asyncLoad = function(src, asyncCallback) {

	this.oncanplaythrough	= asyncCallback;
	this.onerror 		 	= asyncCallback;
	this.onloadstart 	 	= asyncCallback;

	console.log("requesting sound src of ", src);
    this.src = src;
};



function soundsPreload(requiredSounds,
                       loadedSounds,
                       completionCallback,
					   finalCallback) {

    var numSoundsRequired,
        numSoundsHandled = 0,
        currentName,
        currentSound,
        preloadHandler;


    numSoundsRequired = Object.keys(requiredSounds).length;


    preloadHandler = function () {

       // console.log("preloadHandler called with this=", this);
        loadedSounds[this.name] = this;

		this.oncanplaythrough = null;
		this.onerror = null;
		this.onloadstart = null;


        numSoundsHandled += 1;


        if (numSoundsHandled === numSoundsRequired) {
            console.log("all preload sounds handled");
            console.log("loadedSounds=", loadedSounds);
            console.log("");
            console.log("performing completion callback");

			completionCallback();

            console.log("completion callback done");
            console.log("");

		} else {
			console.log("loadedSounds=", loadedSounds);
		}

    };



    for (currentName in requiredSounds) {

        if (requiredSounds.hasOwnProperty(currentName)) {

            console.log("preloading sound", currentName);
            currentSound = new Audio();
            currentSound.name = currentName;
            currentSound.asyncLoad(requiredSounds[currentName], preloadHandler);
        }
    }

	finalCallback();
}
