let date = new Date();
const url = document.getElementById('url'), 
      generateBtn = document.getElementById('generateBtn'),
      imgQr = document.getElementById('imgQR'),
      generateUrl = document.getElementById('generateUrl');

let i = 0;
// History
const historyBtn = document.getElementById('historyBtn'),
      historyQr = document.getElementById('historyQr'),
      historyQRContent = document.getElementById('historyQR-content');
      historyBtnBg = document.getElementById('historyBtn-bg');

generateBtn.addEventListener('click', () => {
    if (url.value == ""){
        i += 1;
        if(i == 3){
            let aud = new Audio("../audio/EnterURL1.ogg");
            aud.play();
        }else if(i == 4){
            let aud = new Audio("../audio/EnterURL2.ogg");
            aud.play();
        }else if(i == 5){
            let aud = new Audio("../audio/EnterURL3.ogg");
            aud.play();
        }else{
            alert("Введи url");
        }
    }else{
        imgQr.classList.add('active');
        imgQr.setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`);
        localStorage.setItem(url.value, JSON.stringify({
            QR: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`,
            Title: url.value,
            DateCreate: date.getFullYear() + "-" + (Number(date.getMonth()) + 2) + "-" + date.getDate()
        }));
        addHistoryItems(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`, url.value);
    }
});

window.addEventListener('keydown', (k) => {
    if (k.code == "Enter"){
        if (url.value == ""){
            i += 1;
        if(i == 3){
            let aud = new Audio("../audio/EnterURL1.ogg");
            aud.play();
        }else if(i == 4){
            let aud = new Audio("../audio/EnterURL2.ogg");
            aud.play();
        }else if(i == 5){
            let aud = new Audio("../audio/EnterURL3.ogg");
            aud.play();
        }else{
            alert("Введи url");
        }
        }else{
            imgQr.classList.add('active');
            imgQr.setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`);
            localStorage.setItem(url.value, JSON.stringify({
                QR: `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`,
                Title: url.value,
                DateCreate: date.getFullYear() + "-" + (Number(date.getMonth()) + 2) + "-" + date.getDate()
            }));
            addHistoryItems(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`, url.value);
        }
    }

    if(k.code == "ArrowRight"){
        generateUrl.style.display = "none";
        historyQr.style.display = "block";
    }else if(k.code == "ArrowLeft"){
        generateUrl.style.display = "block";
        historyQr.style.display = "none";
    }
});

setInterval(function(){
    if(url.value == ""){
        imgQr.classList.remove('active');
    }else{
        imgQr.setAttribute("src", `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${url.value}`);
    }
}, 1);

historyBtn.addEventListener('click', () => {
    if (generateUrl.style.display == "none" && historyQr.style.display == "block"){
        generateUrl.style.display = "block";
        historyQr.style.display = "none";
        historyBtnBg.style.backgroundImage = "url(../image/history.png)";
    }else{
        generateUrl.style.display = "none";
        historyQr.style.display = "block";
        historyBtnBg.style.backgroundImage = "url(../image/exit.png)";
    }
});

async function addHistoryItems(qr, title){
    var createLi = await document.createElement("li");
    createLi.classList.add("history-items");
    createLi.setAttribute("id","history-items");

    var createDiv = await document.createElement("div");
    createDiv.classList.add("history-content");

    var createImg = await document.createElement("img");
    createImg.classList.add("history-image");
    createImg.setAttribute("src", qr);

    var createTitle = await document.createElement("h1");
    createTitle.classList.add("history-title");
    createTitle.innerHTML = title;

    historyQr.appendChild(createLi);
    createLi.appendChild(createDiv);
    createDiv.appendChild(createImg);
    createDiv.appendChild(createTitle);
};

// Load data 
window.addEventListener('load', () => {
    const localStorageKeys = Object.keys(localStorage);

    localStorageKeys.forEach(key => {
        const qr = JSON.parse(localStorage.getItem(key)).QR,
              title = JSON.parse(localStorage.getItem(key)).Title,
              dateCreater = JSON.parse(localStorage.getItem(key)).DateCreate;

        if (Math.floor(Math.abs(new Date(date.getFullYear() + "-" + (Number(date.getMonth()) + 2) + "-" + date.getDate()) - new Date(dateCreater)) / (1000 * 60 * 60 * 24)) <= 7){
            addHistoryItems(qr, title);
        }else{
            localStorage.removeItem(key);
        }
    });
});