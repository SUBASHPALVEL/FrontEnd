const formContainer = document.getElementById("taskCreationForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const errorElement = document.getElementById("errorMessage");
const errorCodeElement = document.getElementById("errorCode");

const token = localStorage.getItem("token");

let statusOptionsFetched = false;
let priorityOptionsFetched = false;

if (!statusOptionsFetched) {
  fetchStatusOptions();
  statusOptionsFetched = true;
}

if (!priorityOptionsFetched) {
  fetchPriorityOptions();
  priorityOptionsFetched = true;
}

async function createTask(event) {
  event.preventDefault();

  const isValidAssignedUsersArray = await validateAssignedUsers(
    document.getElementById("assignedUsers").value
  );
  console.log(isValidAssignedUsersArray);

  if (isValidAssignedUsersArray) {
    const apiUrl = "http://127.0.0.1:8080/api/tasks";

    const assignedUsersArray = document
      .getElementById("assignedUsers")
      .value.split(",")
      .map((user) => user.trim());

    const priorityString = document.getElementById("priority").value;
    const priorityObject = { priorityId: parseInt(priorityString, 10) };

    const statusString = document.getElementById("status").value;
    const statusObject = { statusId: parseInt(statusString, 10) };

    const newTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,

      status: statusObject,
      priority: priorityObject,

      dueAt: document.getElementById("dueDate").value,
      assignedUsers: assignedUsersArray.map((userId) => {
        return { userId: parseInt(userId) };
      }),
    };
    console.log(newTask);
    console.log("subash");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      showFor4SecondsForSuccess();
    } catch (error) {
      let errorCode = "Task Creation Failed";
      errorCodeElement.innerHTML = errorCode;
      errorElement.innerText = error.message;
      showFor4SecondsForFailure();
    }
  }
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

function showFor4SecondsForSuccess() {
  formContainer.style.opacity = "0.5";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
    formContainer.style.opacity = "1";
    resetForm();
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

function resetForm() {
  document.getElementById("taskCreationForm").reset();
}

function handleCancel() {
  window.location.href = "../homepage/homepage.html";
}
