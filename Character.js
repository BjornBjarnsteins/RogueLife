


Character = function(descr)
{
    this.setup(descr);
};

Character.prototype = new Entity();
Character.prototype.cy =g_canvas.height-150;
Character.prototype.halfHeight=40;
Character.prototype.halfWidth=20;
Character.prototype.cx=g_canvas.width/2;
Character.prototype.velX=0;
Character.prototype.velY=0;

Character.prototype.KEY_UP = "W".charCodeAt(0);
Character.prototype.KEY_DOWN = "S".charCodeAt(0);
Character.prototype.KEY_LEFT = "A".charCodeAt(0);
Character.prototype.KEY_RIGHT = "D".charCodeAt(0);

//TODO:Images and sounds for character

Character.prototype.update = function(dt)
{

    //Gravity computation should probably be moved
    //to entity manager when we get one of those up
    var accelX=0;
    var accelY=this.computeGravity();

    this.applyAccel(accelX,accelY,dt);

    if(keys[this.KEY_LEFT])
    {
	this.cx -=5;
    }

    if(keys[this.KEY_RIGHT])
    {
	this.cx +=5;
    }

    //jumping code assumes we want to have jumps work
    //in such a way that if the character is falling
    //at too high a speed a jump will only slow him down
    //we might want to add a threshhold to make
    //sure he goes upward in all circumstances

    if(eatKey(this.KEY_UP)&&this.hasJumpsLeft())
    {
	this.velY -= 25;
    }


    //DOWN does nothing so far

    this.clampToBounds();

};

Character.prototype.hasJumpsLeft = function()
{
    //placeholder
    //probably best to give Character  jumpsLeft and maxjumps variables
    //to keep track of this
    return true;
};

Character.prototype.computeGravity = function()
{
    //placeholder
    return 1.2;
};

Character.prototype.applyAccel = function(accelX,accelY,dt)
{


    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;

    // v = u + at
    this.velX += accelX * dt;
    this.velY += accelY * dt;

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;


    // s = s + v_ave * t
    var nextX = this.cx + aveVelX * dt;
    var nextY = this.cy + aveVelY * dt;

    // s = s + v_ave * t
    this.cx += dt * aveVelX;
    this.cy += dt * aveVelY;

	var oldCy = this.cy;
	this.clampToBounds();

	if (this.cy !== oldCy) {
		this.velY = 0;
	}

};

Character.prototype.clampToBounds = function()
{
    var leftBoundary = 0+this.halfWidth;
    var rightBoundary = g_canvas.width-this.halfWidth;

    var topBoundary = 0+this.halfHeight;
    var bottomBoundary = g_canvas.height-this.halfHeight;
    //uses already provided clamping function
    this.cx=util.clampRange(this.cx,leftBoundary,rightBoundary);
    this.cy=util.clampRange(this.cy,topBoundary,bottomBoundary);

};

Character.prototype.render = function (ctx)
{
    //Ævintýri rauða kassans!
    ctx.save();
    util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "red");

    ctx.restore();
};



