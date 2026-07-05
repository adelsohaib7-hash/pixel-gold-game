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

// التعدين التلقائي
setInterval(() => {
    miningPG += ratePerSecond;
    updateScreen();
}, 1000);

// زيادة بالنقر على الدائرة
circle.addEventListener("click", () => {
    miningPG += 1;
    updateScreen();
});

// استلام الأرباح
claimBtn.addEventListener("click", () => {
    if (miningPG >= 10) {
        totalPG += miningPG;
        miningPG = 0;
        updateScreen();
        alert("تم استلام الأرباح بنجاح");
    }
});

updateScreen();
