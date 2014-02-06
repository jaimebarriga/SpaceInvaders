function Keycontrol() {
	this.LEFT = 37;
	this.RIGHT = 39;
	this.SPACE = 32;

	this.keydown = function(e) {
		e = e || window.event;
		
		if (e.keyCode == this.LEFT) {
			ship.action = "left";
		} else if (e.keyCode == this.RIGHT) {
			ship.action = "right";
		}
		
	}

	this.keyup = function(e) {
		e = e || window.event;

		if (e.keyCode == this.LEFT) {
			ship.action = "";
		} else if (e.keyCode == this.RIGHT) {
			ship.action = "";
		}
	}
}