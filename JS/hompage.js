document.querySelectorAll('.question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    item.classList.toggle('active');
  });
});


let faront = document.getElementById("ont");
let dec = document.getElementById("dec");

let isVisible = false; 

function show() {
  if (!isVisible) {
    dec.textContent = "Whether you’re picking up an instrument for the first time or looking to refine your skills, we provide structured lessons, interactive exercises, and expert guidance to support your musical journey. Our platform covers various aspects of music learning, including instrument tutorials, music theory, composition, and ear training. With engaging content and a user-friendly interface, Musical Pen makes learning music fun, accessible, and effective for everyone. Join us and start creating beautiful melodies today!";
    isVisible = true;
  } else {
    dec.textContent = "";
    isVisible = false;
  }
}

faront.addEventListener("click", show);