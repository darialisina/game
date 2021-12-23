let buttonS = document.getElementById("btnS");
let buttonSS = document.getElementById("btnSS");
let reload = document.getElementById("reload");
var text = document.getElementsByTagName("input")[0];
let name = document.getElementById("name");
let results = JSON.parse(localStorage.getItem('result'));
let atten = document.getElementById("atten");
let themeBtn = document.getElementById("tema");

if (!localStorage.theme) localStorage.theme = "blue";
document.body.className = localStorage.theme;

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle("year");
    localStorage.theme = document.body.className
})

buttonSS.addEventListener('click', function() {
    if (text.value != '') {
        localStorage.setItem('name', text.value);
        document.location.replace("start.html");
    }
})

reload.addEventListener('click', function() {
    document.location.replace("profile.html");
})

buttonS.addEventListener('click', function() {
    var have = false;
    if (results != null) {
        for (let key of Object.keys(results)) {
            if (text.value === key) {
                have = true;
            };
        }
    }
    if (have) {
        atten.style.display = "block";
    } else {

        if (text.value != '') {
            localStorage.setItem('name', text.value);
            document.location.replace("start.html");
        }
    }

})

let buttonP1 = document.getElementById("btnP1");
let photo = document.getElementById("photo");
localStorage.setItem('photo', 0);


buttonP1.addEventListener('click', function() {
    if (localStorage.theme === "blue year") {
        photo.style.backgroundImage = "url(../assets/css/pics/photo20.jpg)";
    } else {
        photo.style.backgroundImage = "url(../assets/css/pics/photo.jpg)";
    }
    localStorage.photo = 1;
})
let buttonP2 = document.getElementById("btnP2");

buttonP2.addEventListener('click', function() {
    if (localStorage.theme === "blue year") {
        photo.style.backgroundImage = "url(../assets/css/pics/photo21.jpg)";
    } else {
        photo.style.backgroundImage = "url(../assets/css/pics/photo1.jpg)";
    }
    localStorage.photo = 2;
})

let buttonP3 = document.getElementById("btnP3");

buttonP3.addEventListener('click', function() {
    if (localStorage.theme === "blue year") {
        photo.style.backgroundImage = "url(../assets/css/pics/photo22.jpg)";
    } else {
        photo.style.backgroundImage = "url(../assets/css/pics/photo3.jpg)";
    }
    localStorage.photo = 3;
})

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