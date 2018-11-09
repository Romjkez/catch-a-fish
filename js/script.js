let preview = document.getElementById('preview');

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', closePreview);
    document.querySelectorAll('.fish').forEach((elem) => {
        elem.addEventListener('mouseover', hideFish)
    });
    preview.addEventListener('click', closePreview);
    document.addEventListener('keypress', keyPressHandler);
    setTimeout(function () {
        document.querySelector('#fish5').classList.remove('visible');
        document.querySelector('#fish5').classList.add('hideFish');
    }, 4150)
});

function keyPressHandler(e) {
    if (e.key === " " || e.key === 'Enter') {
        closePreview();
    }
}
function closePreview() {
    document.removeEventListener('keypress', keyPressHandler);
    preview.classList.add('closedPreview');
    document.getElementById('fish5').style.animationPlayState = 'running';
    document.getElementById('stone').style.animationPlayState = 'running';
}

function hideFish(event) {
    event.target.classList.add('hideFish');
    if (document.querySelectorAll('.fish.hideFish').length >= 8) {
        alert('No fish left!');
    }

}
