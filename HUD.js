var HUD = {
	_showHUD : true,

	KEY_TOGGLE_HUD : keyCode("H"),

	renderLifeBar : function (ctx) {
		ctx.save();

		var player = entityManager._getPlayer();
		util.fillBox(ctx, 788, 558, 204, 19, "black");
		util.fillBox(ctx, 790, 560, player.life/player.maxLife * 200, 15, "red");
		ctx.textAlign = "right";
		ctx.font = "11px georgia";
		ctx.fillText(player.life + "/" + player.maxLife, 980, 570);

		ctx.restore();
	},

	renderEnergyBar : function (ctx) {
		ctx.save();

		var player = entityManager._getPlayer();
		util.fillBox(ctx, 788, 578, 204, 19, "black");
		util.fillBox(ctx, 790, 580, player.energy/player.maxEnergy * 200, 15, "#468D00");
		ctx.textAlign = "right";
		ctx.font = "11px georgia";
		ctx.fillText(Math.floor(player.energy) + "/" + player.maxEnergy, 980, 590);

		ctx.restore();
	},

	renderDaggersLeft : function (ctx) {
		ctx.save();

		var player = entityManager._getPlayer();
		g_sprites.dagger.drawAt(ctx, 700, 550);
		ctx.font = "20px georgia";
		ctx.textAlign = "left";
		ctx.baseLine = "middle";
		ctx.fillText(player.ammo, 750, 580);

		ctx.restore();
	},

	renderScore : function (ctx) {
		ctx.save();


		var player = entityManager._getPlayer();
		ctx.font = "20px georgia";
		ctx.textAlign = "left";
		ctx.baseLine = "middle";
		ctx.fillText("Score: "+player.score, 910, 25);

		ctx.restore();
	},

	render : function (ctx) {
		if (!this._showHUD) return;
		if(entityManager._getPlayer()){
			this.renderLifeBar(ctx);
			this.renderEnergyBar(ctx);
			this.renderDaggersLeft(ctx);
			this.renderScore(ctx);
		}
	},

	update : function (du) {
		if (eatKey(this.KEY_TOGGLE_HUD)) this._showHUD = !this._showHUD;
	}
};
