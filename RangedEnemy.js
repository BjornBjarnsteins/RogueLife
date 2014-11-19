
//TODO:gravity and flinching, will be the same for MeleeEnemy


function RangedEnemy(descr)
{
    this.setup(descr);
}
RangedEnemy.prototype=new Entity();

RangedEnemy.prototype.cy =g_canvas.height-150;
RangedEnemy.prototype.cx=g_canvas.width/2;
RangedEnemy.prototype.halfHeight=40;
RangedEnemy.prototype.halfWidth=40;

RangedEnemy.prototype.direction=1;
RangedEnemy.prototype.velX=0;
RangedEnemy.prototype.velY=0;
RangedEnemy.prototype.aveVelX=0;
RangedEnemy.prototype.aveVelY=0;

RangedEnemy.prototype.flinchTime=0.25*SECS_TO_NOMINALS;
RangedEnemy.prototype.currentFlinchTime=0;
RangedEnemy.prototype.flinchDirection=-1;

RangedEnemy.prototype.hitPoints=15;

RangedEnemy.prototype.isAttacking=false;
RangedEnemy.prototype.arrowSpeed=7;
RangedEnemy.prototype.attackCooldown=1*SECS_TO_NOMINALS;
RangedEnemy.prototype.currentAttackCooldown=1*SECS_TO_NOMINALS;
RangedEnemy.prototype.range=300;


RangedEnemy.prototype.render = function(ctx)
{
	//placeholder
    ctx.save()

    ctx.fillStyle ="blue";
    ctx.fillRect(this.cx-this.halfWidth,
		 this.cy-this.halfHeight,
		 this.halfWidth*2,
		 this.halfHeight*2);

    ctx.restore();

};

RangedEnemy.prototype.update = function(dt)
{

   spatialManager.unregister(this);

	var accelX=0;
	var accelY=this.computeGravity();
    var fallsThrough =false;

	var oldX = this.cx;
	var oldY = this.cy;

   if(this.hitPoints<=0)
        return entityManager.KILL_ME_NOW;
   var characters = entityManager.getPlayerList();

    //Face player 1
    var playerX =characters[0].cx;
    if(playerX<this.cx)
        this.direction=-1;
    else
        this.direction=1;

    this.flinchMaybe(dt);

    //attack player
    if(this.currentAttackCooldown<0)
    {
        for(var i=0;i<characters.length;i++)
        {
            var target=characters[i];

            var distToTarget=util.distSq(this.cx,
                                        this.cy,
                                        target.cx,
                                        target.cy);
            if(distToTarget<util.square(this.range))
            {
                this.attack(target.cx,target.cy);
                this.currentAttackCooldown=this.attackCooldown;
                break;
            }
        }
     }
     else
     {
        this.currentAttackCooldown -= dt;
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

RangedEnemy.prototype.takeDamage = function(pain)
{
    if(this.currentFlinchTime!==0)
        return;
    this.hitPoints -= pain;
    this.sendMessage(pain, "red");
    //flinch away from player
    this.currentFlinchTime = this.flinchTime;
};

RangedEnemy.prototype.getRadius = function()
{
    return Math.max(this.halfWidth,this.halfHeight);
}

RangedEnemy.prototype.attack = function(targetX,targetY)
{
    var angleToTarget=0;

    //the bigger if is to avoid dividing by zero when player is directly
    //above or below
    if(targetX-this.cx===0)
    {
        if(targetY<this.cy)
        {
            angleToTarget=-90;
        }
        else
        {
            angleToTarget=90;
        }
     }
     else
     {
        angleToTarget=Math.atan((targetY-this.cy)/(targetX-this.cx));
     }

     arrowSpeedX=Math.cos(angleToTarget)*this.arrowSpeed*this.direction;
     arrowSpeedY=Math.sin(angleToTarget)*this.arrowSpeed*this.direction;

     entityManager.looseArrow(this.cx+this.direction*this.halfWidth*1.1,
                              this.cy,
                              arrowSpeedX,
                              arrowSpeedY,
                              entityManager._currentRoomID);

};

RangedEnemy.prototype.flinchMaybe = function(dt)
{
    if(this.currentFlinchTime>0)
    {
        this.cx += this.flinchDirection*5*dt
        this.currentFlinchTime -= dt;
    }
    else
    {
        this.flinchDirection = -this.direction;
        this.currentFlinchTime =0;
    }
};


RangedEnemy.prototype.resolveCollision = function(collisionCode)
{
	if (collisionCode === this.TOP_COLLISION ||
		collisionCode === this.BOTTOM_COLLISION)
    {
		this.velY = 0;
		this.aveVelY = 0;
/*		if(this.state !== this.STATE_DASHING){
			this.velX = 0;
		}*/

    }
	else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	}


};

RangedEnemy.prototype.landOn = function(surfaceY) {

	this.cy = surfaceY - this.halfHeight;
	this.velY = 0;

};



