const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

// console.log(gameArea);

startScreen.addEventListener('click', start);

let player = { speed: 5, score:0 };

let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
    //  console.log(e.key);
    console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
    // console.log(e.key); 
}

function isCollide(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (
        aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines(){
    let lines = document.querySelectorAll('.lines'); //acces lines div

    lines.forEach(function(item){ //forEach method show our value one by one
        
        if(item.y >= 700){
            item.y -= 750; 
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + "<br> Press hear to restart the game."
}

function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy'); //acces lines div

    enemy.forEach(function(item){ //forEach method show our value one by one

        if(isCollide(car, item)){
            console.log("Boom Hit");
            endGame();//calling function for stope the game when colide happens
        }
        
        if(item.y >= 750){
            item.y = -300; 
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gamePlay() {
    // console.log("hey i am clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();// this method is for finding position of the road(gameArea) on the screen
    // console.log(road);
    if (player.start) {// run for true

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 120)) { player.y -= player.speed } // keep car 120px down from top
        if (keys.ArrowDown && player.y < (road.bottom - 80)) { player.y += player.speed } //stop car to going down out of screen
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }// work left key & car do not cross the left end of road
        if (keys.ArrowRight && player.x < (road.width - 64)) { player.x += player.speed } //"player.x < (road.width-50)" stopes the car to cross the right end of the road

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        window.requestAnimationFrame(gamePlay); //for continuation animation.(self colling of method is going hear)
        console.log(player.score++);

        player.score++;
        let ps = player.score -2;
        score.innerText = "score: " + ps;
    }

}

function start() {
    // gameArea.classList.remove('hide'); //remove the start screen 
    startScreen.classList.add('hide'); //it add new screen(game are seen)
    gameArea.innerHTML = "";

    player.start = true; //when user clicked on startScreen then game is start i.e true
    player.score = 0;
    window.requestAnimationFrame(gamePlay); // use this method for animation.

    for (x = 0; x<5; x++) { //loop is for making lines
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    // car.innerText = "hey i am your car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top position" + car.offsetTop);
    // console.log("left position" + car.offsetLeft);

    for (x = 0; x<3; x++) { //loop is for making car
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x+1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2)
    }
    return "#"+c()+c()+c();
}
