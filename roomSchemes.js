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
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", "R", "S", "S", "S", " ", " ", "w"],
	["w", "w", "w", "w", "T", "T", "T", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

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
	["w", " ", " ", " ", "S", "S", "S", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "T", "T", "T", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "p", "p", "p", "p", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
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
	["w", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", "p", "p", "p", "p", "w"],
	["w", " ", " ", " ", " ", "w", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", "S", "S", "S", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", "w"],
	["w", "p", "p", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "T", "T", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "S", "S", " ", " ", " ", " ", "C", " ", "w", "w", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "p", "p", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "T", "T", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "w", "w", "C", " ", " ", " ", " ", " ", "S", "S", "R", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", "w"],
	["w", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", " ", " ", "w"],
	["w", "p", "p", "w", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", "p", "p", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", "w", "p", "p", "p", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", "w", "p", "p", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "p", "p", "w", "w", " ", " ", "w"],
	["w", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", "w", " ", " ", "w", "w", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "p", "p", "p", "w", " ", " ", "w", "w", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", "w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "S", " ", "C", " ", "w", "p", "p", "p", "p", "w", "w", "w", "p", "p", "w", "w", "w"],
	["w", "p", "p", "w", "w", "w", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "w", "p", "p", "w", "w", "w", "p", "p", "p", "p", "w", "C", " ", " ", "S", " ", " ", "w"],
	["w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w", "w", "w", "p", "p", "w"],
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
	["w", " ", " ", " ", " ", " ", "w", "w", "p", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", "w", " ", " ", " ", "w", "w", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", " ", "w"],
	["w", "w", "w", "T", "T", "T", "w", "w", "w", "w", "w", "w", "w", "T", "T", "T", "T", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", "p", "p", "p", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", "w", " ", " ", " ", " ", "w", "w", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", " ", " ", " ", "w", " ", " ", " ", " ", "w", "w", " ", " ", " ", "w", " ", "w"],
	["w", "w", "w", "w", "T", "T", "T", "w", "w", "w", "w", "w", "w", "w", "T", "T", "T", "w", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "C", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "C", " ", "w"],
	["w", "w", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", "p", "p", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", "w", "T", "T", "T", "T", "T", "T", "w", "w", "w", "w", "T", "T", "T", "T", "T", "T", "w", "w"]
],

[
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", "p", "p", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", "p", "p", " ", " ", " ", " ", "p", "p", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
	["w", " ", " ", "w", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", " ", " ", "w"],
	["w", " ", " ", "w", "S", "S", "S", "S", " ", " ", " ", " ", "S", "S", "S", "S", "w", " ", " ", "w"],
	["w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
],

];

function getRandomScheme(schemeRestricts) {
	var seed = Math.floor(Math.random()*schemes.length);

	/*var seedRestricts = [];

	for (var i = 0; i < schemeRestricts.length; i++) {
		seedRestricts.push(schemes.indexOf(schemeRestricts[i]));
	}


	while (seedRestricts.indexOf(seed) !== 0) {
		seed = Math.floor(Math.random()*schemes.length);
	}*/

	return schemes[seed];
}

function getOutSideScheme(){

	var outSide = [	["b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", "R", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
					["b", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "w"],
					["g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "w", "w", "w", "w", "w", "w", "w", "w", "w"]
				]

	console.log("hallo uti")
	return outSide;
}
