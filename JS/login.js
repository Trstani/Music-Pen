const container = document.getElementById('container');
const switchBtn = document.getElementById('switchBtn');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const nameFields = document.getElementById('nameFields');
const authForm = document.getElementById('authForm');

let isLogin = false;

switchBtn.addEventListener('click', () => {
  isLogin = !isLogin;
  container.classList.toggle('slide');
  formTitle.textContent = isLogin ? 'Log In' : 'Sign Up';
  submitBtn.textContent = isLogin ? 'Log In' : 'Create Account';
  switchBtn.textContent = isLogin
    ? "Don't have an account? Sign Up"
    : 'Already have an account? Log In';
  nameFields.style.display = isLogin ? 'none' : 'block';
});

// Handle login and signup
authForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if (isLogin) {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return alert('Invalid credentials!');
    localStorage.setItem('loggedInUser', user.firstName);
    localStorage.setItem('isFirstTime', 'false');
    window.location.href = '/HTML/landpage.html';
  } else {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    if (users.find(u => u.email === email)) return alert('Email already exists!');
    users.push({ firstName, lastName, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', firstName);
    localStorage.setItem('isFirstTime', 'true');
    window.location.href = '/HTML/landpage.html';
  }
});

const signupImg = document.getElementById('signupImg');
const loginImg = document.getElementById('loginImg');

function updateImage() {
  if (isLogin) {
    signupImg.classList.remove('active');
    loginImg.classList.add('active');
  } else {
    loginImg.classList.remove('active');
    signupImg.classList.add('active');
  }
}

updateImage(); // initial state
switchBtn.addEventListener('click', () => {
  // existing toggle logic ...
  updateImage(); // call this every switch
});
