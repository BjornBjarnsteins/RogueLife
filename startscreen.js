"use strict";

var startscreen = {	
	
	startrender : function(ctx) {
		ctx.save();
		g_sprites.logo.drawAt(ctx,0,0);
		ctx.restore();
	},	
	
	deathrender : function(ctx) {
		ctx.save();
		g_sprites.death.drawAt(ctx,0,0);
		ctx.restore();
	},
	
	victoryrender : function(ctx) {
		ctx.save();
		g_sprites.victory.drawAt(ctx,0,0);
		ctx.restore();
	},
	
	creditsrender : function(ctx) {
		ctx.save();
		g_sprites.credits.drawAt(ctx,0,0);
		ctx.restore();
	}

}
		
