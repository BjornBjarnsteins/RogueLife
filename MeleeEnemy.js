

this.prototype=new Entity();

function MeleeEnemy(descr)
{
    this.setup(descr);
}

MeleeEnemy.prototype.cy =g_canvas.height-150;
MeleeEnemy.prototype.cx=g_canvas.width/2;
MeleeEnemy.prototype.halfHeight=70;
MeleeEnemy.prototype.halfWidth=40;

MeleeEnemy.prototype.direction=1;
MeleeEnemy.prototype.range=210;
MeleeEnemy.currentWalkLength=0;
RangedEnemy.prototype.velX=0;
RangedEnemy.prototype.velY=0;
RangedEnemy.prototype.aveVelX=0;
RangedEnemy.prototype.aveVelY=0;


MeleeEnemy.prototype.isAttacking=false;


MeleeEnemy.prototype.render = function(ctx)
{

    ctx.fillStyle ="red";
    ctx.fillRect(this.cx-this.halfWidth,
		 this.cy-this.halfHeight,
		 this.halfWidth*2,
		 this.halfHeight*2);

};

MeleeEnemy.prototype.update = function(dt)
{
    spatialManager.unregister(this);

	var accelX=0;
	var accelY=this.computeGravity();
    var fallsThrough =false;


	var oldX = this.cx;
	var oldY = this.cy;

    if(this.hitPoints<=0)
    {
        return entityManager.KILL_ME_NOW;
    }

    //patrol attack routine
    if(this.isAttacking)
    {
	this.attack(dt);
	return;
    }
    if(this.currentWalkLengt<this.range)
    {
	this.cx+=this.direction*5;
	this.currentWalkLength +=5
    }
    else
    {
	this.direction *=-1;
	this.currentWalkLength=0;
	this.isAttacking=true;
	this.attack(dt);
    }
    
   
    this.applyAccel(accelX,accelY,dt);

	var nextX = this.cx + this.aveVelX * dt;
	var nextY = this.cy + this.aveVelY * dt;
    
    spatialManager.register(this);
	var hitObstacles = dungeon.getCurrentRoom().getObstaclesInRange(this);

    var collisionCode = -1;

	for (var i = 0; i < hitObstacles.length; i++) {
		if(!hitObstacles[i]._isDeadNow){
			collisionCode = util.maybeCall(hitObstacles[i].collidesWith,
										   hitObstacles[i],
										   [this, oldX, oldY, nextX, nextY, fallsThrough]);
		}

		this.resolveCollision(collisionCode);
		if(collisionCode === -1){break;}
    }

	this.cx += dt * this.aveVelX;
	this.cy += dt * this.aveVelY;

};

MeleeEnemy.prototype.attack = function(dt)
{
    
    this.cx += this.direction*15;
    this.currentWalkLength += 15;
    if(this.currentWalkLength>this.range/3)
	this.isAttacking=false;
	

};

MeleeEnemy.prototype.resolveCollision = function(collisionCode)
{
	if (collisionCode === this.TOP_COLLISION ||
		collisionCode === this.BOTTOM_COLLISION)
    {
		this.velY = 0;
		this.aveVelY = 0;

    }
	else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	}


};


