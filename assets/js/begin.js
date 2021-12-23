document.body.className = localStorage.theme;

let button1 = document.getElementById("btn1");

button1.addEventListener('click', function() {
    document.location.replace("index.html");
})

let button2 = document.getElementById("btn2");

button2.addEventListener('click', function() {
    document.location.replace("index1.html");
})

let button3 = document.getElementById("btn3");

button3.addEventListener('click', function() {
    document.location.replace("index2.html");
})

let buttonS = document.getElementById("btnS");
let name = document.getElementById("name");
let photo = document.getElementById("photo");
let exit = document.getElementById("ext");

exit.addEventListener('click', function() {
    document.location.replace("profile.html");
})

let top1 = document.getElementById("btn");

top1.addEventListener('click', function() {
    document.location.replace("grade.html");
})

name.innerHTML = localStorage.getItem('name');

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