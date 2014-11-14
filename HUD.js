var HUD = {
	_showHUD : true,

	KEY_TOGGLE_HUD : keyCode("H"),

	renderLifeBar : function (ctx) {
		var player = entityManager._getPlayer();
		util.fillBox(ctx, 788, 558, 204, 19, "black");
		util.fillBox(ctx, 790, 560, player.life/player.maxLife * 200, 15, "red");
	},

	renderEnergyBar : function (ctx) {
		util.fillBox(ctx, 788, 578, 204, 19, "black");
		util.fillBox(ctx, 790, 580, entityManager._getPlayer().energy * 2, 15, "#7CFC00");
	},

	render : function (ctx) {
		if (!this._showHUD) return;

		this.renderLifeBar(ctx);
		this.renderEnergyBar(ctx);
	},

	update : function (du) {
		if (keys[this.KEY_TOGGLE_HUD]) this._showHUD = !this._showHUD;
	}
};
