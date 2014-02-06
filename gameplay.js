var gameboard = document.getElementById("board");
var context = gameboard.getContext("2d");

var spriteArray = new Array();
var ship = new Ship(250, 450);

var control = new Keycontrol();

document.onkeydown = function(e) {
  control.keydown(e);
}
document.onkeyup = function(e) {
  control.keyup(e);
}

//Update position of monsters
function refreshSprites() {
  for (var i = 0; i < spriteArray.length; i++) {
    if (spriteArray[i].visible){
      spriteArray[i].dance();
      spriteArray[i].draw();
    }
  }
}

function refreshShip(){
  if (ship.action == "left") {
    ship.moveleft(20);
  } else if (ship.action == "right") {
    ship.moveright(20);
  }
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

// function createShip(){
//   ship = new Ship(gameboard.width/2, gameboard.height-50);
//   ship.draw();
// }

function drawSprites(){
  for( var i=0; i < spriteArray.length; i++){
    spriteArray[i].draw();
  }
}

function refreshGame() {
  drawWindow();
  //refreshShip();
  refreshSprites();
  ship.draw();
  refreshShip()
}

function startGame(){
  createSprites(6,6);
  drawSprites();
  // createShip();
  score = 0;
}

startGame();
var timer = setInterval(refreshGame, 60/(level*0.5));


