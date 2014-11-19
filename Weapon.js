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

Weapon.prototype.halfWidth = 32;
Weapon.prototype.halfHeight = 32;
Weapon.prototype.cx = 0;
Weapon.prototype.cy = 0;



//árásar tengdar breytur
//lengd einnar árásar í sekúndum
Weapon.prototype.maximumAttackTime=0.15*SECS_TO_NOMINALS;
Weapon.prototype.currentAttackTime=0;
Weapon.prototype.activeAttack = false;



//Size and orientation
//direction should be 1 if and only if the weapon should strike to the right
//direction should be -1 if and only if the weapon should strike to the left
Weapon.prototype.maximumReach=64;
Weapon.prototype.currentReach=0;
Weapon.prototype.direction=1;
//rotation?

Weapon.prototype.attack = 10;

Weapon.prototype.KEY_ATTACK="N".charCodeAt(0);

Weapon.prototype.update = function(dt, character)
{


    if(character){
        if(character.direction === 1){
            this.cx = character.cx + 73;
            this.cy = character.cy;
        }else{
            this.cx = character.cx -73;
            this.cy = character.cy;
        }

    }

    if(keys[this.KEY_ATTACK]&&this.currentAttackTime===0)
    {
    	   //Play the attack sound
	   g_audio.swordshit.Play();
	   this.currentAttackTime=this.maximumAttackTime;

       this.activeAttack = true;
    }

    if(this.activeAttack)
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
    spatialManager.unregister(this)

    this.currentAttackTime = this.currentAttackTime-dt;
    if(this.currentAttackTime<=0)
    {
       this.currentAttackTime=0;
       this.currentReach=-1;
       this.activeAttack = false;
       return;
    }

    var hitEntity = this.findHitEntity();

    if (hitEntity) {
        var canTakeHit = hitEntity.takeDamage(this.attack);
        if (canTakeHit) canTakeHit.call(hitEntity(this.attack));
        return entityManager.KILL_ME_NOW;

    }

     spatialManager.register(this);

};

Weapon.prototype.getRadius = function(){
    return 32;
}

Weapon.prototype.render = function(ctx)
{

};











