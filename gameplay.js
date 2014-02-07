var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

var score;

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
      score += 1;
      //spriteArray[i].visible=false;
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
  context.font = "15pt Calibri"
  context.fillStyle = "#7FFF00"
  context.clearRect(0, 0, gameboard.width, 20);
  context.beginPath();
  context.rect(0, 0, gameboard.width, 20);
  context.closePath();
  context.fillText("Score: " + score, 10, 20);

  context.fillStyle = "black";
  context.clearRect(0, 20, gameboard.width, gameboard.height - 20);
  context.beginPath();
  context.rect(0, 20, gameboard.width, gameboard.height - 20);
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
    if (spriteArray.length != 0) {
      var monster = spriteArray[randomInt];
      monsterBullet = new Bullet(monster.x, monster.y, 4, 60, gameboard.height,'red');
      monsterBulletAlive = true;
    }
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
  ship.draw();

  if (spriteArray.length == 0) {
    context.fillStyle = "black";
    context.clearRect(0, 0, gameboard.width, gameboard.height);
    context.beginPath();
    context.rect(0, 0, gameboard.width, gameboard.height);
    context.closePath();
    context.fill();

    context.font = "40pt Calibri"
    context.textAlign = "center"
    context.fillStyle = "white"
    context.fillText("GAME OVER!", gameboard.width/2, gameboard.height/2);

    context.font = "30pt Calibri"
    context.textAlign = "center"
    context.fillStyle = "white"
    context.fillText("Score: " + score, gameboard.width/2, gameboard.height/2 + 40);
  }
}

function startGame(){
  createSprites(1,1);
  drawSprites();
  // createShip();
  score = 0;
}


startGame();
var timer = setInterval(refreshGame, 20);



