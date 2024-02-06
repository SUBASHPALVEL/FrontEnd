let updateUserId;
const token = localStorage.getItem("token");
updateUserId = localStorage.getItem("updateUserId");
let roleIdOptionsFetched = false;
let userDetailsFetched = false;

const formContainer = document.getElementById("userUpdateForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

if (!roleIdOptionsFetched) {
  fetchRoleIdOptions();
  roleIdOptionsFetched = true;
}

if (!userDetailsFetched) {
  fetchUserDetails(updateUserId);
  userDetailsFetched = true;
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

async function updateUser(event) {
  event.preventDefault();

  const apiUrl = `http://127.0.0.1:8080/api/users/${updateUserId}`;

  const roleString = document.getElementById("roleId").value;
  const roleObject = { roleId: parseInt(roleString, 10) };

  const updatedUserData = {
    name: document.getElementById("name").value,
    userName: document.getElementById("userName").value,
    userMail: document.getElementById("userMail").value,
    roleId: roleObject,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    showFor4SecondsForSuccess();
  } catch (error) {
    let errorCode = "User Updation Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

async function fetchUserDetails(updateUserId) {
  const apiUrl = `http://127.0.0.1:8080/api/users/${updateUserId}`;

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

    const userData = await response.json();

    document.getElementById("name").value = userData.name;
    document.getElementById("userName").value = userData.userName;
    document.getElementById("userMail").value = userData.userMail;
    document.getElementById("roleId").value = userData.roleId.roleId;
  } catch (error) {
    let errorCode = "Fetching User Detail Failed";
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
    window.location.href = "../allUsers/allUsers.html";
  }, 4000);
}

function cancelUpdate() {
  window.location.href = "../allUsers/allUsers.html";
}
