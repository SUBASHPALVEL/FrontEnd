let updateUserId;
const token = localStorage.getItem("token");
updateUserId = localStorage.getItem("updateUserId");
let roleIdOptionsFetched = false;
let userDetailsFetched = false;

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
      throw new Error(`Failed to fetch status options: ${response.status}`);
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
    console.error("Error fetching status options:", error);
  }
}

async function updateUser() {
  const apiUrl = `http://127.0.0.1:8080/api/users/${updateUserId}`;

  const roleString = document.getElementById("roleId").value;
  const roleObject = { roleId: parseInt(roleString, 10) };

  const updatedUserData = {
    userName: document.getElementById("userName").value,
    userMail: document.getElementById("userMail").value,
    password: document.getElementById("password").value,

    roleId: roleObject,
  };

  console.log(updatedUserData);

  try {
    await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    }).then((response) => {
      if (!response.ok) {
        console.log(response.status);
        showFor4SecondsForFailure();
        throw new Error(`Failed to update task: ${response.status}`);
      }

      console.log("Task updated successfully:", updatedUserData);
      showFor4SecondsForSuccess();
      console.log("show success:");

      console.log("After fetching");
    });
  } catch (error) {
    console.error("Error updating task:", error);
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
      throw new Error(`Failed to fetch task details: ${response.status}`);
    }

    const userData = await response.json();

    // Populate form fields with task details
    document.getElementById("userId").value = userData.userId;
    document.getElementById("userName").value = userData.userName;
    document.getElementById("userMail").value = userData.userMail;
    document.getElementById("password").value = userData.password;
    document.getElementById("roleId").value = userData.roleId.roleId;
  } catch (error) {
    console.error("Error fetching task details:", error);
  }
}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    //   window.location.href = "../userTasks/userTasks.html";
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
