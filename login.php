<?php include "header.php" ?>
<div class="container d-flex justify-content-center align-items-center vh-100">
  <div class="card shadow-lg" style="width: 400px;">
    <div class="card-body">
      <h2 id="form-title" class="text-center mb-4">Signup</h2>

      <!-- Signup Form -->
      <form id="signup-form">
        <div class="mb-3">
          <label for="signup-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="signup-email" placeholder="Enter your email" required>
        </div>
        <div class="mb-3">
          <label for="signup-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="signup-password" placeholder="Enter your password" required>
        </div>
        <div class="mb-3">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="confirm-password" placeholder="Confirm your password" required>
        </div>
        <button type="button" class="btn btn-primary w-100 mb-3" onclick="signup()">Signup</button>
        <p class="text-center">
          Already have an account? 
          <a href="#" class="text-primary text-decoration-none" onclick="toggleForm()">Login</a>
        </p>
      </form>

      <!-- Login Form -->
      <form id="login-form" style="display: none;">
        <div class="mb-3">
          <label for="login-email" class="form-label">Email</label>
          <input type="email" class="form-control" id="login-email" placeholder="Enter your email" required>
        </div>
        <div class="mb-3">
          <label for="login-password" class="form-label">Password</label>
          <input type="password" class="form-control" id="login-password" placeholder="Enter your password" required>
        </div>
        <button type="button" class="btn btn-primary w-100 mb-3" onclick="login()">Login</button>
        <p class="text-center">
          Don't have an account? 
          <a href="#" class="text-primary text-decoration-none" onclick="toggleForm()">Signup</a>
        </p>
      </form>

      <!-- Logout Button -->
      <button id="logout-btn" class="btn btn-danger w-100 mt-3" style="display: none;" onclick="logout()">Logout</button>
    </div>
  </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
  // Function to toggle between signup and login forms
  function toggleForm() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const formTitle = document.getElementById('form-title');
    const logoutBtn = document.getElementById('logout-btn');
    
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    logoutBtn.style.display = 'none';
    formTitle.textContent = signupForm.style.display === 'block' ? 'Signup' : 'Login';
  }

  // Mock data storage
  let users = {};

  // Signup function
  function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (users[email]) {
      alert('User already exists!');
      return;
    }

    users[email] = password;
    alert('Signup successful! Please login.');
    toggleForm();
  }

  // Login function
  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (users[email] && users[email] === password) {
      alert('Login successful!');
      // Store the login state in localStorage
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('loggedInUser', email);
      window.location.href = "post.php";
      checkLoginState();
    } else {
      alert('Invalid email or password!');
    }
  }

  // Logout function
  function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out!');
    window.location.reload();
  }

  // Check login state on page load
  function checkLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUser = localStorage.getItem('loggedInUser');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const formTitle = document.getElementById('form-title');

    if (isLoggedIn) {
      alert(`Welcome back, ${loggedInUser}!`);
      signupForm.style.display = 'none';
      loginForm.style.display = 'none';
      logoutBtn.style.display = 'block';
      formTitle.textContent = `Welcome, ${loggedInUser}`;
    } else {
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
      logoutBtn.style.display = 'none';
      formTitle.textContent = 'Signup';
    }
  }

  // Initialize login state on page load
  document.addEventListener('DOMContentLoaded', checkLoginState);
</script>

<?php include "footer.php" ?>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, cumque!
