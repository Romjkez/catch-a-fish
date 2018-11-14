const preview = document.getElementById('preview'), container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', function () { // init function
    document.addEventListener('click', closePreview);
    document.querySelectorAll('.fish').forEach((elem) => {
        elem.addEventListener('mouseover', hideFish)
    });
    preview.addEventListener('click', closePreview);
    document.addEventListener('keypress', keyPressHandler);
    generateFish();
});

function keyPressHandler(e) {
    if (e.key === " " || e.key === 'Enter') { // ability to start the game by pressing "Space" or "Enter"
        closePreview();
    }
}
function closePreview() { // game start function
    document.removeEventListener('keypress', keyPressHandler);
    preview.classList.add('closedPreview');
    document.getElementById('fish5').style.animationPlayState = 'running';
    document.getElementById('stone').style.animationPlayState = 'running';
    setTimeout(function () {
        document.querySelector('#fish5').classList.remove('visible');
        document.querySelector('#fish5').classList.add('hideFish');
    }, 4150);
}

function generateFish() {
    let fish = {'X':getRandomInRange(10,document.documentElement.clientHeight-40)+'px','Y':getRandomInRange(10,document.documentElement.clientHeight-40)+'px','direction':Math.random()>.5?'LeftToRight':'RightToLeft','type':getRandomInRange(1,3)},
        fishNode=document.createElement('img'),
        deltaSize=Math.round(Math.random()*10)+10;
    fishNode.classList.add('fish','visible');
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
    setTimeout(moveFish,500,fishNode,5);

}
function moveFish(fishNode,counter) {
    if(counter>0){
        if(Math.random()>.5){
            if(fishNode.direction==='RightToLeft'){fishNode.style.transform='scale(1,1)';fishNode.direction='LeftToRight'}
            fishNode.style.left=getRandomInRange(parseInt(fishNode.style.left),document.documentElement.clientWidth-50)+'px';
            fishNode.style.top=getRandomInRange(10,document.documentElement.clientHeight-40)+'px';
        }
        else{
            if(fishNode.direction==='LeftToRight'){fishNode.style.transform='scale(-1,1)';fishNode.direction='RightToLeft'}
            fishNode.style.left=getRandomInRange(50,parseInt(fishNode.style.left))+'px';
            fishNode.style.top=getRandomInRange(10,document.documentElement.clientHeight-40)+'px';
        }
        setTimeout(moveFish,1900,fishNode,counter-1);
    }
}

function hideFish(event) {
    event.target.classList.add('hideFish');
    event.target.classList.remove('visible');
    if (document.querySelectorAll('.fish.visible').length<1) {
        alert('No fishes left! Reload the page to start from the beginning.');
    }
}
function getRandomInRange(min, max) { // random value in range including min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}