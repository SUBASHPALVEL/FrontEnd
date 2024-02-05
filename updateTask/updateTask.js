const token = localStorage.getItem("token");
const updateTaskId = localStorage.getItem("updateTaskId");
let statusOptionsFetched = false;
let priorityOptionsFetched = false;
let TaskDetailsFetched = false;
const formContainer = document.getElementById("taskUpdateForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
let previousPage = document.referrer;

if (!statusOptionsFetched) {
  fetchStatusOptions();
  statusOptionsFetched = true;
}

if (!priorityOptionsFetched) {
  fetchPriorityOptions();
  priorityOptionsFetched = true;
}

if (!TaskDetailsFetched) {
  fetchTaskDetails(updateTaskId);
  TaskDetailsFetched = true;
}

async function fetchStatusOptions() {
  const apiUrl = "http://127.0.0.1:8080/api/status";

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

    const statusData = await response.json();
    const statusSelect = document.getElementById("status");

    statusData.forEach((status) => {
      const option = document.createElement("option");
      option.value = status.statusId;
      option.textContent = status.statusLevel;
      statusSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching status options:", error);
  }
}

async function fetchPriorityOptions() {
  const apiUrl = "http://127.0.0.1:8080/api/priorities";

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

    const priorityData = await response.json();
    const prioritySelect = document.getElementById("priority");

    priorityData.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority.priorityId;
      option.textContent = priority.priorityStatus;
      prioritySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching status options:", error);
  }
}

async function updateTask(event) {
  event.preventDefault();

  const apiUrl = `http://127.0.0.1:8080/api/tasks/${updateTaskId}`;

  const assignedUsersArray = document
    .getElementById("assignedUsers")
    .value.split(",")
    .map((user) => user.trim());

  const priorityString = document.getElementById("priority").value;
  const priorityObject = { priorityId: parseInt(priorityString, 10) };

  const statusString = document.getElementById("status").value;
  const statusObject = { statusId: parseInt(statusString, 10) };

  const today = new Date();
  const modifiedDate = today.toISOString().split("T")[0];

  const updatedTask = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,

    status: statusObject,
    priority: priorityObject,

    modifiedDate: modifiedDate,

    dueDate: document.getElementById("dueDate").value,
    completedDate: document.getElementById("completedDate").value,
    assignedUsers: assignedUsersArray.map((userId) => {
      return { userId: parseInt(userId) };
    }),
  };

  console.log(updatedTask);

  try {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
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

async function fetchTaskDetails(updateTaskId) {
  const apiUrl = `http://127.0.0.1:8080/api/tasks/${updateTaskId}`;

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

    const taskData = await response.json();

    document.getElementById("taskId").value = taskData.taskId;
    document.getElementById("title").value = taskData.title;
    document.getElementById("description").value = taskData.description;
    document.getElementById("status").value = taskData.status.statusId;
    document.getElementById("priority").value = taskData.priority.priorityId;
    document.getElementById("dueDate").value = taskData.dueDate;
    document.getElementById("completedDate").value = taskData.completedDate;
    document.getElementById("assignedUsers").value = taskData.assignedUsers
      .map((user) => user.userId)
      .join(" ,");
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

    if (previousPage.includes("yourTasks/yourTasks.html")) {
      window.location.href = "../yourTasks/yourTasks.html";
    } else if (previousPage.includes("allTasks/allTasks.html")) {
      window.location.href = "../allTasks/allTasks.html";
    } else {
      window.location.href = "../homepage/homepage.html";
    }
  }, 4000);
}

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
    if (previousPage.includes("yourTasks/yourTasks.html")) {
      window.location.href = "../yourTasks/yourTasks.html";
    } else if (previousPage.includes("allTasks/allTasks.html")) {
      window.location.href = "../allTasks/allTasks.html";
    } else if (previousPage.includes("userTasks/userTasks.html")) {
      window.location.href = "../userTasks/userTasks.html";
    } else {
      window.location.href = "../homepage/homepage.html";
    }
  }, 4000);
}

function cancelUpdate() {
  if (previousPage.includes("yourTasks/yourTasks.html")) {
    window.location.href = "../yourTasks/yourTasks.html";
  } else if (previousPage.includes("allTasks/allTasks.html")) {
    window.location.href = "../allTasks/allTasks.html";
  } else if (previousPage.includes("userTasks/userTasks.html")) {
    window.location.href = "../userTasks/userTasks.html";
  } else {
    window.location.href = "../homepage/homepage.html";
  }
}
