//eins og stendur brýt ég smá privacy með að sækja
//cx og cy úr characternum en ef við lítum svo á að
//Characterinn og vopnið eigi hvort annað er það legit


Weapon = function(descr)
{
    //inherited default initiator
    this.setup(descr);


};

Weapon.prototype = new Entity();

//betra að tracka handfangið á vopninu en miðjuna fyrir
//attack animations

Weapon.prototype.handleX=200;
Weapon.prototype.handleY=200;
Weapon.prototype.thickness=5;

//árásar tengdar breytur
//lengd einnar árásar í sekúndum
Weapon.prototype.maximumAttackTime=0.15*SECS_TO_NOMINALS;
Weapon.prototype.currentAttackTime=0;


//Size and orientation
//direction should be 1 if and only if the weapon should strike to the right
//direction should be -1 if and only if the weapon should strike to the left
Weapon.prototype.maximumReach=40;
Weapon.prototype.currentReach=0;
Weapon.prototype.direction=1;
//rotation?

Weapon.prototype.KEY_ATTACK="N".charCodeAt(0);

Weapon.prototype.update = function(dt, character)
{
    if(character)
    {
	this.handleX = character.cx+character.direction*character.halfWidth;
	this.handleY = character.cy;
	this.direction=character.direction
    }

    if(keys[this.KEY_ATTACK]&&this.currentAttackTime===0)
    {
	   this.currentAttackTime=this.maximumAttackTime;
    }

    if(this.currentAttackTime!==0)
	this.attackUpdate(dt);

};

Weapon.prototype.isAttacking = function(){
    if(this.currentAttackTime > 0) return true;

    return false;
};

/* Ég held að einfaldasta leiðin til þess að höndla árásir sé að teikna hana
 * bara sem tvær stellingar á characternum. Fyrri er stutt windup og seinni er
 * árásin sjálf. Árásin myndi þá basically búa til svæði í stuttan tíma (kannski
 * 0.5s eða svo) þar sem óvinir sem fara í svæðið deyja/taka skaða. Eftir þann tíma
 * myndi characterinn fara í venjulega stöðu
**/
Weapon.prototype.attackUpdate = function(dt)
{
    //console.log("Attacking!");
    this.currentAttackTime = this.currentAttackTime-dt;
    if(this.currentAttackTime<=0)
    {
	this.currentAttackTime=0;
	this.currentReach=-1;
	return;
    }
    var halfMaximum=this.maximumAttackTime/2;

    //finds out how far along the attack is and extends the weapon
    //or retracts it
    if(this.currentAttackTime>halfMaximum)
    {
	var timeRatio = 2*(halfMaximum-this.currentAttackTime/2)/halfMaximum;
	this.currentReach=this.maximumReach*timeRatio;
    }
    else if(this.currentAttackTime<halfMaximum)
    {
	var timeRatio = (this.currentAttackTime)/halfMaximum;
	this.currentReach=this.maximumReach*timeRatio;
    }

    //console.log(this.currentReach);

    //TODO:need to check for collisions when spatial manager gets going

};

Weapon.prototype.render = function(ctx)
{
    if(this.currentAttackTime===0)
	return;
    ctx.save();
    ctx.fillStyle="green";
    if(this.direction===1)
    {
	ctx.fillRect(this.handleX,
		     this.handleY,
		     this.currentReach,
		     this.thickness
		     );
    }
    if(this.direction===-1)
    {
	ctx.fillRect(this.handleX,
		     this.handleY,
		     -this.currentReach,
		     this.thickness
		     );
    }

    ctx.restore();
};











