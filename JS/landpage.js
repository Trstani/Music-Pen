// Welcome Message
const userName = localStorage.getItem('loggedInUser');

const nameElement = document.getElementById('name');
if (userName && nameElement) {
  nameElement.textContent = userName;
}


const isFirstTime = localStorage.getItem('isFirstTime');
const welcome = document.getElementById('welcome');

if (userName) {
  welcome.textContent = isFirstTime === 'true'
    ? `Welcome to Music Pen, ${userName}! We're excited to have you here. Let's begin your musical journey and unlock your true potential.`
    : `Welcome back, ${userName}! Keep the rhythm going – your musical path continues right here at Music Pen.`;
} else {
  welcome.textContent = 'Welcome to Music Pen – your starting point for discovering the joy of music. Learn instruments at your own pace, from anywhere.';
}

// Last Visit
const now = new Date();
const lastVisit = localStorage.getItem("lastVisit");
const lastVisitEl = document.getElementById("lastVisit");

if (lastVisitEl) {
  lastVisitEl.innerHTML = lastVisit
    ? `<p style="border-bottom: 2px solid #6552D0; padding-bottom: 5px;">Your last visit was on <strong>${lastVisit}</strong></p>`
    : `<p style="border-bottom: 2px solid #6552D0; padding-bottom: 5px;">This is your first visit! Welcome!</p>`;
}
localStorage.setItem("lastVisit", now.toLocaleString());

// Login History
const historyDiv = document.getElementById("history");
const history = JSON.parse(localStorage.getItem('loginHistory') || '[]');

if (historyDiv && history.length > 0) {
  historyDiv.innerHTML = "<h3>Login History:</h3>" + history.map(
    h => `<p>${h.name} (${h.email}) — ${h.time}</p>`
  ).join('');
}

// Carousel logic
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".carousel-dots");
let currentIndex = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.dataset.index = index;
  if (index === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dots span");

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 4000);

// Progress bar
const progressData = {
  piano: 80,
  drum: 60,
  vocal: 50,
  guitar: 20,
  bass: 40
};

const graphContainer = document.getElementById('graph');

for (let lesson in progressData) {
  const barWrapper = document.createElement('div');
  barWrapper.style.margin = '10px 0';

  const label = document.createElement('p');
  label.textContent = `${lesson.charAt(0).toUpperCase() + lesson.slice(1)}: ${progressData[lesson]}%`;

  const bar = document.createElement('div');
  bar.style.background = '#ddd';
  bar.style.width = '100%';
  bar.style.borderRadius = '10px';

  const fill = document.createElement('div');
  fill.style.height = '20px';
  fill.style.width = `${progressData[lesson]}%`;
  fill.style.background = '#6552D0';
  fill.style.borderRadius = '10px';

  bar.appendChild(fill);
  barWrapper.appendChild(label);
  barWrapper.appendChild(bar);

  graphContainer.appendChild(barWrapper);
}

// Mentor Hover Cards
const blocks = [
  {
    id: 'ckcc',
    original: `
      <img src="https://file.aiquickdraw.com/imgcompressed/img/compressed_5b5d78bd9e0cf6362c488bb78955dbf9.webp" alt="">
      <h2>Mia Ross</h2>
    `,
    hovered: `
      <h1 class="card-title">Mia Ross</h1>
      <h2 class="card-subtitle">Professional Music Instructor with 10+ years of experience.</h2>
    `
  },
  {
    id: 'ckcd',
    original: `
      <img src="https://file.aiquickdraw.com/imgcompressed/img/compressed_bfcdb1d53e3d3ee1d3397d83aa237096.webp" alt="">
      <h2>Frank Zappa</h2>
    `,
    hovered: `
      <h1 class="card-title">Frank Zappa</h1>
      <h2 class="card-subtitle">Drum Expert and Stage Performer since 2010.</h2>
    `
  },
  {
    id: 'ckce',
    original: `
      <img src="https://file.aiquickdraw.com/imgcompressed/img/compressed_bd75208c54a9aa3b25d9878af4230f9c.webp" alt="">
      <h2>Simon Bombardilo</h2>
    `,
    hovered: `
      <h1 class="card-title">Simon Bombardilo</h1>
      <h2 class="card-subtitle">Piano Coach for Children and Teens.</h2>
    `
  }
];

blocks.forEach(block => {
  const el = document.getElementById(block.id);
  el.addEventListener('mouseenter', () => {
    el.classList.add('expanded');
    el.innerHTML = block.hovered;
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('expanded');
    el.innerHTML = block.original;
  });
});
