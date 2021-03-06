// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image.image;

    this.sx = image.sx;
    this.sy = image.sy;
    this.width = image.Width;
    this.height = image.Height;
    this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image,
                  x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, flip) {
    if (rotation === undefined) rotation = 0;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, flip ? -this.scale : this.scale);

    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image,
                  -w/2, -h/2);

    ctx.restore();
};

Sprite.prototype.drawCharacter = function(ctx, image, sx, sy, cx, cy, height, width, flip){
    ctx.save();
    
    ctx.translate(cx,cy);

    if(flip){
        ctx.scale( -1.4 , 1.4);
    }
    else{
        
        ctx.scale(1.4,1.4)
    }
    if(width > 64 ){
        ctx.drawImage(image.image, sx, sy, width, height, -width/6, -height/2-3, image.width, image.height);
    }else{

        ctx.drawImage(image.image, sx, sy, width, height, -width/2, -height/2-3, image.width, image.height);
    }
    ctx.restore();
    
    ctx.save();

    ctx.restore();
}

Sprite.prototype.drawWall = function(ctx, image, sx, sy, cx, cy, height, width){
    ctx.save();
    
    ctx.translate(cx,cy);

        
    ctx.scale(0.5,0.5)
    
        
    ctx.drawImage(image.image, sx, sy, width, height, -width/2, -height/2-3, image.width, image.height);
    
    ctx.restore();
    
    ctx.save();

    ctx.restore();
}

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;

    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);

    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
