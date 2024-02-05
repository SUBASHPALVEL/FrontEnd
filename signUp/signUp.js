let updateUserId;
updateUserId = localStorage.getItem("updateUserId");
const formContainer = document.getElementById("newUserForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById('errorMessage');

async function createUser(event) {
  event.preventDefault();

  const apiUrl = "http://127.0.0.1:8080/auth/admin";

  const newUserData = {
    name:document.getElementById("name").value,
    userName: document.getElementById("userName").value,
    userMail: document.getElementById("userMail").value,
    password: document.getElementById("password").value,
  };


  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  
    console.log("Task updated successfully:");
    showFor4SecondsForSuccess();
  } catch (error) {
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
    console.error("Error updating task:", error);
    showFor4SecondsForFailure();
  }

}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../login/login.html";
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

function handleCancel() {
  window.location.href = "../login/login.html";
}