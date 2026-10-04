const moon = document.getElementById("moon");

const leftEye = document.getElementById("leftEye");
const rightEye = document.getElementById("rightEye");

const commandInput = document.getElementById("commandInput");
const whiteFlash = document.getElementById("whiteFlash");

const moonContainer = document.getElementById("moonContainer");

const moonRightWrapper =
    document.getElementById("moonRightWrapper");

const moonLeftWrapper =
    document.getElementById("moonLeftWrapper");

const rightMoonHitbox =
    document.getElementById("rightMoonHitbox");

const leftMoonHitbox =
    document.getElementById("leftMoonHitbox");


let blinking = false;

let leftBlinkTimer;
let rightBlinkTimer;

let inactivityTimer;
let isInactive = false;

const INACTIVITY_TIME = 7777;

let starsExist = false;

let moonCommandCount = 0;


/* -------------------------
   EYES
------------------------- */

function openEyes() {

    leftEye.style.opacity = "1";
    rightEye.style.opacity = "1";

    leftEye.style.transform =
        "rotate(-3deg) scaleY(1)";

    rightEye.style.transform =
        "rotate(3deg) scaleY(1)";
}


function closeEyes() {

    blinking = false;

    clearTimeout(leftBlinkTimer);
    clearTimeout(rightBlinkTimer);

    leftEye.style.opacity = "0";
    rightEye.style.opacity = "0";
}


function blinkEye(eye) {

    const rotation =
        eye.classList.contains("eye-left")
            ? "rotate(-3deg)"
            : "rotate(3deg)";

    eye.style.transform =
        `${rotation} scaleY(0.05)`;

    setTimeout(() => {

        eye.style.transform =
            `${rotation} scaleY(1)`;

    }, 100);
}


function scheduleBlink(eye, side) {

    if (!blinking) return;

    const randomDelay =
        Math.random() * 1200 + 600;

    const timer = setTimeout(() => {

        blinkEye(eye);

        scheduleBlink(eye, side);

    }, randomDelay);


    if (side === "left") {

        leftBlinkTimer = timer;

    } else {

        rightBlinkTimer = timer;
    }
}


moon.addEventListener("click", () => {

    openEyes();

    blinking = true;

    scheduleBlink(leftEye, "left");

    setTimeout(() => {

        scheduleBlink(rightEye, "right");

    }, Math.random() * 400);


    setTimeout(() => {

        closeEyes();

    }, 5000);
});


/* -------------------------
   TEXT COMMANDS
------------------------- */

commandInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Enter") return;


        const command =
            commandInput.value
                .trim()
                .toLowerCase();


        /* SUN */

        if (command === "sun") {

            clearStars();

            whiteFlash.classList.add("active");

            setTimeout(() => {

                whiteFlash.classList.remove("active");

            }, 7000);
        }


        /* STAR */

        else if (command === "star") {

            createStars();
        }


        /* MOON */

        else if (command === "moon") {

            handleMoonCommand();
        }

        else if (command === "full") {

            document.documentElement.requestFullscreen();
        }

        commandInput.value = "";
    }
);


/* -------------------------
   INACTIVITY
------------------------- */

function startInactivityTimer() {

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {

        activateInactiveMode();

    }, INACTIVITY_TIME);
}


function activateInactiveMode() {

    isInactive = true;

    moonContainer.classList.add("inactive");

    commandInput.placeholder =
        "I thought you left...";
}


function stopInactiveMode() {

    if (isInactive) {

        isInactive = false;

        moonContainer.classList.remove("inactive");

        commandInput.placeholder =
            "say something...";
    }

    startInactivityTimer();
}


document.addEventListener(
    "click",
    function () {

        stopInactiveMode();
    }
);


document.addEventListener(
    "keydown",
    function () {

        stopInactiveMode();
    }
);


startInactivityTimer();


/* -------------------------
   STARS
------------------------- */

function createStars() {

    if (starsExist) return;

    starsExist = true;


    const starContainer =
        document.createElement("div");

    starContainer.id = "starContainer";


    document.body.appendChild(starContainer);


    const starCount = 120;


    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("div");

        star.classList.add("star");


        const size =
            Math.random() * 3 + 1;


        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.opacity =
            Math.random() * 0.7 + 0.3;


        starContainer.appendChild(star);
    }
}


function clearStars() {

    const starContainer =
        document.getElementById("starContainer");


    if (starContainer) {

        starContainer.remove();
    }


    starsExist = false;
}


/* -------------------------
   EXTRA MOONS
------------------------- */

function handleMoonCommand() {

    if (moonCommandCount === 0) {

        moonRightWrapper.classList.add("show");

        moonCommandCount = 1;

        return;
    }

    if (moonCommandCount === 1) {

        moonLeftWrapper.classList.add("show");

        moonCommandCount = 2;

        return;
    }


}

rightMoonHitbox.addEventListener(
    "mouseenter",
    function () {

        if (
            moonRightWrapper
                .classList
                .contains("show")
        ) {

            moonRightWrapper
                .classList
                .remove("show");
        }
    }
);

leftMoonHitbox.addEventListener(
    "mouseenter",
    function () {

        if (
            moonLeftWrapper
                .classList
                .contains("show")
        ) {

            moonLeftWrapper
                .classList
                .remove("show");
        }
    }
);

/* -------------------------
   FULLSCREEN EFFECT
------------------------- */

document.addEventListener("fullscreenchange", function () {

    if (document.fullscreenElement) {

        document.body.classList.add("fullscreen-horror");

    } else {

        document.body.classList.remove("fullscreen-horror");
    }
});

/* -------------------------
   F11 FULLSCREEN DETECTION
------------------------- */

function checkBrowserFullscreen() {

    const widthFullscreen =
        Math.abs(window.innerWidth - screen.width) < 5;

    const heightFullscreen =
        Math.abs(window.innerHeight - screen.height) < 5;


    if (widthFullscreen && heightFullscreen) {

        document.body.classList.add("fullscreen-horror");

    } else {


        if (!document.fullscreenElement) {

            document.body.classList.remove("fullscreen-horror");
        }
    }
}


window.addEventListener(
    "resize",
    checkBrowserFullscreen
);


checkBrowserFullscreen();