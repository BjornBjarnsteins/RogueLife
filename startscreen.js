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
		ctx.font = "25px Levetica";
		ctx.fillText("Your Score: " + entityManager._getPlayer().score, 800, 50);
		ctx.restore();
	},
	
	creditsrender : function(ctx) {
		ctx.save();
		g_sprites.credits.drawAt(ctx,0,0);
		ctx.restore();
	},
	
	storyrender : function(ctx) {
		ctx.save();
		if (!g_story2) g_sprites.epic.drawAt(ctx,0,0);
		else g_sprites.epic2.drawAt(ctx,0,0);
		ctx.restore();
	}

}
		
