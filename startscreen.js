"use strict";

var startscreen = {	
	render : function(ctx) {
		ctx.save();
		g_sprites.logo.drawAt(ctx,0,0);
		ctx.scale(10, 10);
		ctx.restore();
	}
}
		
