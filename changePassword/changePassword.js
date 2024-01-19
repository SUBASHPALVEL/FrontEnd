let updateUserId;
const token = localStorage.getItem("token");

const formContainer = document.getElementById("changePasswordForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");



async function changePassword(event) {
  event.preventDefault();

  const apiUrl = 'http://localhost:8080/api/users/change-password';


  const newUserData = {
    userName: document.getElementById("userName").value,
    oldPassword: document.getElementById("oldPassword").value,
    newPassword: document.getElementById("newPassword").value,
  };


  try {
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    }).then((response) => {
      if (!response.ok) {
        console.log(response.status);
        showFor4SecondsForFailure();
        throw new Error(`Failed to update task: ${response.status}`);
      }

      console.log("Task updated successfully:");
      showFor4SecondsForSuccess();
    });
  } catch (error) {
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
  
  function handleCancel(){
    window.location.href = "../homepage/homepage.html";
  }