"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var fade = {

	/*clusterfuck : function (ctx) {
	
	
	if (g_fadein && !g_startscreen) {
			if (g_fadeout > 1) {
				g_fadein = false;
				ctx.globalAlpha = 1;
				g_fadeout = 1.0;
				if (g_startscreen) g_startscreen = false;
				}
			else {
				util.fillBox(ctx, 0, 0, 1000, 600, "black");
				ctx.globalAlpha = g_fadeout;
				g_fadeout += 0.01
				ctx.globalAlpha = 1;
				}
			}
	

	}
	
	if (g_deathfade && g_dofade) {
		if (g_fadeout < -0.01) {
				g_dofade = false;
				g_fadein = true;
				g_deathscreen = !g_deathscreen;
				
				g_fadeout = 0;
				ctx.globalAlpha = 0;
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
},*/

	startfadein : function (ctx) {
		if (g_fadeout < 0.01) {
				g_fadein = false;
				ctx.globalAlpha = 1;
				g_fadeout = 0.0;
				if (g_startscreen) g_startscreen = false;
				if (g_lastfade) g_lastfade = false;
				if (g_victoryscreen) g_stop = true;
		}
		else {
				ctx.globalAlpha = g_fadeout;
				g_fadeout -= 0.01
				util.fillBox(ctx, 0, 0, 1000, 600, "black");
				ctx.globalAlpha = 1;
				if (g_fadeout < 0.9 && g_startscreen) g_stopscreen = false;
		}	
	},	
	
	startfadeout : function (ctx) {			//fade-a úr bakgrunninn í stóra svartan kassa
			if (g_fadeout > 1.01) {
							g_dofade = false;
							if (g_victoryscreen) g_finished = true;
							if (!g_deathfade || !g_finished) g_fadein = true;
							else g_fadein = false;
							g_fadeout = 1;
							ctx.globalAlpha = 1;
							if (g_showstart) g_showstart = false;
							if (g_deathfade && !g_deathscreen) g_deathscreen = true;
							else if (g_deathfade && g_deathscreen) {
								g_deathscreen = false;
								g_lastfade = true;
								entityManager._getPlayer().death();
							}
				}
			else {
				ctx.globalAlpha = g_fadeout;
				g_fadeout += 0.01;
				util.fillBox(ctx, 0, 0, 1000, 600, "black");
				ctx.globalAlpha = 1;
				}	
	
	}
}
