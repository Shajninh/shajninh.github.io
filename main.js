/* =========================
   ELEMENTS
========================= */

const scene = document.getElementById("scene");

const darkMask = document.getElementById("dark-mask");

const lightEffect = document.getElementById("light-effect");

const intro = document.querySelector(".fade-in");


/* Flashlights */

const whiteFlashlight =
    document.querySelector(".flashlight-option-1");

const orangeFlashlight =
    document.querySelector(".flashlight-option-2");


/* Sounds */

const clickSound =
    document.getElementById("click");

const ambientSound =
    document.getElementById("ambient");

const soundButton =
    document.getElementById("sound-button");


/* Scene hotspots */

const sceneHotspots =
    document.getElementById("scene-hotspots");

const infoHotspot =
    document.getElementById("info-hotspot");

const posterHotspot =
    document.getElementById("poster-hotspot");

const phoneHotspot =
    document.getElementById("phone-hotspot");


/* Content screen */

const contentScreen =
    document.getElementById("content-screen");

const backButton =
    document.getElementById("back-button");


/* Object pages */

const infoPage =
    document.getElementById("info-page");

const posterPage =
    document.getElementById("poster-page");

const phonePage =
    document.getElementById("phone-page");


/* =========================
   STATE
========================= */

let flashlightChosen = false;


/* =========================
   CLICK SOUND
========================= */

function playClickSound() {

    clickSound.currentTime = 0;

    clickSound.volume = 0.7;

    clickSound.play().catch(() => {
        console.log("Click sound could not play.");
    });

}


/* =========================
   MOUSE MOVEMENT
========================= */

document.addEventListener("mousemove", (event) => {

    /*
        Don't run flashlight movement
        before a flashlight has been selected.
    */

    if (!flashlightChosen) {
        return;
    }


    const x = event.clientX;

    const y = event.clientY;


    /* -------------------------
       MOVE COLORED LIGHT
    -------------------------- */

    lightEffect.style.left = `${x}px`;

    lightEffect.style.top = `${y}px`;


    /* -------------------------
       MOVE OPENING IN MASK
    -------------------------- */

    darkMask.style.background = `
        radial-gradient(
            circle 180px at ${x}px ${y}px,

            transparent 0%,

            rgba(0, 0, 0, 0.15) 30%,

            rgba(0, 0, 0, 0.65) 65%,

            black 100%
        )
    `;

});


/* =========================
   ACTIVATE FLASHLIGHT
========================= */

function activateFlashlight() {

    flashlightChosen = true;


    /* Play selection sound */

    playClickSound();


    /* Hide intro */

    intro.classList.add("hidden");


    /* Fade in scene */

    scene.classList.add("scene-visible");


    /* Show flashlight */

    lightEffect.style.opacity = "1";


    /* Enable hotspots */

    sceneHotspots.classList.add("active");


    /* Hide normal cursor */

    document.body.style.cursor = "none";

}


/* =========================
   BRIGHT WHITE
========================= */

whiteFlashlight.addEventListener("click", () => {

    lightEffect.style.background = `
        radial-gradient(
            circle,

            rgba(255, 255, 255, 1) 0%,

            rgba(255, 255, 255, 0.65) 20%,

            rgba(255, 255, 255, 0.25) 45%,

            transparent 72%
        )
    `;


    activateFlashlight();

});


/* =========================
   EMBER ORANGE
========================= */

orangeFlashlight.addEventListener("click", () => {

    lightEffect.style.background = `
        radial-gradient(
            circle,

            rgba(255, 160, 60, 1) 0%,

            rgba(255, 110, 25, 0.65) 20%,

            rgba(255, 70, 10, 0.25) 45%,

            transparent 72%
        )
    `;


    activateFlashlight();

});


/* =========================
   AMBIENT SOUND TOGGLE
========================= */

soundButton.addEventListener("click", () => {

    if (ambientSound.paused) {

        ambientSound.volume = 0.3;


        ambientSound.play()
            .then(() => {

                soundButton.textContent = "🔊";

            })
            .catch(() => {

                console.log(
                    "Ambient sound could not play."
                );

            });

    }

    else {

        ambientSound.pause();

        soundButton.textContent = "🔇";

    }

});


/* =========================
   OPEN OBJECT PAGE
========================= */

function openObjectPage(page) {

    playClickSound();


    /* -------------------------
       Hide scene
    -------------------------- */

    scene.style.opacity = "0";

    darkMask.style.opacity = "0";

    lightEffect.style.opacity = "0";


    sceneHotspots.style.opacity = "0";

    sceneHotspots.style.pointerEvents = "none";


    /* -------------------------
       Show content screen
    -------------------------- */

    contentScreen.classList.add("active");


    /* -------------------------
       Hide all object pages
    -------------------------- */

    infoPage.classList.remove("active");

    posterPage.classList.remove("active");

    phonePage.classList.remove("active");


    /* -------------------------
       Show selected page
    -------------------------- */

    page.classList.add("active");


    /* -------------------------
       Restore cursor
    -------------------------- */

    document.body.style.cursor = "default";

}


/* =========================
   INFORMATION BOARD
========================= */

infoHotspot.addEventListener("click", () => {

    openObjectPage(infoPage);

});


/* =========================
   MISSING POSTER
========================= */

posterHotspot.addEventListener("click", () => {

    openObjectPage(posterPage);

});


/* =========================
   PHONE BOOTH
========================= */

phoneHotspot.addEventListener("click", () => {

    openObjectPage(phonePage);

});


/* =========================
   BACK TO SCENE
========================= */

backButton.addEventListener("click", () => {

    playClickSound();


    /* -------------------------
       Hide object page
    -------------------------- */

    contentScreen.classList.remove("active");


    /* -------------------------
       Restore scene
    -------------------------- */

    scene.style.opacity = "1";

    darkMask.style.opacity = "1";

    lightEffect.style.opacity = "1";


    /* -------------------------
       Restore hotspots
    -------------------------- */

    sceneHotspots.style.opacity = "1";

    sceneHotspots.style.pointerEvents = "auto";


    /* -------------------------
       Hide regular cursor
    -------------------------- */

    document.body.style.cursor = "none";

});