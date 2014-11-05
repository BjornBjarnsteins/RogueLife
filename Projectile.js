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
    //this.fireSound.play();
}

Projectile.prototype = new Entity();

//TODO: Audio

// Initial, inheritable, default values
Projectile.prototype.rotation = 0;
Projectile.prototype.cx = 200;
Projectile.prototype.cy = 200;
Projectile.prototype.velX = 1;
Projectile.prototype.velY = 1;

Projectile.prototype.halfWidth = 5;
Projectile.prototype.halfHeight = 2;

// Convert times from milliseconds to "nominal" time units.
Projectile.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Projectile.prototype.update = function (du) {

    //spatialManager.unregister(this);

    this.lifeSpan -= du;

    if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    /*var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeProjectileHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        return entityManager.KILL_ME_NOW;
    }

    spatialManager.register(this);*/

};

Projectile.prototype.getRadius = function () {
    return 4;
};

Projectile.prototype.takeProjectileHit = function () {
    this.kill();

    // Make a noise when I am zapped by another bullet
    //this.zappedSound.play();
};

Projectile.prototype.render = function (ctx) {
    if (this.sprite) {
      this.sprite.drawCentredAt(ctx, this.cx, this.cy,
                                this.velX < 0 ? Math.PI : 0,
                                this.velX < 0 ? 1 : 0);
    } else {
      util.fillBox(ctx,
				           this.cx-this.halfWidth,
				           this.cy-this.halfHeight,
          				 this.halfWidth*2,
				           this.halfHeight*2,
				           "blue");
    }
};
