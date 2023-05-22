local t = Def.ActorFrame{

	Def.Sprite {
		Texture="tap bar";
		Frame0000=0;
		Delay0000=1;
		HoldingOnCommand=NOTESKIN:GetMetricA("Holding1", "HoldingOnCommand");
		RollOnCommand=NOTESKIN:GetMetricA("Holding1", "HoldingOnCommand");
	};
	Def.Sprite {
		Texture="hold explosion 4x1";
		Frame0000=0;
		Delay0000=0.03;
		Frame0001=1;
		Delay0001=0.03;
		Frame0002=2;
		Delay0002=0.03;
		Frame0003=3;
		Delay0003=0.03;
		HoldingOnCommand=NOTESKIN:GetMetricA("Holding2", "HoldingOnCommand");
		RollOnCommand=NOTESKIN:GetMetricA("Holding2", "HoldingOnCommand");
	};


};

return t;