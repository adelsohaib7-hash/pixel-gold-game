let totalPG = Number(localStorage.getItem("totalPG")) || 39;
let miningPG = Number(localStorage.getItem("miningPG")) || 0;

const balance = document.getElementById("pgBalance");
const rate = document.getElementById("rate");
const claimBtn = document.getElementById("claimBtn");
const circle = document.querySelector(".gold-circle");

// 100 PG في الساعة
const ratePerSecond = 100 / 3600;

function saveData() {
    localStorage.setItem("totalPG", totalPG);
    localStorage.setItem("miningPG", miningPG);
}

function updateScreen() {
    balance.innerText = "PG " + totalPG.toFixed(2);
    rate.innerText = miningPG.toFixed(4);

    claimBtn.disabled = miningPG < 10;

    saveData();
}

// التعدين التلقائي يذهب إلى رصيد التعدين
setInterval(() => {
    miningPG += ratePerSecond;
    updateScreen();
}, 1000);

// الضغط على العملة يذهب مباشرة إلى الرصيد الرئيسي
circle.addEventListener("click", () => {
    totalPG += 1;
    updateScreen();
});

// استلام رصيد التعدين
claimBtn.addEventListener("click", () => {
    if (miningPG >= 10) {
        totalPG += miningPG;
        miningPG = 0;
        updateScreen();
        alert("تم استلام الأرباح بنجاح");
    }
});

updateScreen();
