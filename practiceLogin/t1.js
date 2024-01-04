const loginButton = document.querySelector("#submitButton");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");

let usermail;
let password;

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Capture email and password input values
  usermail = document.getElementById("Email").value;
  password = document.getElementById("Password").value;

  // Validate email and password
  if (!usermail.trim() && !password.trim()) {
    passwordError.textContent = "Password is required";
    emailError.textContent = "Email is required";
  } else {
    // Send login request to the server
    login();
    const userId = localStorage.getItem("userId");
    if (userId !== undefined) {
        showFor4SecondsForSuccess();
        resetForm();
      // Handle successful login, e.g., redirect to a different page
        window.location.href = "../userTasks/userTasks.html";
  } else {
    showFor4SecondsForFailure();
    resetForm();
  }
  }

function login() {
  const usermail = document.getElementById('usermail').value;
  const password = document.getElementById('password').value;

  // Assuming you have a server endpoint at http://localhost:8080/api/users/login
  fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usermail, password }),
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response from the server
      console.log(data.userId);
      localStorage.setItem("userId",data.userId);
      // You can redirect or perform other actions based on the response
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
  }, 3000);
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
  }, 3000);
}

function resetForm() {
  document.getElementById("loginForm").reset();
  emailInputValue = undefined;
  passwordInputValue = undefined;
}
}
