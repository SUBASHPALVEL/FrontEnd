document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

const formContainer = document.getElementById("userList");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

const token = localStorage.getItem("token");
async function fetchData() {
  const apiUrl = "http://localhost:8080/api/users";

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

    const data = await response.json();
    populateTable(data);
  } catch (error) {
    let errorCode = "Fetching Users Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

function populateTable(data) {
  const tableBody = document.getElementById("user-table-body");

  if (data.length == 0) {
    document.querySelector(".no-Data").style.display = "block";
  } else {
    data.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.name}</td>
                    <td>${user.userName}</td>
                    <td>${user.userMail}</td>
                    <td>${user.roleId.designation}</td>
                    
                    <td><span class="edit-btn" data-id="${user.userId}">Edit</span></td>
                    <td><span class="delete-btn" data-id="${user.userId}">Delete</span></td>
        
                `;
      tableBody.appendChild(row);
    });
  }
}

// Attach event listener to "Edit" button and "Delete" button
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    handleEdit(event);
  } else if (event.target.classList.contains("delete-btn")) {
    handleDelete(event);
  }
});

// Handle edit button click
function handleEdit(event) {
  const updateUserId = event.target.getAttribute("data-id");
  localStorage.setItem("updateUserId", updateUserId);
  window.location.href = "../updateUser/updateUser.html";
}

// Handle delete button click
async function handleDelete(event) {
  const deleteUserId = event.target.getAttribute("data-id");
  localStorage.setItem("deleteUserId", deleteUserId);

  const apiUrl = `http://127.0.0.1:8080/api/users/${deleteUserId}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    showFor4SecondsForSuccess();
  } catch (error) {
    let errorCode = "User Deletion Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

function handleHome() {
  window.location.href = "../homepage/homepage.html";
}

// Handle logout button click
function handleLogout() {
  localStorage.clear();
  window.location.href = "../login/login.html";
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
