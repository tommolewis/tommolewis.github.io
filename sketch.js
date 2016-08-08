// Generic vars
var lightsStarted = false;
var signsStarted = false;
var cnv;


// Lights vars
var imgs = [];
var ply_X, ply_Y
var timeWaited = 0;
var timerForLights = 0;
var lightColor = {r:0,g:0,b:0};
var go = false;
var bg

// Sign vars
var dontclick;
var donttype;
var hasClicked = false;
var hasTyped = false;
var typeFinished = false;
var clickFinished = false;


function setup(){
  cnv = createCanvas(window.innerWidth* 0.8, window.innerHeight*0.8);
  centerCanvas();
  background(153);
  cnv.parent('p5canvas');
  
  for(var i = 0; i < 6; i++){
    imgs.push(loadImage("assets/player_" + i + ".png"));
  }

  dontclick = loadImage("assets/dont-click.png");
  donttype = loadImage("assets/dont-type.png");
  bg = loadImage("assets/background.png");

  imageMode(CENTER);

  document.getElementById('p5canvas').style.height = '0%';

}

function reset() {
  ply_X = cnv.width / 10;
  ply_Y = cnv.height /2;
  lightColor = { r: 255, g: 0, b: 0 };
  lightsStarted = false;
  signsStarted = false;
  noFill();
  stroke(0);

  hasTyped = false;
  hasClicked = false;
  typeCountdown = 500;
  clickCountdown = 500;
  typeFinished = false;
  clickFinished = false;
  clickRevealed = false;
  typeRevealed = false;
}

function draw(){
  document.getElementById('p5canvas').style.height = '0%';
  if(lightsStarted === false){
    clear();
    // Lights Setup
    if( document.getElementById('lightsContent').style.display === 'block' ) { 
      imageMode(CORNER);
      image(bg,0,0,width,height);     
      imageMode(CENTER);
      text("Interactive Journey Map",width/2-55,height/2-30)
      text("Click to start",width/2-25,height/2);
      ply_X = width / 10;
      ply_Y = height /2;
      lightColor = { r: 255, g: 0, b: 0 };
    }
    
  }
  if(signsStarted === false){
    if( document.getElementById('signsContent').style.display === 'block' ) {

    image( dontclick, width/3 , height/2  );
    image( donttype, 2*width/3 , height/2  );
    text( "Click to start" , width/2-25, height*0.8)
    }
  }
  if(lightsStarted === false && signsStarted === false){return;}
  clear();

  //Lights content
  if( document.getElementById('lightsContent').style.display === 'block' ) {  
    document.getElementById('p5canvas').style.height = '0%';
      imageMode(CORNER);
      image(bg,0,0,width,height);  
      imageMode(CENTER);


    if(keyIsDown(RIGHT_ARROW)){
      ply_X += 3;
    }else if(keyIsDown(LEFT_ARROW)){
      ply_X -=3;
    }

    drawLights();

    timerForLights += 1;
    if(timerForLights > 250){
      timerForLights = 0;
      randomizeLights();
    }
    index = updateImageIndex();
    image(imgs[index], ply_X, ply_Y,100,100);
  }
  if( document.getElementById('signsContent').style.display === 'block' ) {
    document.getElementById('p5canvas').style.height = '60%';
    if( !clickFinished ) {
      image( dontclick, width/3 , height/2  );
      text( "don't click ", width/3-width*0.02 , height *0.75);
      text( Math.round(clickCountdown/100), width/3 , height*0.8);
      clickCountdown--;
    }
    if( !typeFinished ) {
      image( donttype, 2*width/3 , height/2  );
      text( "don't type ", width*2/3 - width*0.02 , height *0.75);
      text( Math.round(typeCountdown/100), 2*width/3 , height*0.8);
      typeCountdown--;
    }
    if ( typeCountdown <= 0 ) {
      revealType(true);
      typeFinished = true;
    }
    if ( clickCountdown <= 0 ) {
      revealClick(true);
      clickFinished = true;
    }

  }
}

function keyPressed() {
  if ( document.getElementById('signsContent').style.display === 'block' && signsStarted) {
    if(typeCountdown > 0){
      revealType(false);
      typeFinished = true;
    }
  }
}

function mouseClicked() {
  if ( document.getElementById('signsContent').style.display === 'block' && signsStarted) {
    if(clickCountdown > 0 && clickCountdown < 480){
      revealClick(false);
      clickFinished = true;
    }
  }
}

function revealClick( followedInstructions ) {
  clickRevealed = true;
  if( followedInstructions ) {
    document.getElementById('follow1').style.display = 'block';
  } else {
    document.getElementById('ignore1').style.display = 'block';
  }
  if(typeRevealed) {
    document.getElementById('p5canvas').style.height = '0%';
    document.getElementById('p5canvas').style.display = 'none';

  }
}
function revealType( followedInstructions ) {
  typeRevealed = true;
  if( followedInstructions ) {
    document.getElementById('follow2').style.display = 'block';
  } else {
    document.getElementById('ignore2').style.display = 'block';
  }
  if(clickRevealed) {
    document.getElementById('p5canvas').style.height = '0%';
    document.getElementById('p5canvas').style.display = 'none';

  }
}




// Light functions

function updateImageIndex(){
  var index = timeWaited;

  if(index > 4){index = 4;}

  if(ply_X >= width-width/6 || go){
    index = 5;
  }
  return index;
}


function drawLights(){
  fill( lightColor.r, lightColor.g, lightColor.b );
  ellipse(20,20,30,30);
}


function randomizeLights() {
  timeWaited++;
  
  if( !go ) {
    go = random( 0, 100 ) <= 20;
  }
  
  lightColor = { r: 255, g: 0, b: 0 };
  
  if( go ){
    lightColor = { r: 65, g: 242, b: 80 } ;
    timerForLights = -100;
  }
}

// Generic functions

function mousePressed(){
  if( document.getElementById( 'lightsContent' ).style.display === 'block' ) {
    lightsStarted = true;
  }
  if( document.getElementById( 'signsContent' ).style.display === 'block' ) {
    signsStarted = true;
  }
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
}


function windowResized() {
  centerCanvas();
}