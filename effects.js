const circle = document.querySelector(".gold-circle");

let angle = 0;
let scale = 1;
let growing = true;

setInterval(() => {

    angle += 0.3;

    if (growing) {
        scale += 0.0008;

        if (scale >= 1.05) {
            growing = false;
        }

    } else {

        scale -= 0.0008;

        if (scale <= 1) {
            growing = true;
        }

    }

    circle.style.transform =
        `rotate(${angle}deg) scale(${scale})`;

}, 20);
