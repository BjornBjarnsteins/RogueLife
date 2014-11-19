// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }

    // Get my (unique) spatial ID
    this._spatialID = spatialManager.getNewSpatialID();

    // I am not dead yet!
    this._isDeadNow = false;
};

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Entity.prototype.getRadius = function () {
    return 0;
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype._isDeadNow = false;

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getPos();

    var entity = spatialManager.findEntityInRange( pos.posX, pos.posY, this.getRadius());
    //console.log(entity);

    return spatialManager.findEntityInRange(
        pos.posX, pos.posY, this.getRadius()
    );
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};


Entity.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

Entity.prototype.computeGravity = function()
{
    //placeholder
    //may be permanent
    return 1.2;
};

Entity.prototype.sendMessage = function (msg, style) {
	if (!style) var style = "black";

	entityManager._generateMessage({message : msg,

									cx : this.cx,
									cy : this.cy - this.halfHeight,

									fillStyle : style});
};
Entity.prototype.applyAccel = function(accelX,accelY,dt)
{


    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;

    // v = u + at
    this.velX += accelX * dt;
    this.velY += accelY * dt;

    // v_ave = (u + v) / 2
	this.aveVelX = (oldVelX + this.velX) / 2;
	this.aveVelY = (oldVelY + this.velY) / 2;



};

Entity.prototype.getUpperBound = function() {
	return this.cy - this.halfHeight;
};

Entity.prototype.getLowerBound = function() {
	return this.cy + this.halfHeight;
};

Entity.prototype.getRightBound = function() {
	return this.cx + this.halfWidth;
};

Entity.prototype.getLeftBound = function() {
	return this.cx - this.halfWidth;
};

Entity.prototype.TOP_COLLISION = 1;
Entity.prototype.SIDE_COLLISION = 2;
Entity.prototype.BOTTOM_COLLISION = 3;
Entity.prototype.KILL_ME_NOW = -1;
