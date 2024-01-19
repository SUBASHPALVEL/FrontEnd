let updateUserId;
const token = localStorage.getItem("token");
updateUserId = localStorage.getItem("updateUserId");
let roleIdOptionsFetched = false;
const formContainer = document.getElementById("newUserForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");

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

async function createUser(event) {
  event.preventDefault(); 

  const apiUrl = 'http://127.0.0.1:8080/api/users';

  const roleString = document.getElementById("roleId").value;
  const roleObject = { roleId: parseInt(roleString, 10) };


  const newUserData = {
    userName: document.getElementById("userName").value,
    userMail: document.getElementById("userMail").value,
    password: document.getElementById("password").value,
    roleId: roleObject,
  };


  try {
    await fetch(apiUrl, {
      method: "POST",
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
  
  function cancelUpdate(){
    window.location.href = "../homepage/homepage.html";
  }