var PLAY=1;
var END=0;
var playState=PLAY;
var c1="dino +";
var c2="amigo de dino";
var c3=" ";
var c4="se quieren";
var dino;
var ground;
var ginvisible;
var cloud;
var cactu;
var score=0;
var cactusGroup;
var cloudsGroup;
var GameOver;
var Restart;
var songj;
var songc;
var songe;

function preload(){
  
  dino1 =loadAnimation("trex1.png","trex3.png","trex4.png");
  dinom = loadAnimation("trex_collided.png");
  ground1 = loadImage("ground2.png");
  cloud1 = loadImage("cloud.png");
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  over = loadImage("gameOver.png");
  restart1 = loadImage("restart.png");
  songj = loadSound ("jump.mp3");
  songc = loadSound ("die.mp3");
  songe = loadSound ("checkPoint.mp3");
}

function setup() {
  
  createCanvas(600, 200);
  edges=createEdgeSprites();
  
  //var prueba = "hola:)";
  //console.log(prueba);
  
  dino = createSprite(50,160,10,10);
  dino.addAnimation("run",dino1);
  dino.scale=0.7
  dino.addAnimation("m",dinom);
  
  ground = createSprite(200,180,400,10);
  ground.x=ground.width/2;
  ground.addImage("ground",ground1);
  
  ginvisible = createSprite(200,190,400,10);
  ginvisible.visible=false;
  
  var azar = Math.round(random(1,100));
  console.log(azar);
  console.log("Hola"+" "+"mundo");
  console.log(c1+c3+c2+c3+c4);
  
  cactusGroup = new Group();
  cloudsGroup = new Group();
  
  dino.debug=true;
  //dino.setCollider("circle",-10,-10,38);
  dino.setCollider("rectangle",-10,-10,300,dino.height);
  
  GameOver = createSprite(300,100,10,10);
  GameOver.addImage(over);
  
  Restart = createSprite(300,140,10,10);
  Restart.addImage(restart1);
  Restart.scale=0.5;
}

function draw() {
  
  background("white");
  drawSprites();
  //console.log(dino.y);
  
 
  var prueba = "hola:)";
  console.log(prueba);
  
  text(score,300,50);
  
  dino.collide([ginvisible]);
  
  
  if(playState===PLAY){
    
    clouds();
    cactus();
    
    score=score+Math.round(getFrameRate()/60);
    
    
    
    ground.velocityX=-(4+5*score/100);
    
    dino.velocityY=dino.velocityY+0.5;
    
    if (keyDown("space")&&dino.y>=152){
    dino.velocityY=-10;
    songj.play();
    }
    
    if (ground.x<0){
    ground.x=ground.width/2;
    }
    
    if(cactusGroup.isTouching(dino)){
     // playState=END;
    //songc.play();
      dino.velocityY=-10;
      songj.play();
      
    }
    
    GameOver.visible=false;
    Restart.visible=false;
    
    if(score>0&&score%100===0){
      songe.play();
    }
  }
  
  else if(playState===END){
     
    ground.velocityX=0;
    cactusGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    dino.velocityY=0;
    dino.changeAnimation("m",dinom);
    cactusGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    GameOver.visible=true;
    Restart.visible=true;
    
    if(mousePressedOver(Restart)){
     console.log("presionado");
     
     reset();
   }
  }
}

function clouds(){
  
  if (frameCount%60===0){
  cloud = createSprite(600,random(20,100),10,10); 
  cloud.addImage("nube",cloud1);
  cloud.velocityX=-3;
  cloud.depth=dino.depth;
    
  dino.depth=dino.depth+1;
    
  cloud.lifetime=220;
    
  cloudsGroup.add(cloud);
 }
}

function cactus(){
  
  if (frameCount%70===0){
  cactu = createSprite(600,165,10,10);
  cactu.velocityX=-(3+5*score/100);
  var azar = Math.round(random(1,6));
  switch(azar){
    case 1:cactu.addImage(cactus1);
    break;
    case 2:cactu.addImage(cactus2);
    break;
    case 3:cactu.addImage(cactus3); 
    break;
    case 4:cactu.addImage(cactus4);
    break;
    case 5:cactu.addImage(cactus5);
    break;
    case 6:cactu.addImage(cactus6);
    break;
    default:break;
  }
  
  cactu.scale = 0.5;
  cactu.depth=dino.depth;
  dino.depth=dino.depth+1;
  cactu.lifetime=220;
    
  cactusGroup.add(cactu);
 }
}

function reset(){
  
  playState=PLAY;
  GameOver.visible=false;
  Restart.visible=false;
  
  cactusGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  dino.changeAnimation("run",dino1);
  
  score=0;
}