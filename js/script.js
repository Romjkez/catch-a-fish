var fish1 = document.getElementById('fish1'),
    fish2 = document.getElementById('fish2'),
    fish3 = document.getElementById('fish3');

function hideFish(event) {
    event.target.animate([{opacity:1,display:'block'},{opacity:0,display:'none'}],{duration:500,fill:'both',easing:'linear'});
    setTimeout(function () {
        event.target.style.display = 'none';
    },500)
}