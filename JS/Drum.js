// Ambil semua elemen tombol drum
const drumKeys = document.querySelectorAll(".Drum-sets .Key");

let allKeys = [];
// Audio object dipakai untuk play suara
const audio = new Audio(`/sound/beats/Hi-Hat.wav`);

const beatDisplay = document.getElementById("beatDisplay");

function displayBeatName(name) {
    beatDisplay.textContent = `${name}`;
}


// Fungsi mainkan suara sesuai key yang ditekan/klik
const playTune = (key) => {
    audio.src = `/sound/beats/${key}.wav`; 
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (!clickedKey) return;

    // Tampilkan nama beat
    displayBeatName(key);

    // Animasi
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
};

// Simpan semua data-key ke array dan pasang event klik
drumKeys.forEach(key => {
    allKeys.push(key.dataset.key.toLowerCase()); // key disimpan lowercase supaya cocok dengan keyboard event
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const keyMap = {
  a: "Hi-Hat",
  s: "Crash-Cymbal",
  d: "Ride-Cymbal",
  f: "Snare-Drum",
  g: "High-Tom",
  h: "Mid-Tom",
  j: "Floor-Tom",
  k: "Bass-Drum"
};

document.addEventListener("keydown", (e) => {
    const keyPressed = e.key.toLowerCase();
    if (keyMap[keyPressed]) {
        playTune(keyMap[keyPressed]);
    }
});

audio.preload = "auto";

// ======================
// SETUP LESSON
// ======================
const lvl = document.getElementById("level");
const hdr = document.getElementById("header");
const textEl = document.getElementById("text");
const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");

let lessons = [];
let currentLesson = 0;
let currentLevel = 0; // untuk progress level box

// Buat elemen gambar untuk lesson
const imgEl = document.createElement("img");
imgEl.id = "lesson-img";
imgEl.style.width = "100%";
imgEl.style.marginTop = "10px";
document.getElementById("cont").appendChild(imgEl);

// Kalau gak pakai video, skip ini
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

// Load data lessons dari JSON (pastikan path sesuai struktur folder)
fetch('../Data/DrumLesson.json')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    lessons = data;
    updateLesson(); 
  })
  .catch(error => console.error("Gagal load drum lessons:", error));

// Fungsi untuk update konten lesson ke halaman
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

// Event tombol Next
btnNext.addEventListener("click", () => {
    if (currentLesson < lessons.length - 1) {
        currentLesson++;
        updateLesson();
    }
});

// Event tombol Back
btnBack.addEventListener("click", () => {
    if (currentLesson > 0) {
        currentLesson--;
        updateLesson();
    }
});

// ================
// Level progress boxes
// ================
const lessonGrid = document.getElementById("lessonGrid");
const totalLevels = 29;

// Generate level box secara dinamis
for (let i = 1; i <= totalLevels; i++) {
    const box = document.createElement("div");
    box.classList.add("level-box");
    box.innerText = i;
    lessonGrid.appendChild(box);
}

const levelBoxes = document.querySelectorAll(".level-box");

// Update kelas 'active' pada kotak progress sesuai currentLevel
function updateLevels() {
    levelBoxes.forEach((box, index) => {
        box.classList.toggle("active", index < currentLevel);
    });
}

// Tombol untuk toggle tampilkan drum keys
const toggleBeatBtn = document.getElementById("toggleBeatBtn");
const drumContainer = document.querySelector(".Drum");

toggleBeatBtn.addEventListener("click", () => {
    drumContainer.classList.toggle("show-chords");
});

// Init pertama kali progress bar dan lesson
updateLevels();
updateLesson();
