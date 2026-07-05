const circle = document.querySelector(".gold-circle");

let scale = 1;
let direction = 1;

setInterval(() => {

    if (direction === 1) {
        scale += 0.002;

        if (scale >= 1.06) {
            direction = -1;
        }

    } else {

        scale -= 0.002;

        if (scale <= 1) {
            direction = 1;
        }

    }

    circle.style.transform =
        "scale(" + scale + ") rotate(" + ((Date.now() / 70) % 360) + "deg)";

}, 20);
