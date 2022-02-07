class square{
	 constructor(_phase){
		 this.x=0;
		 this.y=0;
		 this.angle=0;
		 this.scale=1;
		 this.phase = _phase;
		 this.phaseAngle = 180;
		 this.r=0;
		 this.g=0;
		 this.b=0;
	 }

	 OnClick(){
		 this.phase++;
		 this.phase = this.phase % 4; 
		 this.phaseAngle = 0;
	 }

	 Draw(){
		 let newScale = this.scale;
		if(this.phaseAngle < PI){
			newScale *= 1 + Math.sin(this.phaseAngle)/10;
			this.phaseAngle += 0.1;
		} 

		let r,g,b
		
		 push();
		 translate(this.x,this.y);
		 rotate(this.angle * PI / 180);
		 scale(newScale);
		 noStroke();
		 if(this.phase>=0){r=255;g=0;b=0;};
		 if(this.phase>=1){r=0;g=255;b=0;};
		 if(this.phase>=2){r=0;g=0;b=255;};
		 if(this.phase>=3){r=255;g=200;b=0;};
		 
		 this.r +=(r-this.r)/20;
		 this.g +=(g-this.g)/20;
		 this.b +=(b-this.b)/20;

		 fill(this.r,this.g,this.b);

		 rect(-120,-120,240,240,18);
		 
		 fill(255,255,255);
		 if(this.phase>=0)circle(90,-90,20);
		 if(this.phase>=1)circle(-90,-90,20);
		 if(this.phase>=2)circle(-90,90,20);
		 if(this.phase>=3)circle(90,90,20);
		 pop();

	 }
}

function XN360(_ang){
	if(_ang >= 360) return 360-_ang;
	return _ang;
}