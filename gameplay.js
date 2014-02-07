var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

var spriteArray = new Array();
var ship = new Ship(250, 450);

//Control setting
var control = new Keycontrol();

document.onkeydown = function(e) {
  control.keydown(e);
}
document.onkeyup = function(e) {
  control.keyup(e);
}

//Collision setting
var collision = new Collision();

function detectcollision() {
  if (shipBulletAlive && collision.encounter(shipBullet, monsterBullet)) {
    shipBulletAlive = false;
    monsterBulletAlive = false;
    return;
  }
  for (i in spriteArray) {
    if (shipBulletAlive && collision.encounter(shipBullet, spriteArray[i])) {
      shipBulletAlive = false;
      spriteArray.splice(i,1);
      //spriteArray[i].visible=false;
      console.log("Removing");
      break;
    }
  }
}

//Update position of monsters
function refreshSprites() {
  for (var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].dance();
    spriteArray[i].draw();
  }
}

function refreshShip(){
  ship.move();
}

// Draw black window
function drawWindow() {
  context.fillStyle = '#000';
  context.clearRect(0, 0, gameboard.width, gameboard.height);
  context.beginPath();
  context.rect(0, 0, gameboard.width, gameboard.height);
  context.closePath();
  context.fill();
}

// To create the sprites for first time when level begins
function createSprites(rows, cols){
  var initx = 50;
  var inity = 50;
  for (var y = 1; y <= rows; y++) {
    for (var x = 1; x <= cols; x++) {
      var posx = initx + (x * 40);
      var posy = inity + (y * 40);
      spriteArray.push(new Sprite(posx, posy));
    }
  }
}

function drawSprites(){
  for( var i=0; i < spriteArray.length; i++){
    spriteArray[i].draw();
  }
}

var shipBullet;

function refreshShipBullet(){
  if(shipFire && !shipBulletAlive){
    shipBullet = new Bullet(ship.x + 13, ship.y, -7, 60, gameboard.height, 'white');
    shipBullet.create();
    shipBulletAlive = true;
  }
  else if(shipBulletAlive){
    shipBullet.update();
  }
  else if (!shipBulletAlive){
    shipBullet = "";
  }
}

var monsterBullet;

function refreshMonsterBullet(){
  if(!monsterBulletAlive){
    var randomInt;
    //do {
    randomInt = Math.floor(Math.random() * spriteArray.length);
    //} while (spriteArray[randomInt].visible == false);
    var monster = spriteArray[randomInt];
    monsterBullet = new Bullet(monster.x, monster.y, 4, 60, gameboard.height,'red');
    monsterBulletAlive = true;
  }
  else {
    monsterBullet.update();
  }
}

function refreshGame() {
  drawWindow();
  refreshShip();
  refreshShipBullet();
  refreshMonsterBullet();
  refreshSprites();
  detectcollision();
  ship.draw
}

function startGame(){
  createSprites(6,6);
  drawSprites();
  // createShip();
  score = 0;
}


startGame();
var timer = setInterval(refreshGame, 20);

/*
window.addEventListener('keydown', function(e){
  switch (e.keyCode){
        case 32: { 
          shipFire = true; 
        } break;
        case 37: { 
          shipLeft = true; 
        } break;
        case 39: { 
          shipRight = true; 
        } break;
  }
}, true);

window.addEventListener('keyup', function(e){
  switch (e.keyCode){
    case 32: { shipFire = false; } break;
    case 37: { shipLeft = false; } break;
    case 39: { shipRight = false; } break;
  }
}, true);
*/



