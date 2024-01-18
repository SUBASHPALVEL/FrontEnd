const formContainer = document.getElementById("taskCreationForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");

const token = localStorage.getItem('token');

let createdDate= new Date().toISOString().split("T")[0];
let completedDate= null;

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
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const assignedUsersInput = document.getElementById("assignedUsers").value;

  const assignedUsers = validateAssignedUsers(assignedUsersInput);
  if (!assignedUsers) {
    
    showFor4SecondsForFailure();
    console.log("NO ASSIGNED");
    
  } else 

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description,status ,
        priority,dueDate,createdDate,completedDate ,assignedUsers}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.taskId == undefined) {
          showFor4SecondsForFailure();
          // resetForm();
          console.log("failure");
        } else {
          showFor4SecondsForSuccess();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
  
      // Populate the status dropdown with options from the API
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
  
      // Populate the status dropdown with options from the API
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