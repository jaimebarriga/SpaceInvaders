var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

var monsterAction = "left";
var shipMove = false;
var shipFire = false;
var level = 1;

function Ship(startx, starty) {
  
  this.image = new Image();
  this.image.src = "images/ship.png";
  this.width = 26;
  this.height = 16;
  this.visible= true;
  
  this.x = startx;
  this.y = starty;
  
  this.moveto = function(posx, posy) {
    if ((posx > 0) && (posx < gameboard.width)) {
      this.x = posx;
      this.y = posy;
    }
  }

  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
  }

  this.move = function() {
    if(shipAction = "left"){
      this.moveleft(1);
      return;
    }
    else if(shipAction = "right"){
      this.moveright(1);
      return;
    }
    else {
      return;
    }
  }

  this.moveleft = function(num) {
    this.moveto(this.x - num, this.y);
  }

  this.moveright = function(num) {
    this.moveto(this.x + num, this.y);
  }

  this.movedown = function(num) {
    this.moveto(this.x, this.y + num);
  }
}

function bullet(startx, starty) {
  this.width = 1;
  this.height = 4;
  this.visible = true;

  this.x = startx;
  this.y = starty;
}

function Sprite(startx, starty) {

  this.image = new Image();
  this.image.src = "images/sprite.png";
  this.width = 22;
  this.height = 16;
  this.visible = true;
  
  this.x = startx;
  this.y = starty;
  
  this.moveto = function(posx, posy) {
    if ((posx > 0) && (posx < gameboard.width)) {
      this.x = posx;
      this.y = posy;
    }
  }

  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
  }

  this.moveleft = function(num) {
    this.moveto(this.x - num, this.y);
  }

  this.moveright = function(num) {
    this.moveto(this.x + num, this.y);
  }

  this.movedown = function(num) {
    this.moveto(this.x, this.y + num);
  }

  this.dance = function() {
    if (monsterAction == "left" && this.x <= 10) {
      monsterAction = "right";
    } 
    else if (monsterAction == "right" && this.x >= gameboard.width - 26) {
      monsterAction = "left";
      this.moveright(5);
      return monsterAction;
    }
    if (monsterAction == "left"){
      this.moveleft(5);
    }
    else if (monsterAction == "right") {
      this.moveright(5);
    }
    return monsterAction;
  }

}