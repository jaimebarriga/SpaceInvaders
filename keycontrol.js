function Keycontrol() {
	this.LEFT = 37;
	this.RIGHT = 39;
	this.SPACE = 32;

	this.keydown = function(e) {
		e = e || window.event;
		
		if (e.keyCode == this.LEFT) {
			//ship.action = "left";
			shipLeft = true;
		} else if (e.keyCode == this.RIGHT) {
			//ship.action = "right";
			shipRight = true;
		}
		
	}

	this.keyup = function(e) {
		e = e || window.event;

		if (e.keyCode == this.LEFT) {
			//ship.action = "";
			shipLeft = false;
		} else if (e.keyCode == this.RIGHT) {
			//ship.action = "";
			shipRight = false;
		}
	}
}