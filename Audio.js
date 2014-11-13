"use strict";

// HOW TO INSERT AND USE AUDIO
//		- insert into 'requiredSounds':
//
//			nameOfSound  :  "path/nameOfFile.ogg"
//
//
//		- Put anywhere in the code:
//
//			g_audio.nameOfSound.Play();



// ==============
// AUDIO OBJECT
// ==============


// Construct a "sound" from the given `audio`,
//
function Sound( audio ){

	this.sound = audio;
}


//count cloneNodes, to avoid too many.
Sound.prototype.cloneNodes = 0;

//scale from 0.0 to 1.0
Sound.prototype.volume    = 0.1;


Sound.prototype.soundVolume = function( volume ){

	this.volume = volume;
};


// Play the sound


Sound.prototype.Play = function (){
	if (!g_mute) {

	//For longer sounds (til notkunar fyrir lúppuð hljóð seinna meir)

	/*
	if(this.sound.currentTime > 0 && this.cloneNodes < 4)
	{
		this.cloneNodes++;
		this.sound.cloneNode().play();
	}
	else
	{
		this.cloneNodes = 0;
		this.playSound();
	}
	*/

	this.sound.cloneNode().play();

	}
}

Sound.prototype.soundtrackPlay = function () {

	this.sound.play();

}


// Loop the sound

/*Sound.prototype.resetPlay = function (){

	this.reset();
	this.playSound();
};
*/




// Continuous sounds

/*

Sound.prototype.reset = function (){

	this.sound.currentTime = 0;
};
*/





// ==============
// PRELOAD AUDIO
// ==============


//	AUDIO INPUTS
//
var requiredSounds = {

	placeholder	: "sounds/placeholder.mp3",
	knifethrow  : "sounds/Woosh.mp3",
	swordshit	: "sounds/Sword.mp3",
	jumpy		: "sounds/Jump.mp3",
	dashy		: "sounds/Dash.mp3",
	landing		: "sounds/land.mp3",
	coll		: "sounds/collision.mp3",
	dmg			: "sounds/pain.mp3",
	walk		: "sounds/coolguy.mp3",
	soundtrack	: "sounds/soundtrack.mp3",
	soundtrack2 : "sounds/intenseSoundtrack.mp3"

};


var g_sounds = [];

function preLoadAudio() {

	soundsPreload(requiredSounds, g_sounds, audioPreloadDone);
}


// handy array to keep track of the sounds
var g_audio   = [];

function audioPreloadDone() {

	for(var sound in g_sounds) {
		g_audio[sound] = new Sound(g_sounds[sound]);
	}
}


