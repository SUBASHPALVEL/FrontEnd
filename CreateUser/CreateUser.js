let updateUserId;
const token = localStorage.getItem("token");
updateUserId = localStorage.getItem("updateUserId");
let roleIdOptionsFetched = false;

const formContainer = document.getElementById("newUserForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

if (!roleIdOptionsFetched) {
  fetchRoleIdOptions();
  roleIdOptionsFetched = true;
}

async function fetchRoleIdOptions() {
  const apiUrl = "http://127.0.0.1:8080/api/roles";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const roleData = await response.json();
    const roleSelect = document.getElementById("roleId");

    roleData.forEach((role) => {
      const option = document.createElement("option");
      option.value = role.roleId;
      option.textContent = role.designation;
      roleSelect.appendChild(option);
    });
  } catch (error) {
    let errorCode = "Fetching Roles Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

async function createUser(event) {
  event.preventDefault();

  const apiUrl = "http://127.0.0.1:8080/api/users";

  const roleString = document.getElementById("roleId").value;
  const roleObject = { roleId: parseInt(roleString, 10) };

  const newUserData = {
    name:document.getElementById("name").value,
    userName: document.getElementById("userName").value,
    userMail: document.getElementById("userMail").value,
    password: document.getElementById("password").value,
    roleId: roleObject,
  };


  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    showFor4SecondsForSuccess();
  } catch (error) {
    let errorCode = "User Creation Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }

}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../allUsers/allUsers.html";
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
  window.location.href = "../homepage/homepage.html";
}