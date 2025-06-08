const pianoKeys = document.querySelectorAll(".Piano-keys-list .Key");

let allKeys = [],
audio = new Audio(`/sound/tunes/c3.wav`);

const toneDisplay = document.getElementById("toneDisplay");

function displaytoneName(name) {
    toneDisplay.textContent = `${name}`;
}

const playTune = (key) => {
    audio.src = `/sound/tunes/${key}.wav`; 
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (!clickedKey) return;

    // Tampilkan nama beat
    displaytoneName(key);

    // Animasi
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

// Simpan semua data-key ke array
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const keyMap = {
  q: "c3",
  w: "cs3",
  e: "d3",
  r: "ds3",
  t: "e3",
  y: "f3",
  u: "fs3",
  i: "g3",
  o:"gs3",
  p:"a3",
  a: "as3",
  s: "b3",
  d: "c4",
  f: "cs4",
  g: "d4",
  h: "ds4",
  j: "e4",
  k: "f4",
  l:"fs4",
  z:"g4",
  x: "gs4",
  c: "a4",
  v:"as4",
  b:"b4"

};

document.addEventListener("keydown", (e) => {
    const keyPressed = e.key.toLowerCase();
    if (keyMap[keyPressed]) {
        playTune(keyMap[keyPressed]);
    }
});

audio.preload = "auto";


// LESSON SETUP
const lvl = document.getElementById("level");
const hdr = document.getElementById("header");
const textEl = document.getElementById("text");
const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");


let currentLesson = 0;
let currentLevel = 0;

// Tambah IMG dan VIDEO
const imgEl = document.createElement("img");
imgEl.id = "lesson-img";
imgEl.style.width = "100%";
imgEl.style.marginTop = "10px";
document.getElementById("cont").appendChild(imgEl);

const vids = document.createElement("iframe");
vids.id = "lesson-vids";
vids.style.width = "80%";
vids.style.height = "300px";
vids.style.marginTop = "10px";
vids.style.display = "none"; 
vids.setAttribute("frameborder", "0");
vids.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
vids.setAttribute("allowfullscreen", "");
document.getElementById("cont").appendChild(vids);

fetch('../Data/PianoLesson.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    lessons = data;
    updateLesson(); 
  })
  .catch(error => console.error("Gagal load piano lessons:", error));

// Update konten lesson
function updateLesson() {
    if (!lessons.length) return; // data belum siap

    const lesson = lessons[currentLesson];

    lvl.textContent = lesson.level;
    hdr.textContent = lesson.hdr;
    textEl.textContent = lesson.text;

    if (lesson.img) {
        imgEl.src = lesson.img;
        imgEl.style.display = "block";
    } else {
        imgEl.style.display = "none";
    }

    // Tidak pakai video
    vids.style.display = "none";
    vids.src = "";

    currentLevel = currentLesson + 1;
    updateLevels();
}

btnNext.addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
        currentLesson++;
        updateLesson();
    }
});

btnBack.addEventListener("click", () => {
    if (currentLesson > 0) {
        currentLesson--;
        updateLesson();
    }
});

// LEVEL BOX PROGRESS
const lessonGrid = document.getElementById("lessonGrid");
const totalLevels = 29;

for (let i = 1; i <= totalLevels; i++) {
    const box = document.createElement("div");
    box.classList.add("level-box");
    box.innerText = i;
    lessonGrid.appendChild(box);
}

const levelBoxes = document.querySelectorAll(".level-box");

function updateLevels() {
    levelBoxes.forEach((box, index) => {
        box.classList.toggle("active", index < currentLevel);
    });
}

const toggleChordBtn = document.getElementById("toggleChordBtn");
const pianoContainer = document.querySelector(".Piano");

toggleChordBtn.addEventListener("click", () => {
    pianoContainer.classList.toggle("show-chords");
});


// Init
updateLesson();
updateLevels();
