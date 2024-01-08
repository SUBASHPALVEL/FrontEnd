const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");

let createdDate= new Date().toISOString().split("T")[0];
let completedDate= null;

function createTask() {
  const apiUrl = "http://127.0.0.1:8080/api/tasks";
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const assignedUsersInput = document.getElementById("assignedUsers").value;

  // Validate assignedUsers input
  const assignedUsers = validateAssignedUsers(assignedUsersInput);
  if (!assignedUsers) {
    // Show an error message and return from the function
    showFor4SecondsForFailure();
    console.log("NO ASSIGNED");
    
  } else 
    //   requestBody = {
    //   title: title,
    //   description: description,
    //   status: status,
    //   priority: priority,
    //   dueDate: dueDate,
    //   createdDate: new Date().toISOString().split("T")[0],
    //   completedDate: null,
    //   assignedUsers: assignedUsers,
    // };

    // console.log(requestBody);

    fetch(apiUrl, {
      method: "POST",
      headers: {
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

function validateAssignedUsers(input) {
  // Split the input into an array of user IDs
  const userIDs = input.split(",").map((id) => parseInt(id.trim()));

  // Check if any user ID is not a valid number
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
    window.location.href = "";
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
