
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

RangedEnemy.prototype.flinchTime=0.5*SECS_TO_NOMINALS;
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

     spatialManager.register(this);
	    
};

RangedEnemy.prototype.takeDamage = function(pain)
{
    this.hitPoints -= pain;
    //flinch away from player
    this.currentFlinchTime = this.flinchTime;
};
    
RangedEnemy.prototype.getRadius = function()
{
    return Math.max(this.halfWidth,this.halfHeigt);
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
                              this.cy+this.halfHeight,
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




