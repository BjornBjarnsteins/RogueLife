

this.prototype=new Entity();

function FlyingEnemy(descr)
{
    this.setup(descr);
}

FlyingEnemy.prototype.cy =g_canvas.height-150;
FlyingEnemy.prototype.cx=g_canvas.width/2;
FlyingEnemy.prototype.halfHeight=40;
FlyingEnemy.prototype.halfWidth=40;

FlyingEnemy.prototype.direction=1;

FlyingEnemy.prototype.isAttacking=false;


FlyingEnemy.prototype.render = function(ctx)
{
	//placeholder

    ctx.fillStyle ="blue";
    ctx.fillRect(this.cx-this.halfWidth,
		 this.cy-this.halfHeight,
		 this.halfWidth*2,
		 this.halfHeight*2);
		   		

};

FlyingEnemy.prototype.update = function(dt)
{
	
};

FlyingEnemy.prototype.attack = function(dt)
{
};



