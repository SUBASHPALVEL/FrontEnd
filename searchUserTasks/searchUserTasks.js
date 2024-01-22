let updateUserId;
const token = localStorage.getItem("token");

const formContainer = document.getElementById("searchUserTasksForm");
const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");



async function searchUserTasks(event) {
  event.preventDefault();

  const searchUserTasksID = document.getElementById("searchUserTasksID").value;

  localStorage.setItem("searchUserTasksID",searchUserTasksID);

  console.log(searchUserTasksID);

  window.location.href = "../userTasks/userTasks.html";

}

  
  function handleCancel(){
    window.location.href = "../homepage/homepage.html";
  }