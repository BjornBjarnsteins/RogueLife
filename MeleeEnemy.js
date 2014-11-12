

this.prototype=new Entity();

function MeleeEnemy(descr)
{
    this.setup(descr);
}

MeleeEnemy.prototype.cy =g_canvas.height-150;
MeleeEnemy.prototype.cx=g_canvas.width/2;
MeleeEnemy.prototype.halfHeight=70;
MeleeEnemy.prototype.halfWidth=40;

MeleeEnemy.prototype.direction=1;
MeleeEnemy.prototype.range=210;
MeleeEnemy.currentWalkLength=0;

MeleeEnemy.prototype.isAttacking=false;


MeleeEnemy.prototype.render = function(ctx)
{

    ctx.fillStyle ="red";
    ctx.fillRect(this.cx-this.halfWidth,
		 this.cy-this.halfHeight,
		 this.halfWidth*2,
		 this.halfHeight*2);

};

MeleeEnemy.prototype.update = function(dt)
{
    if(this.isAttacking)
    {
	this.attack(dt);
	return;
    }
    if(this.currentWalkLengt<this.range)
    {
	this.cx+=this.direction*5;
	this.currentWalkLength +=5
    }
    else
    {
	this.direction *=-1;
	this.currentWalkLength=0;
	this.isAttacking=true;
	this.attack(dt);
    }
    
    
    

};

MeleeEnemy.prototype.attack = function(dt)
{
    
    this.cx += this.direction*15;
    this.currentWalkLength += 15;
    if(this.currentWalkLength>this.range/3)
	this.isAttacking=false;
	

};


