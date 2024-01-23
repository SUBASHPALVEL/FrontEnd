const formContainer = document.getElementById("taskCreationForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");

const token = localStorage.getItem("token");

let createdDate = new Date().toISOString().split("T")[0];
let completedDate = null;

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

function createTask(event) {
  event.preventDefault();
  const apiUrl = "http://127.0.0.1:8080/api/tasks";

  const assignedUsersArray = document
    .getElementById("assignedUsers")
    .value.split(",")
    .map((user) => user.trim());

  const priorityString = document.getElementById("priority").value;
  const priorityObject = { priorityId: parseInt(priorityString, 10) };

  const statusString = document.getElementById("status").value;
  const statusObject = { statusId: parseInt(statusString, 10) };

  const today = new Date();
  const createdDate = today.toISOString().split("T")[0];

  const newTask = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,

    status: statusObject,
    priority: priorityObject,

    createdDate: createdDate,

    dueDate: document.getElementById("dueDate").value,
    assignedUsers: assignedUsersArray.map((userId) => {
      return { userId: parseInt(userId) };
    }),
  };

  try {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }).then((response) => {
      if (!response.ok) {
        console.log(response.status);
        showFor4SecondsForFailure();
        throw new Error(`Failed to create task: ${response.status}`);
      }

      console.log("Task created successfully:");
      showFor4SecondsForSuccess();
    });
  } catch (error) {
    console.error("Error creating task:", error);
    showFor4SecondsForFailure();
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

function validateAssignedUsers(input) {
  const userIDs = input.split(",").map((id) => parseInt(id.trim()));

  if (userIDs.some(isNaN)) {
    return null;
  }

  return userIDs.map((id) => ({ userId: id }));
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
