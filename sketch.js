var START=-1
var PLAY = 1;
var END = 0;
var gameState = START;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var npc

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var GameOver,Restart;
var GameOverimage,Restartimage;

function preload(){
  npc = loadImage("NPC.png")
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  birdImg = loadImage("bird.png")

GameOverimage = loadImage("gameOver.png")
Restartimage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);

  npcharacter = createSprite(200,100,20,50)
  npcharacter.addImage("character",npc)
  npcharacter.scale = 0.5

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  GameOver = createSprite(300,100,50,50);
  Restart = createSprite(300,150,50,100);
  GameOver.addImage(GameOverimage);
  Restart.addImage(Restartimage);
  GameOver.visible = false;
  Restart.visible = false;
  GameOver.scale = 0.5;
  Restart.scale = 0.5;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  birdsGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  text("Score: "+ score, 500,40);
  text("Press SPACE to begin and Up arrow to jump", 350,20);

  if (keyDown("space") && gameState==START) {
    gameState=PLAY
  }
  
  if(gameState == PLAY){

    npcharacter.remove();
  
    if(keyDown(UP_ARROW) && trex.y >= 139.5) {
    trex.velocityY = -13;
  }
 
  score = score + Math.round(getFrameRate()/60);
  
    trex.velocityY = trex.velocityY + 0.8
    
  spawnClouds();
  spawnObstacles();
  spawnBirds()

  if(obstaclesGroup.isTouching(trex) || birdsGroup.isTouching(trex)){
  gameState = END;
  }
    
  }else if (gameState == END){
  GameOver.visible = true;
  Restart.visible = true;
    
  ground.velocityX = 0; 
    
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  birdsGroup.setVelocityXEach(0);

  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  birdsGroup.setLifetimeEach(-1);
    
  trex.changeAnimation("collided",trex_collided);
  
  trex.velocityY = 0;
    
  if(mousePressedOver(Restart)){
  reset();
  }
 }
  
  trex.collide(invisibleGround);

  if (trex.velocityx>0) {
    camera.x=trex.x
  }
  
 drawSprites();
  
}

function reset(){
  gameState = PLAY;
  
  GameOver.visible = false;
  Restart.visible = false;

  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();

  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -8;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBirds() {
  if(frameCount % 190 === 0) {
    var rand = Math.round(random(180,0));    
    var bird = createSprite(600,rand,10,40);
    bird.velocityX = -8;

    bird.addImage(birdImg)
       
    //assign scale and lifetime to the obstacle           
    bird.scale = 0.25;
    bird.lifetime = 300;
    //add each obstacle to the group
    birdsGroup.add(bird);
  }
}