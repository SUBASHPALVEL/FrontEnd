document.addEventListener('DOMContentLoaded', function () {

    fetchData();
  });
  
      async function fetchData() {
        const apiUrl = 'http://localhost:8080/api/tasks';
        const token = localStorage.getItem('token');
    
        try {
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          populateTable(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    
      // Function to populate the table with data
  
    
      function populateTable(data) {
  
          const tableBody = document.getElementById('task-table-body');
      
          if(data.length==0){
              
          document.querySelector(".no-Data").style.display = "block";
          }else{
  
              data.forEach(task =>{
      
                  const row = document.createElement('tr');
                  row.innerHTML = `
                      <td>${task.taskId}</td>
                      <td>${task.title}</td>
                      <td>${task.description}</td>
                      <td>${task.priority.priorityStatus}</td>
                      <td>${task.status.statusLevel}</td>
                      <td>${task.createdDate}</td>
                      <td>${task.modifiedDate || 'N/A'}</td>
                      <td>${task.dueDate || 'N/A'}</td>
                      
                      <td>${task.completedDate || 'N/A'}</td>
                      
                      <td>${task.assignedUsers.map(user => user.userName).join(', ')}</td>
                      <td><span class="edit-btn" data-id="${task.taskId}">Edit</span></td>
                      <td><span class="delete-btn" data-id="${task.taskId}">Delete</span></td>
          
                  `;
                  tableBody.appendChild(row);
          
          
              })
  
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
    localStorage.setItem("updateUserId",updateUserId);
    window.location.href = "../updateUser/updateUser.html";
  }
  
  // Handle delete button click
 async function handleDelete(event) {
    const deleteUserId = event.target.getAttribute("data-id");
    localStorage.setItem("deleteTaskId",deleteTaskId);

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




  // Handle logout button click
    function handleLogout() {
        window.location.href = "../Login/Loginmain.html";
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