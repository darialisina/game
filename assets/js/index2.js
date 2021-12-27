document.body.className = localStorage.theme;

var ball = document.getElementById('x');
let buttonRun = document.getElementById("btn");
let buttonR = document.getElementById("btn1");
let btnMenu = document.getElementById("button1");
let btnM = document.getElementById("button2");
var timerShow = document.getElementById("timer");
let over = document.getElementById("over");
let over2 = document.getElementById("over2");
var win;
let timeMinut = 0;
over.style.zIndex = 9000;
over2.style.zIndex = 9000;
var lineElemets = [];
ball.style.position = 'absolute';
ball.style.left = '1.2em';
ball.style.top = '0.5em';
let name = document.getElementById("name");
name.innerHTML = localStorage.getItem('name');
let photo = document.getElementById("photo");
var prep = document.getElementById('y');
var prep1 = document.getElementById('y1');



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
    document.location.replace("index2.html");
})
buttonR.addEventListener('click', function() {
    document.location.replace("grade.html");
})
btnMenu.addEventListener('click', function() {
    document.location.replace("start.html");
})
btnM.addEventListener('click', function() {
    document.location.replace("start.html");
})
ball.onmousedown = function(e) {
    timeMinut = 15;
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
        if (ballHeight * ballWidth - 2 > coverSquear || ballHeight * ballWidth + 2 < coverSquear) {
            stopGame();
            console.log(lineElemets.length - 1);
        }
        if (meet(win, ball) != 0) {
            clearInterval(timer);
            winGame();
        }

        if (meet(ball, prep) != 0) {
            fall(prep);
            setTimeout(() => { stopGame(); }, 1000);
        }
        if (meet(ball, prep1) != 0) {
            fall(prep1);
            setTimeout(() => { stopGame(); }, 1000);
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

let exit = document.getElementById("ext");

exit.addEventListener('click', function() {
    clearInterval(timer);
    over2.style.display = "block";
    document.onmousemove = null;
    ball.onmouseup = null;
    ball.onmousedown = null;
})


function winGame() {
    safeResult();
    exit.style.display = "block";
    ball.onmouseup = function() {
        document.onmousemove = null;
        ball.onmouseup = null;
    }
    var a = 1,
        b = 0,
        c = 0,
        d = 1,
        tx = 10,
        ty = 10,
        angle = 0,
        currentAngle;

    function getAngleToRAD() {
        if (angle === 360) {
            angle = 0;
        }

        return angle++ * Math.PI / 180;
    }


    function update() {
        currentAngle = getAngleToRAD();

        win.style.transform = 'matrix(' + Math.cos(currentAngle) + ',' + Math.sin(currentAngle) + ',' + -Math.sin(currentAngle) + ',' + Math.cos(currentAngle) + ',' + tx + ',' + tx + ')'
        window.requestAnimationFrame(update);
    }

    update();
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
    let lastRes = result[user].level3;
    result[user].level3 = lastRes === null ? currTime : Math.max(currTime, lastRes);
    localStorage.setItem('result', JSON.stringify(result));

}

ball.ondragstart = function() {
    return false;
};

// var items = [
//     [1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1],
//     [0, 0, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 0, 0],
//     [1, 1, 1, 1, 1, 1]
// ];

var items = [
    [1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0]
];

var itemsRows = items.length;
var itemsColumns = items[0].length;

generateFields();

function generateFields() {
    for (let i = 0; i < itemsRows; i = i + 2) {
        for (let j = 0; j < itemsColumns; j = j + 2) {
            if (i !== 0) {
                let direction = Math.floor(Math.random() * 2);
                if (direction === 0) {
                    if (j !== itemsColumns - 2) {
                        items[i][j + 1] = 1;
                    } else {
                        items[i - 1][j] = 1;
                    }
                } else {
                    items[i - 1][j] = 1;
                }
            } else {
                if (j !== itemsColumns - 2) {
                    items[i][j + 1] = 1;
                }
            }

        }
    }
}

function setSunduk() {
    win = document.createElement('div');
    win.id = "finish2";
    var tmp = [
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    let tmpRows = tmp.length;
    let tmpColumns = tmp.length;

    let queue = [
        [0, 0]
    ];

    while (queue.length > 0) {
        let v = queue.shift();
        let x = v[0];
        let y = v[1];
        let curr = tmp[y][x];
        if (x !== tmpColumns - 1 && items[y * 2][2 * x + 1] !== 0 && tmp[y][x + 1] === 0) {
            queue.push([x + 1, y]);
            tmp[y][x + 1] = curr + 1;
        }

        if (y !== tmpRows - 1 && items[y * 2 + 1][2 * x] !== 0 && tmp[y + 1][x] === 0) {
            queue.push([x, y + 1]);
            tmp[y + 1][x] = curr + 1;
        }

        if (x !== 0 && items[y * 2][2 * x - 1] !== 0 && tmp[y][x - 1] === 0) {
            queue.push([x - 1, y]);
            tmp[y][x - 1] = curr + 1;
        }

        if (y !== 0 && items[y * 2 - 1][2 * x] !== 0 && tmp[y - 1][x] === 0) {
            queue.push([x, y - 1]);
            tmp[y - 1][x] = curr + 1;
        }
    }

    let maxLength = tmp[0][0];
    let x = 0;
    let y = 0;

    for (let i = 0; i < tmpRows; i++) {
        for (let j = 0; j < tmpColumns; j++) {
            if (tmp[i][j] >= maxLength) {
                maxLength = tmp[i][j];
                x = j;
                y = i;
            }
        }
    }

    container.children[y * 2].children[x * 2].appendChild(win);
}

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

setSunduk();

let time = 100;
let direct = true;
let timer1 = setInterval(function() {

    if (direct && prep.getBoundingClientRect().right < container.getBoundingClientRect().right) {
        forward();
    } else {
        direct = false;
        if (!direct && prep.getBoundingClientRect().left > container.getBoundingClientRect().left - container.getBoundingClientRect().width / 6) {
            back();
        } else {
            direct = true;
        }
    }
    if (time <= 0) {
        time = 100;
    }
}, 50);

function forward() {
    prep.style.left = prep.getBoundingClientRect().left + 20 + 'px';
    prep.style.top = prep.getBoundingClientRect().top + 20 * Math.sin(prep.getBoundingClientRect().left) + 'px';
    prep1.style.left = prep1.getBoundingClientRect().left - 20 + 'px';
    prep1.style.top = prep1.getBoundingClientRect().top - 20 * Math.sin(prep1.getBoundingClientRect().left) + 'px';
    --time;
    if (localStorage.theme === "blue year") {
        prep.style.backgroundImage = "url(../assets/css/pics/grinch.png)";
        prep1.style.backgroundImage = "url(../assets/css/pics/grinch1.png)";
    } else {
        prep.style.backgroundImage = "url(../assets/css/pics/fish2.png)";
        prep1.style.backgroundImage = "url(../assets/css/pics/fish.png)";
    }
}

function back() {
    prep.style.left = prep.getBoundingClientRect().left - 20 + 'px';
    prep.style.top = prep.getBoundingClientRect().top - 20 * Math.sin(prep.getBoundingClientRect().left) + 'px';
    prep1.style.left = prep1.getBoundingClientRect().left + 20 + 'px';
    prep1.style.top = prep1.getBoundingClientRect().top + 20 * Math.sin(prep1.getBoundingClientRect().left) + 'px';
    --time;
    if (localStorage.theme === "blue year") {
        prep.style.backgroundImage = "url(../assets/css/pics/grinch1.png)";
        prep1.style.backgroundImage = "url(../assets/css/pics/grinch.png)";
    } else {
        prep.style.backgroundImage = "url(../assets/css/pics/fish.png)";
        prep1.style.backgroundImage = "url(../assets/css/pics/fish2.png)";
    }
}

function fall(prep) {
    document.onmousemove = null;
    ball.onmouseup = null;
    ball.onmousedown = null;
    clearInterval(timer1);
    prep.style.transform = 'rotate(-90deg)';
}