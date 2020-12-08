
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0, survivalTime=0;
var edges;
var ground; 
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
    createCanvas(600,200);
    monkey = createSprite(50,160,20,50);
    monkey.addAnimation("running", monkey_running);
    monkey.scale = 0.1;
    //monkey.debug =true;
  
    edges = createEdgeSprites();
  
    ground =createSprite(300,195,1200,10);
    ground.shapeColor = "brown";
    ground.x = ground.width/2;
    ground.velocityX  = -6;
  
    obstacleGroup = new Group();
    bananaGroup = new Group();
  
    
}


function draw() {
  background("green");
  console.log(monkey.y);
  
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 50,20 );
  
  score = score + Math.round(frameCount/200);
  text("Score: "+score, 400,20);
  if(ground.x <0){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && monkey.y >=158){
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY +0.5;
 // monkey.collide(edges[3]);
  monkey.collide(ground);
  createObstacles();
  createFruits();
  
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        bananaGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        bananaGroup.setLifetimeEach(-1);
    
    
    }
  
  drawSprites();
}

function createObstacles(){
  if(frameCount %300 === 0){
    obstacle = createSprite(600,165,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
  }
}

function createFruits(){
  if(frameCount%80 === 0){
    banana = createSprite(600,Math.round(random(80,100)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 300;
    banana.velocityX =-6;
    bananaGroup.add(banana);
  }
}




