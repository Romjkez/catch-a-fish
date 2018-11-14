const preview = document.getElementById('preview'), container = document.getElementById('container');
let gameTimer = 10, pScore = 0;

document.addEventListener('DOMContentLoaded', () => { // init function
    document.querySelectorAll('.vodorosli').forEach((elem) => {
        elem.setAttribute('draggable', 'false')
    });
    document.getElementById('btn').addEventListener('click', closePreview);
    document.addEventListener('keypress', keyPressHandler);
});

function keyPressHandler(e) {
    if (e.key === " " || e.key === 'Enter') { // ability to start the game by pressing "Space" or "Enter"
        closePreview();
    }
}

function closePreview() { // preview closing function
    document.removeEventListener('keypress', keyPressHandler);
    if (document.getElementById('welcomeMessage').style.display = 'inline') document.getElementById('welcomeMessage').style.display = 'none';
    preview.classList.add('closedPreview');
    startGame()
}

function startGame() {
    let globalTimer = setInterval(() => {
        if (gameTimer <= 0) {
            clearInterval(globalTimer);
            finishGame();
        }
        else {
            document.querySelector('#gameTimer>span').innerText = (gameTimer - 1) + 'sec';
            if (Math.random() > .2) {
                let fishesToSpan = getRandomInRange(1, 4);
                for (let i = fishesToSpan; i > 0; i--) {
                    generateFish()
                }
            }
            gameTimer--;
        }
    }, 1000)

}

function finishGame() {
    preview.classList.remove('closedPreview');
    document.getElementById('btn').addEventListener('click', closePreview);
    document.addEventListener('keypress', keyPressHandler);
    container.innerHTML = '';
    document.getElementById('gameResult').innerHTML = 'Your score: <span style="color:forestgreen">' + pScore + '</span><br>Try to earn more!';
    gameTimer = 10;
    pScore = 0;
    document.querySelector('#gameScore>span').innerText = pScore;

}
function generateFish() {
    let fish = {'X':getRandomInRange(10,document.documentElement.clientHeight-40)+'px','Y':getRandomInRange(10,document.documentElement.clientHeight-40)+'px','direction':Math.random()>.5?'LeftToRight':'RightToLeft','type':getRandomInRange(1,3)},
        fishNode=document.createElement('img'),
        deltaSize=Math.round(Math.random()*10)+10;
    fishNode.classList.add('fish');
    fishNode.setAttribute('draggable', 'false');
    fishNode.style.width=60+deltaSize+'px';
    fishNode.style.height=60+deltaSize+'px';
    fishNode.style.position='absolute';
    fishNode.style.top=fish.Y;
    fishNode.style.left=fish.X;
    fishNode.style.transition='left 2s cubic-bezier(0, 0.36, 0.58, 1), top 2s cubic-bezier(0, 0.36, 0.58, 1)';
    fishNode.direction=fish.direction;
    fishNode.setAttribute('src','img/fish'+fish.type+'.png');
    if(fish.direction==='RightToLeft'){fishNode.style.transform='scale(-1,1)'} // reflect horizontally
    container.appendChild(fishNode);
    fishNode.addEventListener('click', onPlayerClickFish, event);
    setTimeout(moveFish,500,fishNode,5);
}
function moveFish(fishNode,counter) {
    if(counter>0){
        if(Math.random()>.5){
            if (fishNode.direction === 'RightToLeft') {
                fishNode.style.transform = 'scale(1,1)';
                fishNode.direction = 'LeftToRight'
            }
            fishNode.style.left=getRandomInRange(parseInt(fishNode.style.left),document.documentElement.clientWidth-50)+'px';
            fishNode.style.top=getRandomInRange(10,document.documentElement.clientHeight-40)+'px';
        }
        else{
            if (fishNode.direction === 'LeftToRight') {
                fishNode.style.transform = 'scale(-1,1)';
                fishNode.direction = 'RightToLeft'
            }
            fishNode.style.left=getRandomInRange(50,parseInt(fishNode.style.left))+'px';
            fishNode.style.top=getRandomInRange(10,document.documentElement.clientHeight-40)+'px';
        }
        setTimeout(moveFish, 1700, fishNode, counter - 1);
    }
    else if (container.contains(fishNode)) container.removeChild(fishNode);
}

function onPlayerClickFish(event) {
    pScore += 1;
    document.querySelector('#gameScore>span').innerText = pScore;
    container.removeChild(event.target);
}
function getRandomInRange(min, max) { // random value in range including min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}