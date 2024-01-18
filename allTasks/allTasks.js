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
    

