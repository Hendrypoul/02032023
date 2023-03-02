const startContainer = document.querySelector('.start');
const gameContainer = document.querySelector('.game');
const scoreContainer = document.querySelector('.score');
const scoreId = document.querySelector("#score-id");
let score = 0;
let previsousRenderedTime = 0;
let carPosition = {
    x:0,
    y:0
};
let player = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};
function moveLine() {
    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        var top = line.offsetTop;
        const gameContainerDetails = gameContainer.getBoundingClientRect();
        if(line.offsetTop > gameContainerDetails.bottom) {
            top = 0;
        }
        line.style.top = top + 10 + 'px';
        top += 150;
    });
}
function renderGame(milliseconds) {
    const car = document.querySelector('.car');
    const gameContainerDetails = gameContainer.getBoundingClientRect();
    console.log("Game container", gameContainerDetails.right, carPosition.x);
    // console.log(milliseconds);
    // window.requestAnimationFrame(playGame);
    if(player.ArrowUp && carPosition.y > gameContainerDetails.top) {
        carPosition.y -= carPosition.speed;
    }
    if(player.ArrowDown && carPosition.y < gameContainerDetails.bottom - 500) {
        carPosition.y += carPosition.speed;
    }
    if(player.ArrowRight && carPosition.x < gameContainerDetails.right - 120) {
        carPosition.x += carPosition.speed;
    }
    if(player.ArrowLeft && carPosition.x > 0) {
        carPosition.x -= carPosition.speed;
    }
    score++;
    scoreId.textcontent = score;
    car.style.top = carPosition.y + 'px';
    car.style.left = carPosition.x + 'Px';
    window.requestAnimationFrame(renderGame);
}
function startGame() {
    startContainer.classList.add('hide');
    const car = document.createElement('div');
    car.setAttribute('class', 'car');
    const carTop = car.offsetTop;
    const carLeft = car.offsetLeft;
    carPosition.y = carTop;
    carPosition.x = carLeft;
    gameContainer.appendChild(car);
    var x = 0;
    for(var i = 0; i<4; i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = x + 'px';
        gameContainer.appendChild(line);
        x += 150;
    }
}
const enemy = document.createElement('div');
enemy.classList.add('enemy');
enemy.top = Math.floor((Math.random() * 400)) + 'px';
enemy.left = Math.floor((Math.random() * 450)) + 'px';
// window.requestAnimationFrame(renderGame);
function handleKeyUp(e) {
    e.preventDefault();
    player[e.key] = true;
}
function handleKeyDown(e) {
    e.preventDefault();
    console.log(e.key);
    player[e.key] = false;
}

document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keydown', handleKeyDown);
startContainer.addEventListener('click', startGame);