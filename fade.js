"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var fade = {

	clusterfuck : function (ctx) {
	if (g_fadein) {
			if (g_fadeout > 1) {
				g_fadein = false;
				ctx.globalAlpha = 1;
				g_fadeout = 1.0;
				}
			else {
				ctx.globalAlpha = g_fadeout;
				if (g_deathfade || g_finished) g_fadeout += 0.005;
				else g_fadeout += 0.05
				g_startscreen = false;
				}
			}
	
	else if (g_startscreen) {	
		if (g_dofade)	{
			if (g_fadeout < -0.01) {
								g_dofade = false;
								g_fadein = true;
								g_fadeout = 0;
								ctx.globalAlpha = 0;
								
								}
			else {
				ctx.globalAlpha = g_fadeout;
				g_fadeout -= 0.01;
				startscreen.startrender(ctx);
				}	
		}
		else startscreen.startrender(ctx);
	}
	
	if (g_deathfade && g_dofade) {
		if (g_fadeout < -0.01) {
				g_dofade = false;
				g_fadein = true;
				g_deathscreen = !g_deathscreen;
				if (g_deathscreen === false) entityManager._getPlayer().death();
				g_fadeout = 0;
				ctx.globalAlpha = 0;
		}
		
		else {
			ctx.globalAlpha = g_fadeout;
			g_fadeout -= 0.01;
			}	
	}
	
	if (g_victoryscreen) {
		if (g_dofade)	{
			if (g_fadeout < -0.01) {
								g_dofade = false;
								g_fadein = true;
								g_fadeout = 0;
								ctx.globalAlpha = 0;
								g_finished = true;
						}
			else {
				ctx.globalAlpha = g_fadeout;
				g_fadeout -= 0.01;
				}	
		}
	}
}
}
