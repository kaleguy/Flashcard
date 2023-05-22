local t = Def.ActorFrame{
	-- light
	Def.Sprite {
		Texture="tap light2";
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorGhost', 'InitCommand');
		W3Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W3Command');
		W2Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W2Command');
		W1Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W1Command');
	};
	Def.Sprite {
		Texture="tap light1";
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorPressLight', 'InitCommand');
		PressCommand=NOTESKIN:GetMetricA('ReceptorPressLight', 'PressCommand');
		LiftCommand=NOTESKIN:GetMetricA('ReceptorPressLight', 'LiftCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	-- red line
	Def.Sprite {
		Texture=NOTESKIN:GetPath( '_bar', 'receptor base' );
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'InitCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
		PressCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	-- green bar
	Def.Sprite {
		Texture="tap bar";
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorPressBar', 'InitCommand');
		PressCommand=NOTESKIN:GetMetricA('ReceptorPressBar', 'PressCommand');
		LiftCommand=NOTESKIN:GetMetricA('ReceptorPressBar', 'LiftCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	Def.Sprite {
		Texture="button2";
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorButton', 'InitCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	Def.Sprite {
		Texture="button1";
		Frame0000=0;
		Delay0000=1;
		InitCommand=NOTESKIN:GetMetricA('ReceptorButton', 'InitCommand');
		PressCommand=NOTESKIN:GetMetricA('ReceptorButton', 'PressCommand');
		LiftCommand=NOTESKIN:GetMetricA('ReceptorButton', 'LiftCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};


};

return t;