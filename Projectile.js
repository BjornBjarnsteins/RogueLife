// ==========
// PROJECTILE
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Projectile(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
   	g_audio.knifethrow.Play();
}

Projectile.prototype = new Entity();

//TODO: Audio

// Initial, inheritable, default values
Projectile.prototype.rotation = 0;
Projectile.prototype.cx = 200;
Projectile.prototype.cy = 200;
Projectile.prototype.velX = 1;
Projectile.prototype.velY = 1;
Projectile.prototype.fallsThrough = -1;


Projectile.prototype.halfWidth = 5;
Projectile.prototype.halfHeight = 2;

// Convert times from milliseconds to "nominal" time units.
Projectile.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Projectile.prototype.update = function (dt) {

    spatialManager.unregister(this);

    this.lifeSpan -= dt;

    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    var oldX = this.cx;
    var oldY = this.cy;

    var nextX = this.cx + this.velX * dt;
    var nextY = this.cy ;


    if(this.cx > 1000 ||
        this.cx < 0){
        return entityManager.KILL_ME_NOW;
    }

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeDamage(5);
        if (canTakeHit) canTakeHit.call(hitEntity);
        return entityManager.KILL_ME_NOW;
    }


    var hitObstacles = dungeon.getCurrentRoom().getObstaclesInRange(this);

    var collisionCode = -1;

    for (var i = 0; i < hitObstacles.length; i++) {
        if(!hitObstacles[i]._isDeadNow){
            //console.log("er að fara að kalla með gildum", oldX,oldY,nextX,nextY)
            collisionCode = util.maybeCall(hitObstacles[i].collidesWith,
                                       hitObstacles[i],
                                       [this, oldX, oldY, nextX, nextY, this.fallsThrough]);
        }

        this.resolveCollision(collisionCode);
        if(collisionCode === -1){break;}
    }
    
    this.cx += this.velX * dt;
    this.cy += this.velY * dt;

    spatialManager.register(this);
};

Projectile.prototype.getRadius = function () {
    return 4;
};

Projectile.prototype.takeDamage = function(a){
    return;
}


Projectile.prototype.takeProjectileHit = function () {
    this.kill();

    // Make a noise when I am zapped by another bullet
    //this.zappedSound.play();
};

Projectile.prototype.render = function (ctx) {
    if (this.sprite) {
      this.sprite.drawCentredAt(ctx, this.cx-this.halfWidth, this.cy-this.halfHeight-20,
                                this.velX < 0 ? Math.PI : 0,
                                this.velX < 0 ? 1 : 0);
    } else {
      util.fillBox(ctx,
				           this.cx-this.halfWidth*2,
				           this.cy-this.halfHeight*2,
          				 this.halfWidth*2,
				           this.halfHeight*2,
				           "blue");
    }
};

Projectile.prototype.stopMe = function (entity, side){
    util.maybeCall(entity.snapTo,
                   entity,
                   [this.cx + side*(this.halfWidth + entity.halfWidth + 5), entity.cy]);
};

// Assumes entity is within the bounding circle
Projectile.prototype.collidesWith = function (entity, oldX, oldY, nextX, nextY) {
   
    console.log("here")
    var entUpperBound = nextY - entity.halfHeight;
    var entLowerBound = nextY + entity.halfHeight;
    var entRightBound = nextX + entity.halfWidth;
    var entLeftBound  = nextX - entity.halfWidth;

    if (entLeftBound  <= this.getRightBound() &&
        entRightBound >= this.getLeftBound()) {
        if (entLowerBound >= this.getUpperBound() &&
            entUpperBound <= this.getLowerBound()) {
            // checks for collision details

            if (entity.getLowerBound() <= this.getUpperBound()) {
                this.groundMe(entity);
                return entity.TOP_COLLISION;
            } else if (entity.getUpperBound() >= this.getLowerBound()) {
        entity.snapTo(entity.cx, this.getLowerBound() + entity.halfHeight);
                return entity.BOTTOM_COLLISION;
            } else if (oldX < this.cx){
                this.stopMe(entity, -1);
            } else {
                this.stopMe(entity, 1);
            }

            return entity.SIDE_COLLISION;
        }
    }

    return false;
}

Projectile.prototype.resolveCollision = function(collisionCode) {
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

Projectile.prototype.snapTo = function (destX, destY) {
    this.cx = destX;
    this.cy = destY;
};