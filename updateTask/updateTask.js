const token = localStorage.getItem("token");
const updateTaskId = localStorage.getItem("updateTaskId");

let statusOptionsFetched = false;
let priorityOptionsFetched = false;
let TaskDetailsFetched = false;
let previousPage = document.referrer;

const formContainer = document.getElementById("taskUpdateForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

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
      const errorMessage = await response.text();
      throw new Error(errorMessage);
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
    let errorCode = "Fetching Status Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
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
      const errorMessage = await response.text();
      throw new Error(errorMessage);
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
    let errorCode = "Fetching Priority Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}

function validateAssignedUsers(input) {
  const userIDsStr = input.trim().split(",");
  try {
    if (userIDsStr.length === 0 || userIDsStr.every((id) => id === "")) {
      throw new Error("Enter Value For Assigned Users");
    }

    const userIdRegex = /^\d+$/;
    const invalidUserIDs = userIDsStr.filter(
      (id) => !userIdRegex.test(id.trim())
    );

    if (invalidUserIDs.length > 0) {
      throw new Error("Invalid Value For Assigned Users");
    }

    const userIDs = userIDsStr.map((id) => parseInt(id.trim()));

    if (userIDs.some((id) => isNaN(id))) {
      throw new Error("Invalid User ID Format For Assigned Users");
    }

    return true;
  } catch (error) {
    let errorCode = "Task Creation Failed";
    errorCodeElement.innerHTML = errorCode;
    errorElement.innerText = error.message;
    showFor4SecondsForFailure();
  }
}



async function updateTask(event) {
  event.preventDefault();

  const isValidAssignedUsersArray = await validateAssignedUsers(
    document.getElementById("assignedUsers").value
  );
  console.log(isValidAssignedUsersArray);

  if (isValidAssignedUsersArray) {
    const apiUrl = `http://127.0.0.1:8080/api/tasks/${updateTaskId}`;

    const assignedUsersArray = document
      .getElementById("assignedUsers")
      .value.split(",")
      .map((user) => user.trim());

    const priorityString = document.getElementById("priority").value;
    const priorityObject = { priorityId: parseInt(priorityString, 10) };

    const statusString = document.getElementById("status").value;
    const statusObject = { statusId: parseInt(statusString, 10) };

    const updatedTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,

      status: statusObject,
      priority: priorityObject,

      dueAt: document.getElementById("dueDate").value,
      assignedUsers: assignedUsersArray.map((userId) => {
        return { userId: parseInt(userId) };
      }),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      showFor4SecondsForSuccess();
    } catch (error) {
      let errorCode = "Task Updation Failed";
      errorCodeElement.innerHTML = errorCode;
      errorElement.innerText = error.message;
      showFor4SecondsForFailure();
    }
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
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const taskData = await response.json();

    document.getElementById("title").value = taskData.title;
    document.getElementById("description").value = taskData.description;
    document.getElementById("status").value = taskData.status.statusId;
    document.getElementById("priority").value = taskData.priority.priorityId;
    document.getElementById("dueDate").value = taskData.dueAt;
    document.getElementById("assignedUsers").value = taskData.assignedUsers
      .map((user) => user.userId)
      .join(" ,");
  } catch (error) {
    let errorCode = "Fetching Task Details Failed";
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
