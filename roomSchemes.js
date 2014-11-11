// As of now, have at least one platform in your designs. Things get a bit weird if you don't

var schemes = [
[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "S", "S", "S", " ", " ", "w"],
	["w", "w", "w", "w", "T", "T", "T", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "p", "p", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "S", "S", "S", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "p", "p", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "T", "T", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "S", " ", " ", " ", " ", "w", "w", "w", "w", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", " ", " ", "w"],
	["w", "p", "p", "w", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", "p", "p", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", "w", "p", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", "w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "S", " ", " ", " ", "w", "p", "p", "p", "p", "w", "w", "w", "p", "p", "w", "w", "w"],
	["w", "p", "p", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", "w", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", "w"],
	["w", "w", "w", "T", "T", "T", "w", "w", "w", "w", "w", "w", "w", "T", "T", "T", "T", "w", "w", "w"]
],

];

function getRandomScheme() {
	var seed = Math.floor(Math.random()*schemes.length);

	return schemes[seed];
}
