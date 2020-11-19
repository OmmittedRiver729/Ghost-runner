var tower, towerImg;
var doors, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisBlock, invisGroup;
var gameState = "Play";
 
function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("towerImg", towerImg);
  tower.velocityY = 3;
  doorGroup = new Group();
  climberGroup = new Group();
  invisGroup = new Group();
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghostImg", ghostImg);
  ghost.scale = 0.4;
}

function draw() {
  background("white");
  if( gameState === "Play") {
  
  if (tower.y > 400) {
    tower.y = 300;
  }

  if (keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }

  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }

  if (keyDown("space")) {
    ghost.velocityY = -5;
  }

  ghost.velocityY = ghost.velocityY + 0.8;
  if (climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  if(invisGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "End";
  }
  spawnDoors();
  drawSprites();
  }
  if(gameState === "End") {
    background("black");
    textSize(30);
    fill("yellow");
    text("Game Over, get good.", 160, 250);
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    doors = createSprite(200, -50);
    doors.addImage("doorImg", doorImg);
    climber = createSprite(200, 10);
    climber.addImage("climberImg", climberImg);
    invisBlock = createSprite(200, 15);
    invisBlock.width = climber.width;
    invisBlock.height = 2;
    doors.x = Math.round(random(120, 400));
    climber.x = doors.x;
    doors.velocityY = 3;
    climber.velocityY = 3;
    invisBlock.x = doors.x;
    invisBlock.velocityY = 3;
    ghost.depth = doors.depth;
    ghost.depth = ghost.depth + 1;
    doors.lifetime = 800;
    climber.lifetime = 800;
    doorGroup.add(doors);
    climberGroup.add(climber);
    invisBlock.debug = true;
    invisGroup.add(invisBlock);
  }
}