var engine,world;
var bird,ground,pipe1,pipe2;
var birdImage,birdUpImage,pipe1Image,pipe2Image,backgroundImage;
var backGround;
var gamestate="start"
var bottom,top;
var groupPipe

function preload(){
 birdImage=loadImage("flappyBird.png")
 birdUpImage=loadImage("flappyBirdUp.jpg")
 pipe1Image=loadImage("pipe.png")
 pipe2Image=loadImage("pipeDown.png")
 backgroundImage=loadImage("background.png")
}

function setup(){
 createCanvas(1000,800)
 backGround=createSprite(500,250,1000,800)
 backGround.addImage(backgroundImage)
 backGround.velocityX=-10
 bird=createSprite(500,500,20,40)
 bird.addImage(birdImage)
 bird.scale=0.4
 bottom=createSprite(500,800,1000,10)
 bottom.visible=false
 top=createSprite(500,0,1000,10)
 top.visible=false
 groupPipe=new Group()
}

function draw(){
  if(backGround.x<0){
  backGround.x=500
 }  

 if(gamestate=="start"&&keyDown("space")){
  gamestate="play"
 }

 if(gamestate=="play"){
  spawnPipe()
  bird.velocityY=bird.velocityY+0.8
  if(keyWentDown("space")){
   bird.velocityY=-15
   bird.addImage(birdUpImage)
   bird.scale=0.25
  } 
  if(keyWentUp("space")){
   bird.velocityY=0
   bird.addImage(birdImage)
   bird.scale=0.4
  }
}
 
  if(bird.isTouching(groupPipe)||bird.isTouching(top)||bird.isTouching(bottom)){
   gamestate="retry"
  }  

 drawSprites()
 
 if(gamestate=="start"){
  textSize(18)
  textFont("Calibri")
  fill("black")
  text("Press space to start",400,200) 
 } 
 
 if(gamestate=="retry"){
   text("Press 'R' to retry",500,400)
  if(keyDown("R")){
   gamestate="start"
  }
 }

}

function spawnPipe(){
 var rando=Math.round(random(1,2))
 if(frameCount%20==0){
  if(rando==1){
   pipe1=createSprite(1100,0,50,random(250,700)) 
   pipe1.velocityX=-20
   pipe1.shapeColor="green"
   groupPipe.add(pipe1)
  } 
  else if(rando==2){
   pipe2=createSprite(1100,800,50,random(250,700))
   pipe2.velocityX=-20
   pipe2.shapeColor="green"
   groupPipe.add(pipe2)
  }  
 }   
}