
//TODO:gravity and flinching, will be the same for MeleeEnemy

this.prototype=new Entity();

function RangedEnemy(descr)
{
    this.setup(descr);
}

RangedEnemy.prototype.cy =g_canvas.height-150;
RangedEnemy.prototype.cx=g_canvas.width/2;
RangedEnemy.prototype.halfHeight=40;
RangedEnemy.prototype.halfWidth=40;

RangedEnemy.prototype.direction=1;

RangedEnemy.prototype.isAttacking=false;
RangedEnemy.prototype.arrowSpeed=7;
RangedEnemy.prototype.attackCooldown=1*SECS_TO_NOMINALS;
RangedEnemy.prototype.currentAttackCooldown=1*SECS_TO_NOMINALS;


RangedEnemy.prototype.render = function(ctx)
{
	//placeholder

    ctx.fillStyle ="blue";
    ctx.fillRect(this.cx-this.halfWidth,
		 this.cy-this.halfHeight,
		 this.halfWidth*2,
		 this.halfHeight*2);
		   		

};

RangedEnemy.prototype.update = function(dt)
{
    characters = entityManager.getPlayers();
    if(this.currentCooldownTime<0)
    {
        for(var i=0;i<characters.length;i++)
        {
            target=characters[i];
    
            distToTarget=util.getDistSq(this.cx,
                                        this.cy,
                                        target.cx,
                                        target.cy);
            if(distToTarget<this.range)
            {
                this.attack(target.cx,target.cy);
                this.currentCooldownTime=this.attackCooldown;
                break;
            }
        }
     }
     else
     {
        this.currentCooldownTime -= dt;
     }
	    
};

RangedEnemy.prototype.attack = function(targetX,targetY)
{
    var = angleToTarget=0;

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
        angleToTarget=atan((targetY-this.cy)/(targetX-this.cx));
     }

     arrowSpeedX=cos(angleToTarget)*this.arrowSpeed;
     arrowSpeedY=sin(angleToTarget*this.arrowSpeed;

     entityManager.LooseArrow(this.cx+this.halfwidth*1.1,
                              this.cy+this.halfwitdh,
                              arrowSpeedX,
                              arrowSpeedY,
                              entityManager._currentRoomID);

};




