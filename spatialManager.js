/*

 placeholder class which will need to be adapted for roguelife

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    var id=this._nextSpatialID;
    this._nextSpatialID++;
    return id;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    this._entities[spatialID] = entity;
    
    
    
    // TODO: YOUR STUFF HERE!

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    
    this._entities[spatialID]=false;

    // TODO: YOUR STUFF HERE!

},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!  
    //for(var entity in this._entities)
    for(var i=0;i<this._entities.length;i++)
    {
	var entity=this._entities[i];
	if(!entity)
	    continue;
	var sumRadiiSq = util.square(radius+entity.getRadius());
	//console.log(sumRadii);
	var pos = entity.getPos();
	var distance =util.wrappedDistSq(posX,
					 posY,
					 pos.posX,
					 pos.posY,
					 g_canvas.width,
					 g_canvas.height);

	if(distance<sumRadiiSq)
	{
	    console.log("it's a hit!-------------------------");
	    console.log(radius);
	    console.log(entity.getRadius());
	    console.log(posX,posY);
	    console.log(pos.posX,pos.posY);
	    return entity;
	}
	console.log("miss!");
	
    }

    return false;

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var i=0;i<this._entities.length;i++) 
    {
        var entity = this._entities[i];
	if(!entity)
	    continue;
	var pos = entity.getPos();
	var radius = entity.getRadius();
        util.strokeCircle(ctx, pos.posX, pos.posY, radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
