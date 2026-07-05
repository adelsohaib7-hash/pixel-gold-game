let totalPG = Number(localStorage.getItem("totalPG")) || 39;
let miningPG = Number(localStorage.getItem("miningPG")) || 0;

const ratePerSecond = 1.4722 / (100 * 3600);

const balance = document.getElementById("pgBalance");
const rate = document.getElementById("rate");
const claimBtn = document.getElementById("claimBtn");

function saveData() {
    localStorage.setItem("totalPG", totalPG);
    localStorage.setItem("miningPG", miningPG);
}

function updateScreen() {
    balance.innerText = "PG " + totalPG.toFixed(2);
    rate.innerText = miningPG.toFixed(4);

    if (miningPG >= 10) {
        claimBtn.disabled = false;
    } else {
        claimBtn.disabled = true;
    }

    saveData();
}

setInterval(() => {
    miningPG += ratePerSecond;
    updateScreen();
}, 1000);

claimBtn.addEventListener("click", () => {
    if (miningPG >= 10) {
        totalPG += miningPG;
        miningPG = 0;
        updateScreen();
        alert("تم استلام الأرباح بنجاح");
    }
});

updateScreen();
