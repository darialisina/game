document.body.className = localStorage.theme;

let name = document.getElementById("name");
name.innerHTML = localStorage.getItem('name');
console.log(localStorage.getItem('name'));

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

let exit = document.getElementById("ext");

exit.addEventListener('click', function() {
    document.location.replace("start.html");
})

function tableCreate() {

    var sec = document.getElementById('section');
    var tbl = document.getElementsByTagName('table')[0];
    tbl.style.width = '80%';

    let results = JSON.parse(localStorage.getItem('result'));

    let statistic = [];

    for (let key of Object.keys(results)) {
        let result = results[key];
        if (result.level1 != null && result.level2 != null && result.level3 != null) {
            statistic.push({
                username: key,
                sum: summ(result)
            });
        }
    }

    statistic.sort((o1, o2) => o2.sum - o1.sum);

    statistic.forEach((result) => {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.innerHTML = result.username;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = 60 - result.sum;
        tr.appendChild(td);
        tbl.appendChild(tr);
    });

    sec.appendChild(tbl)
}

function summ(values) {
    let sum = 0;
    for (let points of Object.values(values)) {
        if (points != null) {
            sum += points;
        }
    }
    return sum;
}

tableCreate();

let download = document.getElementById("download");

download.addEventListener('click', function() {
    let text = localStorage.getItem('result');
    text = text.replace('{', '');
    text = text.replace(/"/g, '');
    text = text.replace(/}/g, '\n');
    text = text.replace(/{/g, '\n');
    text = text.replace(/,/g, '\n');
    text = text.replace(/:/g, ': ');
    downloadAsFile(text);

    function downloadAsFile(data) {
        let a = document.createElement("a");
        let file = new Blob([data], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = "results.txt";
        a.click();
    }
})