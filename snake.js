/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = createFood();

function createFood() {
	return {
		x : Math.floor(Math.random()*17+1) * box,
		y : Math.floor(Math.random()*15+3) * box
	};
}

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
	if(!keyPressed) {
		let key = event.keyCode;
		if( key == 37 && d != "RIGHT"){
			left.play();
			d = "LEFT";
		}else if(key == 38 && d != "DOWN"){
			d = "UP";
			up.play();
		}else if(key == 39 && d != "LEFT"){
			d = "RIGHT";
			right.play();
		}else if(key == 40 && d != "UP"){
			d = "DOWN";
			down.play();
		}
	}
	keyPressed = true;
}
// cheack collision function
function collision(head,array){
	if ( array.length === 1 ) { return false; }
	for(let i = 1; array.length > i; i++) {
		if( array[i].x === head.x && array[i].y === head.y) {
			console.log(snake);
			return true;
		}
	}
	return false;
}

// draw everything to the canvas
let lastTail;
let keyPressed = false;

function draw(){
	
	//Drawing map, food, and snake
	ctx.drawImage(ground,1,1);
	ctx.font = "30px Arial";
	ctx.fillStyle = "#ff9933";
	ctx.fillText(score,558,45);
    ctx.drawImage(foodImg,food.x,food.y);
	for(let i = 0;snake.length > i;i++) {
		ctx.fillStyle = (i === 0) ?  "#ff9933" : "#ffff00"
		ctx.fillRect(snake[i].x,snake[i].y,box,box);
	}

	//Redefine snake postionons
	lastTail = snake[snake.length -1];
	let pos = snake[0];
	if( d === 'UP' ) {
		snake.unshift({ x : pos.x, y : pos.y - 32});
		snake.pop();
	} else if( d === 'RIGHT' ) {
		snake.unshift({ x : pos.x + 32, y : pos.y});
		snake.pop();
	} else if( d === 'DOWN' ) {
		snake.unshift({ x : pos.x, y : pos.y + 32});
		snake.pop();
	} else if( d === 'LEFT' ) {
		snake.unshift({ x : pos.x - 32, y : pos.y});
		snake.pop();
	}
		
    // Check if the fruit is eaten
	pos = snake[0];
	if(pos.x === food.x && pos.y === food.y) {
		let lastPos = snake[snake.length - 1];
		snake.push(lastTail);
		eat.play();
		food = createFood();
		score += 1;
	}	
    
	 // Check if game is over
    if (collision(pos,snake) || pos.x > 17 * box || pos.x < box || pos.y > 17 * box || pos.y < 3 * box) {
		dead.play();
		clearInterval(game);
	}
	
	keyPressed = false;
}

// call draw function every 100 ms
let game = setInterval(draw,100);


















