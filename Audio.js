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

Sound.prototype.resetPlay = function (){

	this.reset();
	this.sound.play();
};





// Continuous sounds



Sound.prototype.reset = function (){

	this.sound.currentTime = 0;
};






// ==============
// PRELOAD AUDIO
// ==============


//	AUDIO INPUTS
//
var requiredSounds = {

	placeholder	: "sounds/placeholder.ogg",
	knifethrow  : "sounds/Woosh.ogg",
	swordshit	: "sounds/Sword.ogg",
	jumpy		: "sounds/Jump.ogg",
	dashy		: "sounds/Dash.ogg",
	landing		: "sounds/land.ogg",
	coll		: "sounds/collision.ogg",
	dmg			: "sounds/Pain.ogg",
	walk		: "sounds/coolguy.ogg",
	soundtrack	: "sounds/soundtrack.ogg",
	soundtrack2 : "sounds/intenseSoundtrack.ogg",
	startsound 	: "sounds/starttheme.ogg",
	deathsound  : "sounds/death.ogg",
	dying		: "sounds/dying.ogg",
	victory 	: "sounds/victory.ogg",
	key 		: "sounds/key.ogg",
	Door		: "sounds/Door.ogg",
	poof		: "sounds/poof.ogg"

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


