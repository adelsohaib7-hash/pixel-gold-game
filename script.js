let totalPG = Number(localStorage.getItem("totalPG")) || 39;
let miningPG = Number(localStorage.getItem("miningPG")) || 0;

let clicksLeft = Number(localStorage.getItem("clicksLeft")) || 500;
let timerStart = Number(localStorage.getItem("timerStart")) || 0;

const SIX_HOURS = 6 * 60 * 60 * 1000;

const balance = document.getElementById("pgBalance");
const rate = document.getElementById("rate");
const claimBtn = document.getElementById("claimBtn");
const circle = document.querySelector(".gold-circle");

const clicksText = document.getElementById("clicksLeft");
const timerText = document.getElementById("timer");

// 100 PG في الساعة
const ratePerSecond = 100 / 3600;

function saveData() {
    localStorage.setItem("totalPG", totalPG);
    localStorage.setItem("miningPG", miningPG);
    localStorage.setItem("clicksLeft", clicksLeft);
    localStorage.setItem("timerStart", timerStart);
}

function formatTime(ms) {
    let total = Math.floor(ms / 1000);

    let h = Math.floor(total / 3600);
    let m = Math.floor((total % 3600) / 60);
    let s = total % 60;

    return (
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0")
    );
}

function updateTimer() {

    if (timerStart === 0) {
        timerText.innerText = "06:00:00";
        return;
    }

    let remain = SIX_HOURS - (Date.now() - timerStart);

    if (remain <= 0) {

        clicksLeft = 500;
        timerStart = 0;

        saveData();

        timerText.innerText = "06:00:00";

    } else {

        timerText.innerText = formatTime(remain);

    }

}

function updateScreen() {

    balance.innerText = "PG " + totalPG.toFixed(2);

    rate.innerText = miningPG.toFixed(4);

    clicksText.innerText = clicksLeft + " / 500";

    claimBtn.disabled = miningPG < 10;

    updateTimer();

    saveData();

}

// التعدين التلقائي
setInterval(() => {

    miningPG += ratePerSecond;

    updateScreen();

},1000);

// تحديث المؤقت
setInterval(updateScreen,1000);

// النقر
circle.addEventListener("click",()=>{

    if(clicksLeft<=0){
        return;
    }

    if(timerStart===0){
        timerStart=Date.now();
    }

    clicksLeft--;

    totalPG++;

    updateScreen();

});

// استلام التعدين
claimBtn.addEventListener("click",()=>{

    if(miningPG>=10){

        totalPG+=miningPG;

        miningPG=0;

        updateScreen();

        alert("تم استلام الأرباح");

    }

});

updateScreen();
