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
Character.prototype.aveVelX=0;
Character.prototype.aveVelY=0;
Character.prototype.weapon=null;
Character.prototype.maxLife = 100;
Character.prototype.life = 100;
Character.prototype.energy = 100;
Character.prototype.energyRegen = 20 / SECS_TO_NOMINALS;
Character.prototype.ammo = 3;

//Character.prototype.Sprite = g_sprites.walk;

// Direction is either 1 or -1. 1 means right, -1 means left
Character.prototype.direction=1;
// Placeholder value
Character.prototype.maxJumps = 3;
Character.prototype.jumpsLeft = 3;
Character.prototype.inAir = false;
Character.prototype.wasJumping = false;
Character.prototype.isDashing = false;
Character.prototype.dashSpeed = 20;
Character.prototype.dashDuration = 0.1*SECS_TO_NOMINALS;
Character.prototype.currentDashDuration = 0;
Character.prototype.movedFrom = 0;

Character.prototype.STATE_STANDING = 1;
Character.prototype.STATE_RUNNING = 2;
Character.prototype.STATE_JUMPING = 3;
Character.prototype.STATE_DASHING = 4;
Character.prototype.STATE_ATTACKING = 5;
Character.prototype.STATE_FALLING = 6;
Character.prototype.STATE_CROUCHING = 7;

Character.prototype.prevState = 1;


Character.prototype.state = 1;

Character.prototype.KEY_UP = "W".charCodeAt(0);
Character.prototype.KEY_DOWN = "S".charCodeAt(0);
Character.prototype.KEY_LEFT = "A".charCodeAt(0);
Character.prototype.KEY_RIGHT = "D".charCodeAt(0);
Character.prototype.KEY_THROW = " ".charCodeAt(0);
Character.prototype.KEY_DASH_RIGHT = "E".charCodeAt(0);
Character.prototype.KEY_DASH_LEFT = "Q".charCodeAt(0);

//TODO:Images and sounds for character

