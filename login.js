// ======================= Signup & Login =======================
const signupForm = document.querySelector('.form-signup');
const loginForm = document.querySelector('.form-login');

// ----------------- Signup -----------------
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  // ✅ Username validation (only letters + spaces allowed)
  const usernamePattern = /^[A-Za-z ]+$/;
  if (!usernamePattern.test(username)) {
    alert('⚠️ Username must only contain letters (no numbers or special characters).');
    return;
  }

  // ✅ Password validation (minimum 6 characters)
  if (password.length < 6) {
    alert('⚠️ Password must be at least 6 characters long.');
    return;
  }

  if (username && email && password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      alert('⚠️ This email is already registered. Please login instead.');
      return;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('✅ Signup successful! You can now login.');
    signupForm.reset();
  } else {
    alert('⚠️ Please fill in all fields.');
  }
});

// ----------------- Login -----------------
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const savedUser = users.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (savedUser) {
    alert(`🎉 Welcome back, ${savedUser.username}!`);
    loginForm.reset();
    localStorage.setItem("loggedInUser", savedUser.username);
    window.location.href = "index.html";
  } else {
    alert('❌ Invalid email or password.');
  }
});

// ======================= Toggle Forms =======================
var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
  x.style.left = "4px";
  y.style.right = "-520px";
  a.className += " white-btn";
  b.className = "btn";
  x.style.opacity = 1;
  y.style.opacity = 0;
}

function register() {
  x.style.left = "-510px";
  y.style.right = "5px";
  a.className = "btn";
  b.className += " white-btn";
  x.style.opacity = 0;
  y.style.opacity = 1;
}
