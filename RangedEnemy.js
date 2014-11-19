
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
RangedEnemy.prototype.range=500;
RangedEnemy.prototype.STATE_STANDING = 1;
RangedEnemy.prototype.STATE_ATTACKING = 2;
RangedEnemy.prototype.STATE_RUNNING = 3;
RangedEnemy.prototype.STATE_DEAD = 4;
RangedEnemy.prototype.state = 1;
RangedEnemy.prototype.drawTime =  1.3*SECS_TO_NOMINALS;
RangedEnemy.prototype.drawTime2 =  0.3*SECS_TO_NOMINALS;
RangedEnemy.prototype.shot = false;
RangedEnemy.prototype.deadsound = false;


RangedEnemy.prototype.deathAnimationTimeIndex = 0;


RangedEnemy.prototype.render = function(ctx)
{
	//placeholder
    ctx.save()

    var sx ;
  var sy ;
  var height;
  var width ;
  var image ;
  var x = this.cx;
  var y = this.cy;
  var flip;

  if(this.direction === 1){
    flip = true;
  }else{
    flip = false;
  }

  if(this.state === this.STATE_STANDING )
  {

    sx = g_sprites.Ewalk[0].sx;
    sy = g_sprites.Ewalk[0].sy;
    height = g_sprites.Ewalk[0].height;
    width = g_sprites.Ewalk[0].width;
    image = g_sprites.Ewalk[0];

    g_sprites.Ewalk[0].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
  }
  else if(this.state === this.STATE_RUNNING)
  {

    //var distanceTraveled = Math.abs(this.movedFrom - this.cx);
    var index = 0; //Math.floor((distanceTraveled / 65*9) % 9);

    sx = g_sprites.walk[index].sx;
    sy = g_sprites.walk[index].sy;
    height = g_sprites.walk[index].height;
    width = g_sprites.walk[index].width;
    image = g_sprites.walk[index];


    g_sprites.walk[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
    if (index === 1) g_audio.walk.Play();

  }else if(this.state === this.STATE_ATTACKING)
  {
    var time;
    if(!this.shot){
      time = this.drawTime;
    }else{
      time = this.drawTime2;
    }
    if(time > 71){
      index = 0;
    } else if(time > 65){
      index = 1;
    } else if(time > 59){
      index = 2;
    } else if(time > 53){
      index = 3;
    } else if(time > 47){
      index = 4;
    } else if(time > 41){
      index = 5;
    } else if(time > 35){
      index = 6;
    } else if(time > 29){
      index = 7;
    } else if(time > 23){
      index = 8;
    } else if(time > 17){
      index = 9;
    }else if(time > 11){
      index = 10;
    }else if(time > 5){
      index =11;
    }else {
      index = 11;
    }

    sx = g_sprites.EattackSw[index].sx;
    sy = g_sprites.EattackSw[index].sy;
    height = g_sprites.EattackSw[index].height;
    width = g_sprites.EattackSw[index].width;
    image = g_sprites.EattackSw[index];
    flip = !flip;


    g_sprites.EattackSw[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

    if(this.drawTime2 < 0){
      this.drawTime2 = 0.3*SECS_TO_NOMINALS;
      this.shot = false;
    }

  }
    else if(this.state === this.STATE_DEAD)
    {

    var index = Math.floor(this.deathAnimationTimeIndex/20);

    sx = g_sprites.EDie[index].sx;
    sy = g_sprites.EDie[index].sy;
    height = g_sprites.EDie[index].height;
    width = g_sprites.EDie[index].width;
    image = g_sprites.EDie[index];


    g_sprites.EDie[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);


  }
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

   if(this.hitPoints<=0){
	
	if (!this.deadsound) {
		g_audio.skelly.Play();
		this.deadsound = !this.deadsound;
		}
		
	this.state = this.STATE_DEAD;
    if(this.deathAnimationTimeIndex > 110){
      for(var i = 0; i < 5; i++){
      entityManager._generateParticles({  cx : this.cx,
                    cy : this.cy,
                    colr : "white"},
                    entityManager._currentRoomID);
    }
      return entityManager.KILL_ME_NOW;
    }else{
      this.deathAnimationTimeIndex += dt;
      return;
    }

   }

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
                this.state = this.STATE_ATTACKING;
                if(this.drawTime > 29 ){
                  this.drawTime -= dt;
                }else{
                  this.drawTime = 1.3*SECS_TO_NOMINALS;
                  this.shot = true;
                  this.attack(target.cx,target.cy);
                  this.currentAttackCooldown=this.attackCooldown;
                  break;
                }
            }else{
              this.drawTime = 1.3*SECS_TO_NOMINALS;
              this.state = this.STATE_STANDING;
            }

        }
     }
     else
     {
        this.state = this.STATE_STANDING;
        this.currentAttackCooldown -= dt;
     }

     if(this.shot){
          this.drawTime2 -= dt;
          this.state = this.STATE_ATTACKING;
     }

     this.applyAccel(accelX,accelY,dt);

	 var nextX = this.cx + this.aveVelX * dt;
	 var nextY = this.cy + this.aveVelY * dt;

  if(this.roomID === entityManager._currentRoomID){
    spatialManager.register(this);
  }
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
    
    g_audio.bones.Play();
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
                              angleToTarget,
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

RangedEnemy.prototype.snapTo = function (destX, destY) {
  this.cx = destX;
  this.cy = destY;
};

