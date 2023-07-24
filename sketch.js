let myXPos = 250;
let myYPos = 400;
let enemyXPos;
let enemyYPos;
let lives = 3;
let score = 0;

let ship_image;
let space_image;

ballArray = []

function preload() {
     space_image = loadImage("images/space.png");
     ship_image = loadImage("images/ship1.png");
     asteroid_hit = loadSound("sounds/asteroid_hit.m4a");
     game_over = loadSound("sounds/game_over_sound.wav");
     ship_hit = loadSound("sounds/ship_hit.m4a");
     shoot_sound = loadSound("sounds/shoot_sound.m4a");
     win_sound = loadSound("sounds/win_sound.wav");
     gameplay_music = loadSound("sounds/gameplay_music.m4a");
     start_end_music = loadSound("sounds/start_end_music");

     
}

function setup() {
   createCanvas(500, 500);
   noStroke();

   for (let i = 0; i < 30; i++) {
       let temp = new Ball(random(0, 500), random(-500, -20), random(10, 255), random(25, 51), random(2, 5));
       ballArray.push(temp);
   }

   imageMode(CENTER);
}
//creates an asteroid with appropiate features
class Ball {
    constructor(enemyX, enemyY, color, size, speed) {
        this.enemyX = enemyX;
        this.enemyY = enemyY;
        this.colorValue = color;
        this.sizeValue = size;
        this.speedValue = speed;
    }
 }

function draw() {
   image(space_image, 250, 250);
    
   for (let i = 0; i < ballArray.length; i++) {
    //The for loop sets boundaries for every new object spawned
    fill(ballArray[i].colorValue, ballArray[i].colorValue, ballArray[i].colorValue);
    ellipse(ballArray[i].enemyX, ballArray[i].enemyY, ballArray[i].sizeValue, ballArray[i].sizeValue);

    ballArray[i].enemyY += ballArray[i].speedValue;

    //if statement creates a random x position for every new object spawned 
    if (ballArray[i].enemyY > 525) {
        ballArray[i].enemyY = -25;
        ballArray[i].enemyX = random(0,500);
        score++
    }
   }

   // makes sure the player can't hide outside of the canvas
   if (myXPos > 520) {
    myXPos = -15;
   }

   if (myXPos < -20) {
    myXPos = 515;
   }

   if (myYPos > 520) {
    myYPos = -15;
   }

   if (myYPos < -20) {
    myYPos = 515;
   }

   //positions of text
    fill(255, 255, 255);
    textSize(22);
    text("Lives: " + lives, 20, 35);
    text("Score: " + score, 19, 60);


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

   //checks for collision since dist() checks the distance between one point and another point. 
   //if the distance from center of the ship and the center of any asteroid is less than the radius of the asteroid, it automatically destroys the asteroid and takes away a life  
   //(Therefore, I'm smarter than AKM's friend cuz I did the oop project extra credit >:D -Rahimin)
   //make sure to delete most of this explanation since I only wrote this to brag
   for (let i = 0; i < ballArray.length; i++) {
        if(dist(myXPos, myYPos, ballArray[i].enemyX, ballArray[i].enemyY) < ballArray[i].sizeValue / 2) {
            ballArray.splice(i, 1);
            lives--;
            ship_hit.play();
        }
    }
}
