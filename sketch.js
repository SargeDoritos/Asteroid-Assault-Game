let myXPos = 250;
let myYPos = 400;
let enemyXPos;
let enemyYPos;
let lives = 3

let ship_image;
let space_image;

let myLeft, myRight, myTop, myBottom;
let enemyLeft, enemyRight, enemyTop, enemyBottom;

ballArray = []

function preload() {
     space_image = loadImage("images/space.png")
     ship_image = loadImage("images/ship1.png")
}

function setup() {
   createCanvas(500, 500);
   noStroke();

   for (let i = 0; i < 14; i++) {
       let random_diamter = random(25, 51)
       let temp = new Ball(random(0, 500), 0, 220, 220, 220, random_diamter, random_diamter, random(2, 5));
       ballArray.push(temp);
   }

   rectMode(CENTER);
}
//creates an asteroid with appropiate features
class Ball {
    constructor(enemyX, enemyY, r, g, b, length, width, speed) {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.enemyLeft = this.enemyX - length;
        this.enemyRight = this.enemyX + length;
        this.enemyTop = this.enemyY - length;
        this.enemyBottom = this.enemyY + length;
        this.redValue = r;
        this.greenValue = g;
        this.blueValue = b;
        this.length = length;
        this.width = width;
        this.speedValue = speed;
    }
 }

function draw() {
   image(space_image, 0, 0);
    
   myLeft = myXPos;
   myRight = myXPos;
   myTop = myYPos;
   myBottom = myYPos;
    
   for (let i = 0; i < ballArray.length; i++) {
    //The for loop sets boundaries for every new object spawned
    fill(ballArray[i].redValue, ballArray[i].greenValue, ballArray[i].blueValue);
    ellipse(ballArray[i].enemyX, ballArray[i].enemyY, ballArray[i].length, ballArray[i].width);
        ballArray[i].enemyLeft = ballArray[i].enemyX - ballArray[i].length;
        ballArray[i].enemyRight = ballArray[i].enemyX + ballArray[i].length;
        ballArray[i].enemyTop = ballArray[i].enemyY - ballArray[i].length;
        ballArray[i].enemyBottom = ballArray[i].enemyY + ballArray[i].length;
    //checkCollision function is called in order to check collision for every object spawned
    checkCollision(ballArray[i].enemyBottom, ballArray[i].enemyLeft, ballArray[i].enemyTop, ballArray[i].enemyRight)

    ballArray[i].enemyY += ballArray[i].speedValue;

    //if statement creates a random x position for every new object spawned
    if (ballArray[i].enemyY > 525) {
        ballArray[i].enemyY = -25;
        ballArray[i].enemyX = random(0,500);
    }
   }
    fill(255, 255, 255);
    textSize(22);
    text("Lives: " + lives, 20, 35);

   fill(255, 0, 0);
   image(ship_image, myXPos, myYPos, 40, 40);
   //code that moves the ship accordingly to arrow keys
   if (keyIsDown(LEFT_ARROW)) {
       myXPos -= 3;
   }


   if (keyIsDown(RIGHT_ARROW)) {
       myXPos += 3;
   }


   if (keyIsDown(UP_ARROW)) {
       myYPos -= 3;
   }


   if (keyIsDown(DOWN_ARROW)) {
       myYPos += 3;
   }

}
//The check collision function is used to see if the user colllides with an object
function checkCollision(enemyBottom, enemyLeft, enemyTop, enemyRight) {

    if (myLeft > enemyRight  || myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop) { 
   }
   else {
        lives--;
   }
}