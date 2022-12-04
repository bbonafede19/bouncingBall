/*
 * This program sketch is copied from Even Peck's example at
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Xiannong Meng
 * 2022-06-25
 *
 * Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 */

/*
Modification 1: Everytime a ball hits the "HITBOX!" the ball is removed.
Modification 2: When mouse is clicked, program is removed and ended.
Modification 3: When one ball is left, that is the winning ball!
*/

const BOX_WIDTH  = 150;  // textbox dimensions
const BOX_HEIGHT = 150;

var balls = [];
var sound;
let ball_count = 0;

function preload() {

  //sound = loadSound("apollo11.mp3");  // preload the sound file
}

function setup() {

//  createCanvas(windowWidth, windowHeight);
  createCanvas(600,400)

  
  noStroke();
  
  //sound.play();    // play the audio file once
  //sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 5; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(4);
  fill("Black");
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT);
  
  textSize(10);           // size of the text (pixels)
  fill("White");      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('HITBOX!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function createBox2() {
  // prepare a box first
  strokeWeight(4);
  fill("Black");
  rect(0, 0, 600,400);
  
  textSize(50);           // size of the text (pixels)
  fill("White");      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('WINNER!', 300,200);   
 
}

function mousePressed() {
  remove(); // remove whole sketch on mouse press
}
function draw() {

  background(255);
  createBox();
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    if (balls[ballNum].checkForHitBox() == true){
      balls[ballNum].remove1();
      ball_count += 1;
}
    balls[ballNum].moveBall();
  }
  
  if (ball_count == balls.length - 1){
    createBox2();
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    this.alpha = 100
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      return true;
      //this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
  remove1(){
    this.size = 0;
    this.speedY = 0;
    this.speedX = 0;
  }
  
}