const loginButton = document.querySelector("#submitButton");
const userNameError = document.querySelector("#userNameError");
const passwordError = document.querySelector("#passwordError");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");

let userName;
let password;

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Capture userName and password input values
  userName = document.getElementById("UserName").value;
  password = document.getElementById("Password").value;

  // Validate userName and password
  if (!userName.trim() && !password.trim()) {
    passwordError.textContent = "Password is required";
    userNameError.textContent = "User Name is required";
  } else {
    login();
  }
});

function login() {


  fetch('http://127.0.0.1:8080/auth/admin/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, password }),
  })
  .then(response => response.json())
  .then(data => {
      // Handle the response from the server
      if (data.userId == undefined) {
          console.log("No user");
          showFor4SecondsForFailure();
          resetForm();
    } else {
          localStorage.setItem("userId",data.userId);
          localStorage.setItem("token",data.token);
          showFor4SecondsForSuccess();
       
          
      
    }
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
    resetForm();
    window.location.href = "../userTasks/userTasks.html";
  }, 4000);
 
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
  }, 4000);
  
}

function resetForm() {
  document.getElementById("loginForm").reset();
}


