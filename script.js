// Get the signup form and submit button
const signupForm = document.getElementById('signup-form');
const submitButton = document.getElementById('signup-submit');

// Get the profile fields and logout button
const nameField = document.getElementById('profile-name');
const emailField = document.getElementById('profile-email');
const passwordField = document.getElementById('profile-password');
const logoutButton = document.getElementById('logout-button');

// Check if user is already authenticated
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  // Redirect to profile page
  window.location.href = './profile.html';
}

// Handle signup form submission
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate form data
  let isValid = true;
  if (!name) {
    showError('Please enter your name.');
    isValid = false;
  }
  if (!email) {
    showError('Please enter your email.');
    isValid = false;
  }
  if (!password) {
    showError('Please enter your password.');
    isValid = false;
  }

  // If form data is valid, save user to local storage and redirect to profile page
  if (isValid) {
    const user = { name, email, password, accessToken: generateAccessToken() };
    localStorage.setItem('user', JSON.stringify(user));
    showSuccess('User created successfully.');
    window.location.href = './profile.html';
  }
});

// Handle logout button click
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  window.location.href = './index.html';
});

// Generate a random access token
function generateAccessToken() {
  const tokenLength = 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  localStorage.setItem('accessToken', token);
  return token;
}

// Show success message
function showSuccess(message) {
  const alert = document.getElementById('alert');
  alert.innerHTML = message;
  alert.classList.remove('alert-danger');
  alert.classList.add('alert-success');
}

// Show error message
function showError(message) {
  const alert = document.getElementById('alert');
  alert.innerHTML = message;
  alert.classList.remove('alert-success');
  alert.classList.add('alert-danger');
}

// Check if user is authenticated and redirect to appropriate page
function checkAuth() {
  const accessToken = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  if (!accessToken || !user) {
    window.location.href = './index.html';
  } else {
    const { name, email, password } = JSON.parse(user);
    nameField.innerText = `Name: ${name}`;
    emailField.innerText = `Email: ${email}`;
    passwordField.innerText = `Password: ${password}`;
  }
}

// Check if user is authorized to access current page
function checkAuthorization() {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const currentPage = window.location.pathname;
    if (currentPage === './index.html') {
      window.location.href = './profile.html';
    }
  } else {
    const currentPage = window.location.pathname;
    if (currentPage === './profile.html') {
      window.location.href = './index.html';
    }
  }
}

// Call checkAuth and checkAuthorization on page load
checkAuth();
checkAuthorization();
