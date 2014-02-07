function Keycontrol() {
	this.LEFT = 37;
	this.RIGHT = 39;
	this.SPACE = 32;
	this.SAFE = 49;

	this.keydown = function(e) {
		e = e || window.event;
		
		if (e.keyCode == this.LEFT) {
			//ship.action = "left";
			shipLeft = true;
		} else if (e.keyCode == this.RIGHT) {
			//ship.action = "right";
			shipRight = true;
		}
		else if (e.keyCode == this.SPACE) {
			shipFire = true;
		}
		else if (e.keyCode == this.SAFE){
			console.log(ship.safe);
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
		else if (e.keyCode == this.SPACE) {
			shipFire = false;
		}
	}
}