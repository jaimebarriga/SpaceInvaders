var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

var monsterAction = "left";
var shipLeft = false;
var shipRight = false;
var shipFire = false;
var shipBulletAlive = false;
var monsterBulletAlive = false;
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
    if(shipLeft){
      this.moveleft(5);
      this.draw();
    }
    else if(shipRight){
      this.moveright(5);
      this.draw();
    }
    else {
      this.draw();
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

function Bullet(startx, starty, speedY, minY, maxY, color) {
  this.width = 2;
  this.height = 8;
  this.speedY = speedY;
  this.minY = minY;
  this.maxY = maxY;
  this.visible = true;

  this.x = startx;
  this.y = starty;

  this.create = function(){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = color;
    context.fill();
  }

  this.update = function(){
    if(this.y >= this.minY && this.y <= this.maxY){
      this.y = this.y + this.speedY;
      context.beginPath();
      context.rect(this.x, this.y, this.width, this.height);
      context.fillStyle = color;
      context.fill();
    }
    else if (this.y > this.maxY) {
      console.log("monster bullet is dead");
      monsterBulletAlive = false;

    }
    else if (this.y < this.minY) {
      shipBulletAlive = false;
    }
  }
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
      this.moveright(1);
      return monsterAction;
    }
    if (monsterAction == "left"){
      this.moveleft(1);
    }
    else if (monsterAction == "right") {
      this.moveright(1);
    }
    return monsterAction;
  }

}