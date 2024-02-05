document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

const formContainer = document.getElementById("taskList");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

async function fetchData() {
  const apiUrl = `http://localhost:8080/api/tasks/user/${userId}`;
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

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
                    <td>${task.createdDate}</td>
                    <td>${task.modifiedDate || "N/A"}</td>
                    <td>${task.dueDate || "N/A"}</td>
                    
                    <td>${task.completedDate || "N/A"}</td>
                    
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

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn")) {
    handleEdit(event);
  } else if (event.target.classList.contains("delete-btn")) {
    handleDelete(event);
  }
});

function handleEdit(event) {
  const updateTaskId = event.target.getAttribute("data-id");
  localStorage.setItem("updateTaskId", updateTaskId);
  window.location.href = "../updateTask/updateTask.html";
}

async function handleDelete(event) {
  const deleteTaskId = event.target.getAttribute("data-id");
  localStorage.setItem("deleteTaskId", deleteTaskId);

  const apiUrl = `http://127.0.0.1:8080/api/tasks/${deleteTaskId}`;

  try {
    await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log(response.status);
        showFor4SecondsForFailure();
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      console.log("User deleted successfully:");
      showFor4SecondsForSuccess();
      console.log("show success:");

      console.log("After fetching");
    });
  } catch (error) {
    console.error("Error updating task:", error);
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
    window.location.href = "../yourTasks/yourTasks.html";
  }, 4000);
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../yourTasks/yourTasks.html";
  }, 4000);
}