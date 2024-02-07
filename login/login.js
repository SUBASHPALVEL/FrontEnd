const loginButton = document.querySelector("#submitButton");
const userNameError = document.querySelector("#userNameError");
const passwordError = document.querySelector("#passwordError");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");
const errorElement = document.getElementById('errorMessage');

let userName;
let password;

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  userName = document.getElementById("UserName").value;
  password = document.getElementById("Password").value;

  if (!userName.trim() && !password.trim()) {
    passwordError.textContent = "Password is required";
    userNameError.textContent = "User Name is required";
  } else {
    login();
  }
});

async function login() {


  const apiUrl = "http://127.0.0.1:8080/auth/admin/login";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
    let data= await response.json();
    if (data.userId == undefined) {
      resetForm();
      throw new Error("Invalid user");
    } else {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.roleId.designation);
      showFor4SecondsForSuccess();
    }



  } catch (error) {
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
    console.error("Error updating task:", error);
  }

}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    resetForm();
    window.location.href = "../homepage/homepage.html";
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