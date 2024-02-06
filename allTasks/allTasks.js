document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

const formContainer = document.getElementById("taskList");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

const token = localStorage.getItem("token");

async function fetchData() {
  const apiUrl = "http://localhost:8080/api/tasks";
  const token = localStorage.getItem("token");

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
    let errorCode = "Fetching Tasks Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

// Function to populate the table with data

function populateTable(data) {
  const tableBody = document.getElementById("task-table-body");

  if (data.length == 0) {
    document.querySelector(".no-Data").style.display = "block";
  } else {
    data.forEach((task) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                      <td>${task.taskId}</td>
                      <td>${task.title}</td>
                      <td>${task.description}</td>
                      <td>${task.priority.priorityStatus}</td>
                      <td>${task.status.statusLevel}</td>
                      <td>${new Date(task.createdAt).toLocaleDateString()}</td>
                      <td>${task.lastModifiedAt ? new Date(task.lastModifiedAt).toLocaleDateString() : "N/A"}</td>
                      <td>${task.dueAt ? new Date(task.dueAt).toLocaleDateString() : "N/A"}</td>
                      <td>${task.completedAt ? new Date(task.completedAt).toLocaleDateString() : "N/A"}</td>
                      
                      <td>${task.assignedUsers
                        .map((user) => user.userName)
                        .join(", ")}</td>
                      <td><span class="edit-btn" data-id="${
                        task.taskId
                      }">Edit</span></td>
                      <td><span class="delete-btn" data-id="${
                        task.taskId
                      }">Delete</span></td>
          
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
  const updateTaskId = event.target.getAttribute("data-id");
  localStorage.setItem("updateTaskId", updateTaskId);
  window.location.href = "../updateTask/updateTask.html";
}

// Handle delete button click
async function handleDelete(event) {
  const deleteTaskId = event.target.getAttribute("data-id");
  localStorage.setItem("deleteTaskId", deleteTaskId);

  const apiUrl = `http://127.0.0.1:8080/api/tasks/${deleteTaskId}`;

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
    let errorCode = "Task Deletion Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }

}

function handleHome() {
  window.location.href = "../homepage/homepage.html";
}


function handleLogout() {
  window.location.href = "../login/login.html";
  localStorage.clear();
}

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../allTasks/allTasks.html";
  }, 4000);
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../allTasks/allTasks.html";
  }, 4000);
}
