




function MeleeEnemy(descr)
{
    this.setup(descr);
}
MeleeEnemy.prototype=new Entity();

MeleeEnemy.prototype.hitPoints=40;

MeleeEnemy.prototype.cy =g_canvas.height-150;
MeleeEnemy.prototype.cx=g_canvas.width/2;
MeleeEnemy.prototype.halfHeight=40;
MeleeEnemy.prototype.halfWidth=40;

MeleeEnemy.prototype.direction=1;
MeleeEnemy.prototype.range=210;

MeleeEnemy.prototype.currentWalkLength=0;
MeleeEnemy.prototype.velX=0;
MeleeEnemy.prototype.velY=0;
MeleeEnemy.prototype.aveVelX=0;
MeleeEnemy.prototype.aveVelY=0;

MeleeEnemy.prototype.stepLength=3;

MeleeEnemy.prototype.invulnTime=0.1*SECS_TO_NOMINALS;
MeleeEnemy.prototype.currentInvulnTime = 0;
MeleeEnemy.prototype.STATE_STANDING = 1;
MeleeEnemy.prototype.STATE_ATTACKING = 2;
MeleeEnemy.prototype.STATE_RUNNING = 3;
MeleeEnemy.prototype.STATE_DEAD = 4;
MeleeEnemy.prototype.state = 3;
MeleeEnemy.prototype.deathAnimationTimeIndex = 0;
MeleeEnemy.prototype.hitPoints = 40;
MeleeEnemy.prototype.deadsound = false;

MeleeEnemy.prototype.isAttacking=false;


MeleeEnemy.prototype.render = function(ctx)
{

    var sx ;
	var sy ;
	var height;
	var width ;
	var image ;
	var x = this.cx;
	var y = this.cy;
	var flip;
	var index;
	if(this.direction === 1){
		flip = true;
	}else{
		flip = false;
	}

	if(this.state === this.STATE_STANDING )
	{

		sx = g_sprites.walk[0].sx;
		sy = g_sprites.walk[0].sy;
		height = g_sprites.walk[0].height;
		width = g_sprites.walk[0].width;
		image = g_sprites.E2walk[0];

		g_sprites.E2walk[0].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
	}
	else if(this.state === this.STATE_RUNNING)
	{

		//var distanceTraveled = Math.abs(this.movedFrom - this.cx);
		index = Math.floor((this.currentWalkLength / 9))%9;
		console.log(index,this.currentWalkLength,this.range)

		sx = g_sprites.E2walk[index].sx;
		sy = g_sprites.E2walk[index].sy;
		height = g_sprites.E2walk[index].height;
		width = g_sprites.E2walk[index].width;
		image = g_sprites.E2walk[index];


		g_sprites.E2walk[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
		if (index === 1) g_audio.walk.Play();

	}
	else if(this.state === this.STATE_DEAD)
	{

		index = Math.floor(this.deathAnimationTimeIndex/20);

		if (!this.deadsound) {
			g_audio.orcdeath.Play();
			this.deadsound = !this.deadsound;
			}


		sx = g_sprites.E2Die[index].sx;
		sy = g_sprites.E2Die[index].sy;
		height = g_sprites.E2Die[index].height;
		width = g_sprites.E2Die[index].width;
		image = g_sprites.E2Die[index];


		g_sprites.E2Die[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);


	}
	else if(this.state === this.STATE_ATTACKING)
	{

		var time = 1;
		if(time > 5){
			index = 0;
		} else if(time > 4){
			index = 1;
		}else if(time > 3){
			index = 2;
		}else if(time > 2){
			index = 4;
		}else {
			index = 5;
		}

		sx = g_sprites.E2attackSw[index].sx;
		sy = g_sprites.E2attackSw[index].sy;
		height = g_sprites.E2attackSw[index].height;
		width = g_sprites.E2attackSw[index].width;
		image = g_sprites.E2attackSw[index];
		flip = !flip;


		g_sprites.E2attackSw[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

	}

};

MeleeEnemy.prototype.update = function(dt)
{
    spatialManager.unregister(this);
    if(this.currentInvulnTime>0)
        this.currentInvulnTime -=dt;

	var accelX=0;
	var accelY=this.computeGravity();
    var fallsThrough =false;


	var oldX = this.cx;
	var oldY = this.cy;

    if(this.hitPoints<=0)
    {
    	var player = entityManager._getPlayer();
		this.state = this.STATE_DEAD;

	    if(this.deathAnimationTimeIndex > 110){
			player.score += 10;
	      for(var i = 0; i < 5; i++){
	      entityManager._generateParticles({  cx : this.cx,
	                    cy : this.cy,
	                    colr : "green"},
	                    entityManager._currentRoomID);
	    }

		player.score += 15;
		var ran = Math.random();
	    if(ran < 0.2 ){
	      entityManager._spawnPowerup({ cx : this.cx,
	                  cy : this.cy,
	                  velX : 0,
	                  velY : -5},
	                  entityManager._currentRoomID);

	      }
	      return entityManager.KILL_ME_NOW;
	    }else{
	      this.deathAnimationTimeIndex += dt;
	      return;
	    }
    }

    //patrol attack routine
    if(this.isAttacking)
    {
		this.attack(dt);

		if(this.roomID === entityManager._currentRoomID){
		    spatialManager.register(this);
		}
		return;
    }

    if(this.currentWalkLength<this.range)
    {
		this.cx+=this.direction*this.stepLength*dt;
		this.currentWalkLength +=this.stepLength*dt;
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

    hitEntity=this.findHitEntity();
    characters=entityManager.getPlayerList();
    for(var i=0;i<characters.length;i++)
        if(hitEntity===characters[i])
            hitEntity.takeDamage(10);

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

MeleeEnemy.prototype.attack = function(dt)
{

    this.cx += this.direction*this.stepLength*1.5*dt;
    this.currentWalkLength += this.stepLength*1.5*dt;
    if(this.currentWalkLength>this.range/1.5)
	this.isAttacking=false;


};

MeleeEnemy.prototype.resolveCollision = function(collisionCode)
{
	if (collisionCode === this.TOP_COLLISION ||
		collisionCode === this.BOTTOM_COLLISION)
    {
		this.velY = 0;
		this.aveVelY = 0;
		this.velX = 0;
		this.aveVelX = 0;

    }
	else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	}


};

MeleeEnemy.prototype.getRadius = function()
{
    return 25;
};

MeleeEnemy.prototype.takeDamage =function(pain)
{
	player = entityManager._getPlayer();
    g_audio.orcpain.Play();

    if(this.currentInvulnTime>0)
        return;
    this.hitPoints -= pain;
    this.sendMessage(pain, "red");
    this.currentInvulnTime=this.invulnTime;
    this.velX = player.direction*7;
    this.velY = -7;
    this.direction = -this.direction;
};

