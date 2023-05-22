local t = Def.ActorFrame{
	Def.Sprite {
		Texture="bom";
		Frame0000=0;
		Delay0000=1;
		W5Command=NOTESKIN:GetMetricA("Bom", "W5Command");
		W4Command=NOTESKIN:GetMetricA("Bom", "W4Command");
		W3Command=NOTESKIN:GetMetricA("Bom", "W3Command");
		W2Command=NOTESKIN:GetMetricA("Bom", "W2Command");
		W1Command=NOTESKIN:GetMetricA("Bom", "W1Command");
		HeldCommand=NOTESKIN:GetMetricA("Bom","HeldCommand");
	};
	Def.Sprite {
		Texture="boom";
		Frame0000=0;
		Delay0000=1;
		W5Command=NOTESKIN:GetMetricA("Boom", "W5Command");
		W4Command=NOTESKIN:GetMetricA("Boom", "W4Command");
		W3Command=NOTESKIN:GetMetricA("Boom", "W3Command");
		W2Command=NOTESKIN:GetMetricA("Boom", "W2Command");
		W1Command=NOTESKIN:GetMetricA("Boom", "W1Command");
		HeldCommand=NOTESKIN:GetMetricA("Boom", "HeldCommand");
	};

};

return t;