let myXPos = 250;
let myYPos = 400;
let enemyXPos;
let enemyYPos;
let lives = 3;
let score = 0;
let gameEnded = false;
let gameStarted = false;

let ship_image;
let space_image;

ballArray = [];

function preload() {
    space_image = loadImage("images/space.png");
    ship_image = loadImage("images/ship1.png");
    asteroid_hit = loadSound("sounds/asteroid_hit.m4a");
    game_over = loadSound("sounds/game_over.m4a");
    ship_hit = loadSound("sounds/ship_hit.m4a");
    shoot_sound = loadSound("sounds/shoot_sound.m4a");
    victory_sound = loadSound("sounds/victory.m4a");
    victory2_sound = loadSound("sounds/victory2.m4a");
}

function setup() {
    createCanvas(500, 500);
    noStroke();

    for (let i = 0; i < 17; i++) {
        let temp = new Ball(random(0, 500), random(-50, -20), random(10, 255), random(25, 51), random(2, 5));
        ballArray.push(temp);
    }

    imageMode(CENTER);
}

// creates an asteroid with appropriate features
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
    if (!gameStarted) {
        beginGame();
    } else if (!gameEnded) {
        gameLoop();
    } else {
        endGame();
    }
}

function beginGame() {
    background(0);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("Click to Begin Game", width / 2, height / 2);
}

function mouseClicked() {
    if (!gameStarted) {
        gameStarted = true;
    } else if (gameEnded && mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 + 70 && mouseY < height / 2 + 110) {
        resetGame();
    }
}

function gameLoop() {
    image(space_image, 250, 250);

    myLeft = myXPos;
    myRight = myXPos;
    myTop = myYPos;
    myBottom = myYPos;

    for (let i = 0; i < ballArray.length; i++) {
        fill(ballArray[i].colorValue, ballArray[i].colorValue, ballArray[i].colorValue);
        ellipse(ballArray[i].enemyX, ballArray[i].enemyY, ballArray[i].sizeValue, ballArray[i].sizeValue);

        ballArray[i].enemyY += ballArray[i].speedValue;

        if (ballArray[i].enemyY > 525) {
            ballArray[i].enemyY = -25;
            ballArray[i].enemyX = random(0, 500);
            score++
        }
    }

    fill(255, 255, 255);
    textSize(22);
    text("Lives: " + lives, 20, 35);
    text("Score: " + score, 19, 60);

    fill(255, 0, 0);
    image(ship_image, myXPos, myYPos, 40, 40);

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

    for (let i = 0; i < ballArray.length; i++) {
        if (dist(myXPos, myYPos, ballArray[i].enemyX, ballArray[i].enemyY) < ballArray[i].sizeValue / 2) {
            ballArray.splice(i, 1);
            lives--;
            ship_hit.play();
        }
    }

    if (lives <= 0) {
        gameEnded = true;
    }
}

function endGame() {
    background(0);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Final Score: " + score, width / 2, height / 2 + 40);

    // Draw the "Try Again" button
    fill(255, 0, 0);
    rect(width / 2 - 60, height / 2 + 70, 120, 40);
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Try Again", width / 2, height / 2 + 90);
}

function resetGame() {
    lives = 3;
    score = 0;
    ballArray = [];
    gameEnded = false;
    gameStarted = false;

    for (let i = 0; i < 17; i++) {
        let temp = new Ball(random(0, 500), random(-50, -20), random(10, 255), random(25, 51), random(2, 5));
        ballArray.push(temp);
    }
}
