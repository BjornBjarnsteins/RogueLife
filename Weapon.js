//eins og stendur brýt ég smá privacy með að sækja
//cx og cy úr characternum en ef við lítum svo á að
//Characterinn og vopnið eigi hvort annað er það legit


Weapon = function(descr)
{
    //inherited default initiator
    this.setup(descr);


}

Weapon.prototype = Entity();

//betra að tracka handfangið á vopninu en miðjuna fyrir
//attack animations

Weapon.prototype.handleX=200;
Weapon.prototype.handleY=200;
Weapon.prototype.thickness=3;

//árásar tengdar breytur
//lengd einnar árásar í sekúndum
Weapon.prototype.maximumAttackTime=3*SECS_TO_NOMINALS;
Weapon.prototype.currentAttackTime=0;

//
Weapon.prototype.Character=null;

//Size and orientation
//leftRight should be 1 if and only if the weapon should strike to the right
//leftRight should be -1 if and only if the weapon should strike to the left
Weapon.prototype.maximumReach=15;
Weapon.prototype.currentReach=0;
//TODO: update leftRight, maybe give Character leftRight property?
Weapon.prototype.leftRight=1;
//rotation?

Weapon.prototype.KEY_ATTACK=this.Character.KEY_ATTACK||"N".charCodeAt(0);
//hvert vopn hefur Character og hver character hefur vopn
//Eina leiðin sem mér datt í hug að vopnið gæti alltaf verið 
//í höndunum á characternum án þess að brjóta privacy

Weapon.prototype.update = function(dt)
{
    if(this.Character)
    {
	
	this.handleX = this.Character.cx+this.Character.halfWidth;
	this.handleY = this.Character.cy;
    }


ctx.restore();
    if(g_keys[this.KEY_ATTACK]&&this.currentAttackTime===0)
    {
	this.currentAttackTime=this.maximumAttackTime;
    }
	

    if(this.currentAttackTime!==0)
	this.attackUpdate(dt);

};

Weapon.prototype.attackUpdate = function(dt)
{
    this.currentAttackTime = this.currentAttackTime-dt;
    //TODO:needs secs to nominals adjustment
    if(this.currentAttackTime<=0)
    {
	this.currentAttackTime=0;
	return;
    }
    var halfMaximum=this.maximumAttackTime/2;

    //finds out how far along the attack is and extends the weapon
    //or retracts it
    if(this.currentAttackTime>halfMaximum)
    {
	var timeRatio = (halfMaximum-this.currentAttackTime/2)/halfMaximum;
	this.currentReach=this.maximumReach*timeRatio;
    }
    else if(this.currentAttackTime<halfMaximum)
    {
	var timeRatio = (this.currentAttackTime-halfMaximum)/halfMaximum;
	this.currentReach=this.maximumReach*timeRatio;
    }

    //TODO:need to check for collisions when spatial manager gets going

};

Weapon.prototype.render = function(ctx)
{
    ctx.save();
    ctx.fillStyle="green":
    if(leftRight===1)
    {
	ctx.fillRect(this.handleX,
		     this.HandleY,
		     this.currentReach,
		     this.thickness
		     );
    }
    if(leftRight===-1)
    {
	ctx.fillRect(this.handleX-this.currentReach,
		     this.handleY-this.currentReach,
		     -this.currentReach,
		     this.thickness
		     );
    }

    ctx.restore();
};
		     
		     
	
    
    






