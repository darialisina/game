document.body.className = localStorage.theme;

var ball = document.getElementById('x');
let buttonRun = document.getElementById("btn");
let buttonR = document.getElementById("btn1");
let btnMenu = document.getElementById("button1");
let btnMenu1 = document.getElementById("button2");
var timerShow = document.getElementById("timer");
let over = document.getElementById("over");
let over2 = document.getElementById("over2");
var win = document.getElementById("finish1");
let timeMinut = 0;
over.style.zIndex = 9000;
over2.style.zIndex = 9000;
var lineElemets = [];
ball.style.position = 'absolute';
ball.style.left = '0.3em';
ball.style.top = '0.3em';
let name = document.getElementById("name");
name.innerHTML = localStorage.getItem('name');
let photo = document.getElementById("photo");


if ((localStorage.getItem('photo') === '1') && (localStorage.theme === "blue")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo.jpg)";
    console.log(localStorage.theme);
}
if ((localStorage.getItem('photo') === '2') && (localStorage.theme === "blue")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo1.jpg)";
}
if ((localStorage.getItem('photo') === '3') && (localStorage.theme === "blue")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo3.jpg)";
}

if ((localStorage.getItem('photo') === '1') && (localStorage.theme === "blue year")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo20.jpg)";
}
if ((localStorage.getItem('photo') === '2') && (localStorage.theme === "blue year")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo21.jpg)";
}
if ((localStorage.getItem('photo') === '3') && (localStorage.theme === "blue year")) {
    photo.style.backgroundImage = "url(../assets/css/pics/photo22.jpg)";
}

buttonRun.addEventListener('click', function() {
    document.location.replace("index1.html");
})
buttonR.addEventListener('click', function() {
    document.location.replace("index2.html");
})
btnMenu1.addEventListener('click', function() {
    document.location.replace("start.html");
})
btnMenu.addEventListener('click', function() {
    document.location.replace("start.html");
})
ball.onmousedown = function(e) {
    timeMinut = 25;
    timer = setInterval(function() {
        seconds = timeMinut % 60
        minutes = timeMinut / 60 % 60
        if (timeMinut <= 0) {
            stopGame();
        } else {
            let strTimer = `${Math.trunc(minutes)}:${seconds}`;
            timerShow.innerHTML = strTimer;
        }
        --timeMinut;
    }, 1000);
    ball.style.position = 'absolute';
    moveAt(e);
    document.body.appendChild(ball);

    ball.style.zIndex = 1000;

    function moveAt(e) {
        var coverSquear = 0;
        for (var i in lineElemets) {
            var block = lineElemets[i];
            coverSquear += meet(block, ball);
        }

        var ballWidth = ball.getBoundingClientRect().width;
        var ballHeight = ball.getBoundingClientRect().height;
        if (ballHeight * ballWidth != coverSquear) {
            stopGame();
            console.log(lineElemets.length - 1);
        }
        if (meet(win, ball) != 0) {
            winGame();
        }
        ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
        ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
    }


    document.onmousemove = function(e) {
        moveAt(e);
    }
    ball.onmouseup = function() {
        stopGame();
        document.onmousemove = null;
        ball.onmouseup = null;
    }
}

function meet(obj1, obj2) {
    var left = Math.max(obj1.getBoundingClientRect().left, obj2.getBoundingClientRect().left);
    var right = Math.min(obj1.getBoundingClientRect().right, obj2.getBoundingClientRect().right);
    var top = Math.max(obj1.getBoundingClientRect().top, obj2.getBoundingClientRect().top);
    var bottom = Math.min(obj1.getBoundingClientRect().bottom, obj2.getBoundingClientRect().bottom);

    var width = right - left;
    var height = bottom - top;
    if (width >= 0 && height >= 0) {

        return width * height;
    } else {
        return 0;
    }
}

function stopGame() {
    clearInterval(timer);
    over.style.display = "block";
    document.onmousemove = null;
    ball.onmouseup = null;
    ball.onmousedown = null;
}

function winGame() {
    safeResult();
    clearInterval(timer);
    over2.style.display = "block";
    document.onmousemove = null;
    ball.onmouseup = null;
    ball.onmousedown = null;
}

function safeResult() {
    let result = localStorage.getItem('result');
    if (!result) {
        result = {};
    } else {
        result = JSON.parse(result);
    }
    let user = localStorage.getItem('name');

    if (!result[user]) {
        result[user] = {
            level1: null,
            level2: null,
            level3: null
        }
    }

    let currTime = timeMinut;
    let lastRes = result[user].level2;
    result[user].level2 = lastRes === null ? currTime : Math.max(currTime, lastRes);
    localStorage.setItem('result', JSON.stringify(result));

}

ball.ondragstart = function() {
    return false;
};

var items = [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1]
];


for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items[i].length; j++) {
        if (items[i][j] === 1) {
            container.children[i].children[j].style.background = '#8acde7';
            lineElemets.push(container.children[i].children[j]);
        } else {
            container.children[i].children[j].style.background = 'transparent';
        }
    }
}