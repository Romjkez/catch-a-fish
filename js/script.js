var fish1 = document.getElementById('fish1'),
    fish2 = document.getElementById('fish2'),
    fish3 = document.getElementById('fish3'),
    btn = document.getElementById('btn'),
    preview = document.getElementById('preview');
document.addEventListener('DOMContentLoaded',initial);
function initial() {
    document.addEventListener('click',closePreview);
}
function closePreview() {
    preview.animate([{top:0},{top:'-1500px'}],{duration:1000,fill:'both',easing:'ease'});
    document.getElementById('fish5').style.animationPlayState='running';
    document.getElementById('stone').style.animationPlayState='running';
}
function hideFish(event) {
    event.target.animate([{opacity:1,display:'block'},{opacity:0,display:'none'}],{duration:500,fill:'both',easing:'linear'});
    setTimeout(function () {
        event.target.style.display = 'none';
    },500)
}