Character.prototype.update = function(dt)
{

    spatialManager.unregister(this);
    //Gravity computation should probably be moved
    //to entity manager when we get one of those up
    var accelX=0;
    var accelY=this.computeGravity();

    var oldX = this.cx;
	var oldY = this.cy;

	var fallsThrough = false;

	//console.log(this.state)

	if (this.state === this.STATE_STANDING ||
		this.state === this.STATE_RUNNING  ||
		this.state === this.STATE_FALLING
	    ) {



		if( this.velY === 0 				  &&
			this.state === this.STATE_FALLING ){


			this.state = this.STATE_STANDING
			g_audio.landing.Play();

		}

		if(keys[this.KEY_LEFT] && this.STATE_STANDING)
		{
			if(this.state !== this.STATE_RUNNING){
				this.movedFrom = this.cx;
			}
			this.cx -=dt*5;
			this.direction = -1;

			if(this.state !== this.STATE_FALLING ){

				this.state = this.STATE_RUNNING;

			}


		}

		if(keys[this.KEY_RIGHT]&& this.STATE_STANDING)
		{
			if(this.state !== this.STATE_RUNNING){
				this.movedFrom = this.cx;
			}
			this.cx +=dt*5;
			this.direction = 1;

			if(this.state !== this.STATE_FALLING ){

				this.state = this.STATE_RUNNING;

			}

		}

		if(!keys[this.KEY_LEFT] 			  &&
			!keys[this.KEY_RIGHT] 			  &&
			this.state !== this.STATE_FALLING ){

			this.state = this.STATE_STANDING;
			this.movedFrom = 0;
		}

		//jumping code assumes we want to have jumps work
		//in such a way that if the character is falling
		//at too high a speed a jump will only slow him down
		//we might want to add a threshhold to make
		//sure he goes upward in all circumstances

		if(keys[this.KEY_UP])
		{
			this.jump();
		}

		if (eatKey(this.KEY_DOWN)) {
			fallsThrough = true;

			this.state = this.STATE_CROUCHING;

		}

		if (eatKey(this.KEY_THROW)) {
			if(this.ammo >0){
				this.throwDagger();
				if(this.ammo > 0){
					this.ammo -= 1;
				}
			}

		}

		if (eatKey(this.KEY_DASH_LEFT)) {
			if (this.energy >= 50) {
				this.energy -= 50;
				this.dash(-1);
			}
		} else if (eatKey(this.KEY_DASH_RIGHT)) {
			if (this.energy >= 50) {
				this.energy -= 50;
				this.dash(1);
			}
		}

		var isAttacking = entityManager.weapon.isAttacking();
		if(isAttacking){

			this.prevState = this.state;

			this.state = this.STATE_ATTACKING;

		}
	} else if (this.state === this.STATE_JUMPING ) {

		if(!entityManager.weapon.isAttacking){

			this.prevState = this.state;
			this.state = this.STATE_ATTACKING;
		}

		if (!keys[this.KEY_UP]) {
			this.stopJumping();
		}

		if(keys[this.KEY_LEFT])
		{
			this.cx -=dt*5;
			this.direction = -1;
		}

		if(keys[this.KEY_RIGHT])
		{
			this.cx +=dt*5;
			this.direction = 1;
		}

		if (eatKey(this.KEY_THROW)) {
			if(this.ammo >0){
				this.throwDagger();
				if(this.ammo > 0){
					this.ammo -= 1;
				}
			}
		}

		if (eatKey(this.KEY_DASH_LEFT)) {
			this.dash(-1);
		} else if (eatKey(this.KEY_DASH_RIGHT)) {
			this.dash(1);
		}
	} else if (this.state === this.STATE_DASHING) {
		this.updateDash(dt);
	} else if(this.state === this.STATE_CROUCHING){
		if(this.velY > 10){
			this.state = this.STATE_FALLING;

		} else if (keys[this.KEY_DOWN]) {
			this.state = this.STATE_STANDING;
		} else if (eatKey(this.KEY_UP)) {
			this.state = this.STATE_STANDING;
		}
	} else if(this.state === this.STATE_ATTACKING){

		var isAttacking = entityManager.weapon.isAttacking();
		if(!isAttacking){

			this.state = this.prevState;

		}


	}


	this.applyAccel(accelX,accelY,dt);

	// s = s + v_ave * t
    var nextX = this.cx + this.aveVelX * dt;
    var nextY = this.cy + this.aveVelY * dt;

	var hitEntity = this.findHitEntity();

	// if hitEntity is a powerup, pick it up
	util.maybeCall(hitEntity.resolveEffect,
				   hitEntity,
				   [this]);

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

	//console.log("velX: " + this.velX + " velY: " + this.velY);
	//console.log("aveVelX: " + aveVel.X + " aveVelY: " + aveVel.Y);


	// s = s + v_ave * t
    this.cx += dt * this.aveVelX;
    this.cy += dt * this.aveVelY;

	if (this.velY > 0) {}//this.state = this.STATE_FALLING;

	/*var oldCy = this.cy;
	this.clampToBounds();

	if (this.cy !== oldCy) {
		this.velY = 0;
		if (this.cy > 500){} //this.state = this.STATE_STANDING;
	}*/

	// Handle room changes
	if (this.cy < 0) {

		dungeon.goUp(this);
		entityManager.CleanSmanager(dt);
	}
	else if (this.cy > g_canvas.height){

		dungeon.goDown(this);
		entityManager.CleanSmanager(dt);
	}
	else if (this.cx < 0){

		dungeon.goLeft(this);
		entityManager.CleanSmanager(dt);
	}
	else if (this.cx > g_canvas.width){

		dungeon.goRight(this);
		entityManager.CleanSmanager(dt);
	}

	spatialManager.register(this);
	if (this.weapon) this.weapon.update(dt, this);

	if (this.energy < 100) this.energy += dt * this.energyRegen;
	else this.energy = 100;

	if (this.life < 0) {
		g_audio.placeholder.Play();
		return -2;
	}

};

Character.prototype.resolveCollision = function(collisionCode) {
	if (collisionCode === this.TOP_COLLISION ||
	    collisionCode === this.BOTTOM_COLLISION) {
		this.velY = 0;
		this.aveVelY = 0;
		if(this.state !== this.STATE_DASHING){
			this.velX = 0;
		}

		if (collisionCode === this.BOTTOM_COLLISION){} //g_audio.coll.Play();

	} else if (collisionCode === this.SIDE_COLLISION) {
		this.velX = 0;
		this.aveVelX = 0;
	} else if(collisionCode === -1) {


		this.velX = -this.direction * 7;
		this.velY = -15;
	}
};

Character.prototype.hasJumpsLeft = function()
{
     return this.jumpsLeft !== 0;
};

Character.prototype.clampToBounds = function()
{
    var leftBoundary = 0+this.halfWidth;
    var rightBoundary = g_canvas.width-this.halfWidth;

    var topBoundary = 0+this.halfHeight;
    var bottomBoundary = g_canvas.height-this.halfHeight;

	var oldY = this.cy;
    //uses already provided clamping function
    this.cx=util.clampRange(this.cx,leftBoundary,rightBoundary);
    this.cy=util.clampRange(this.cy,topBoundary,bottomBoundary);

    if (this.cy < oldY) this.resetJumps();

};

