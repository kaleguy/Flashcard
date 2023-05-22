local Reverse = string.find(GAMESTATE:GetPlayerState(pn):GetPlayerOptionsString("ModsLevel_Preferred"), "Reverse");
local t = Def.ActorFrame{
	-- light
	Def.Sprite {
		Texture="tap light2";
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:vertalign(top):addy(-360):diffusealpha(0)
			else
				self:vertalign(top):addy(360):diffusealpha(0):addrotationz(180)
			end
		end,
		W3Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W3Command');
		W2Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W2Command');
		W1Command=NOTESKIN:GetMetricA('ReceptorGhost', 'W1Command');
	};
	Def.Sprite {
		Texture="tap light1";
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:vertalign(bottom):addy(45):diffusealpha(0)
			else
				self:vertalign(bottom):addy(-45):diffusealpha(0):addrotationz(180)
			end
		end,
		PressCommand=NOTESKIN:GetMetricA('ReceptorPressLight', 'PressCommand');
		LiftCommand=NOTESKIN:GetMetricA('ReceptorPressLight', 'LiftCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	-- red line
	Def.Sprite {
		Texture=NOTESKIN:GetPath( '_bar', 'receptor base' );
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:diffusealpha(1)
			else
				self:diffusealpha(1):addrotationz(180)
			end
		end,
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
		PressCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	-- green bar
	Def.Sprite {
		Texture="tap bar";
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:addy(32):diffusealpha(1)
			else
				self:addy(-32):diffusealpha(1):addrotationz(180)
			end
		end,
		PressCommand=function(self)
			if Reverse then
				self:finishtweening():addy(-32):decelerate(0.2)
			else
				self:finishtweening():addy(32):decelerate(0.2)
			end
		end,
		LiftCommand=function(self)
			if Reverse then
				self:decelerate(0.2):addy(32)
			else
				self:decelerate(0.2):addy(-32)
			end
		end,
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	Def.Sprite {
		Texture="button2";
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:addy(45):diffusealpha(1)
			else
				self:addy(-45):diffusealpha(1):addrotationz(180)
			end
		end,
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};
	Def.Sprite {
		Texture="button1";
		Frame0000=0;
		Delay0000=1;
		InitCommand=function(self)
			if Reverse then
				self:addy(45):diffusealpha(1)
			else
				self:addy(-45):diffusealpha(1):addrotationz(180)
			end
		end,
		PressCommand=NOTESKIN:GetMetricA('ReceptorButton', 'PressCommand');
		LiftCommand=NOTESKIN:GetMetricA('ReceptorButton', 'LiftCommand');
		NoneCommand=NOTESKIN:GetMetricA('ReceptorArrow', 'NoneCommand');
	};


};

return t;