Character.prototype.render = function (ctx)
{
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

    	sx = g_sprites.walk[0].sx;
	   	sy = g_sprites.walk[0].sy;
	   	height = g_sprites.walk[0].height;
	   	width = g_sprites.walk[0].width;
		image = g_sprites.walk[0];

		g_sprites.walk[0].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
    }
    else if(this.state === this.STATE_RUNNING)
    {

    	var distanceTraveled = Math.abs(this.movedFrom - this.cx);
    	var index = Math.floor((distanceTraveled / 65*9) % 9);

    	sx = g_sprites.walk[index].sx;
		sy = g_sprites.walk[index].sy;
	   	height = g_sprites.walk[index].height;
	   	width = g_sprites.walk[index].width;
	   	image = g_sprites.walk[index];


    	g_sprites.walk[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);
    	if (index === 1) g_audio.walk.Play();

	}
	else if(this.state === this.STATE_ATTACKING)
    {

    	var time = entityManager.weapon.currentAttackTime;
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

    	sx = g_sprites.attackSw[index].sx;
		sy = g_sprites.attackSw[index].sy;
	   	height = g_sprites.attackSw[index].height;
	   	width = g_sprites.attackSw[index].width;
	   	image = g_sprites.attackSw[index];
	   	flip = !flip;


    	g_sprites.attackSw[index].drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

	} else if (this.state === this.STATE_JUMPING || this.state === this.STATE_FALLING) {

		sx = g_sprites.jump.sx;
		sy = g_sprites.jump.sy;
	   	height = g_sprites.jump.height;
	   	width = g_sprites.jump.width;
	   	image = g_sprites.jump;
	   	flip = !flip;

    	g_sprites.jump.drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

	} else if (this.state === this.STATE_CROUCHING){

		sx = g_sprites.crouch.sx;
		sy = g_sprites.crouch.sy;
	   	height = g_sprites.crouch.height;
	   	width = g_sprites.crouch.width;
	   	image = g_sprites.crouch;

    	g_sprites.crouch.drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

	}else if (this.state === this.STATE_DASHING){

		sx = g_sprites.dash.sx;
		sy = g_sprites.dash.sy;
	   	height = g_sprites.dash.height;
	   	width = g_sprites.dash.width;
	   	image = g_sprites.dash;
	   	flip = !flip;

    	g_sprites.dash.drawCharacter(ctx, image, sx, sy, x, y, height, width, flip);

	}else {util.fillBox(ctx,
				 this.cx-this.halfWidth,
				 this.cy-this.halfHeight,
				 this.halfWidth*2,
				 this.halfHeight*2,
				 "red");
	}

	if (this.weapon) this.weapon.render(ctx);



};

Character.prototype.throwDagger = function() {
	entityManager._generateProjectile({cx : this.cx + this.direction*this.halfWidth + this.direction*50,
								  	   cy : this.cy,

									     velX : 10*this.direction,
									     velY : 0,

                       sprite : g_sprites.dagger },

									 entityManager._currentRoomID);
};

Character.prototype.jump = function() {
	if (!this.hasJumpsLeft()) return;
	if (this.energy < 20) return;

	this.energy -= 20;
	this.velY -= 30;
	this.jumpsLeft--;
	this.inAir = true;
	this.wasJumping = true;
	if(this.state !== this.STATE_ATTACKING){
		this.state = this.STATE_JUMPING;
	} else{
		this.prevState = this.STATE_JUMPING;
	}

	g_audio.jumpy.Play();
};

Character.prototype.stopJumping = function() {
  //console.log("stopping jump");

	this.wasJumping = false;

  this.state = this.STATE_FALLING;

  if (this.velY > 0) return;

	this.velY += 15;

  if (this.velY > 0) this.velY = 0;
};

Character.prototype.dash = function (dir) {
	this.direction = dir;
	this.velX = dir*this.dashSpeed;
	this.currentDashDuration = 0;
	this.isDashing = true;
	this.state = this.STATE_DASHING;

	g_audio.dashy.Play();
};

Character.prototype.updateDash = function (du) {
	this.currentDashDuration += du;

	if (this.currentDashDuration >= this.dashDuration) {
		// stop dash
		//console.log("stopping dash");
		this.velX = 0;
		this.isDashing = false;
		this.state = this.STATE_STANDING;
	}
};

Character.prototype.landOn = function(surfaceY) {

	this.cy = surfaceY - this.halfHeight;
	this.velY = 0;
	this.inAir = false;
	this.resetJumps();
	/*if(this.distanceTraveled = 0){

		console.log("her")
		this.state = this.STATE_STANDING;
	}*/

};

Character.prototype.snapTo = function (destX, destY) {
	this.cx = destX;
	this.cy = destY;
};

Character.prototype.resetJumps = function() {
	this.jumpsLeft = this.maxJumps;
};

Character.prototype.getRadius = function() {
	return this.halfHeight;
};

Character.prototype.takeDamage = function(amount){

	if (this.life > 0) {
		this.life = this.life - amount;
		this.cy -= 25;

		g_audio.dmg.Play();
		}




	//else this.death();

};

/*Character.prototype.death = function() {

	//Það þarf death animation.
	//Game over screen?

}
*/
