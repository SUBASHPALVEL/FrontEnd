document.addEventListener('DOMContentLoaded', function () {

    // Function to make API request
    async function fetchData() {
      const apiUrl = 'http://127.0.0.1:8080/tasks';
      const token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic3ViYSIsImlhdCI6MTcwNTM5NDY3Nywicm9sZXMiOiJST0xFX0FETUlOIn0.FN1dV7Tu27C0ItF1alH9IJpy6hnnslSlO8tHG_AoTsGfZMkXukmpA3Xg2QCzs3jysk5YryovXqWBE41hnWJPyIcbGrTygtO0tSuV2_XChOv2JJjjwXsqI8Q6M70etHqzf6QSiyoBJO1F8L6inzk3Lc2szKu6wzALhTcl8YsnJ5uOfW3x5wisHmHsdNOoEpMzb22b8q4LqLQuTALCMFeZZIcQCw1qMN928KzMeeYvGWQA6LsV93GNj517Y3yvN_I5kHxAc2sNfgNWXM7q1zjZz1CdxBoMpDzE6hLluU8iS9uECi8uR5zdlvkph3Jfot3pUnvJ7ifDLyi5wpbRCf5ZCQ';
  
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
                    <td>${task.status.statusLevel}</td>
                    <td>${task.priority.priorityStatus}</td>
                    <td>${task.dueDate || 'N/A'}</td>
                    <td>${task.createdDate}</td>
                    <td>${task.completedDate || 'N/A'}</td>
                    <td>${task.modifiedDate || 'N/A'}</td>
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
    console.log("Inside edit button");
    const taskId = event.target.getAttribute("data-id");
    console.log(taskId);


    const students = JSON.parse(localStorage.getItem("students"));

    const studentIndex = response.findIndex((s) => s.taskId === taskId);
    console.log(studentIndex);


    if (studentIndex !== -1) {
      const student = students[studentIndex];
  
      // Display an edit form
      const editForm = `
              <td><input type="text" id="edit-name" value="${student.name}" /></td>
              <td><input type="number" id="edit-age" value="${student.age}" /></td>
              <td><input type="text" id="edit-grade" value="${student.grade}" /></td>
              <td>
                  <button class="save-btn" data-index="${studentIndex}">Save</button>
                  <button class="cancel-btn">Cancel</button>
              </td>
          `;
  
      const row = event.target.parentNode.parentNode;
      row.innerHTML = editForm;
  
      const saveButton = row.querySelector(".save-btn");
      const cancelButton = row.querySelector(".cancel-btn");
  
      saveButton.addEventListener("click", () => {
        const updatedStudent = {
          id: student.id,
          name: document.querySelector("#edit-name").value,
          age: parseInt(document.querySelector("#edit-age").value),
          grade: document.querySelector("#edit-grade").value,
        };
  
        students[studentIndex] = updatedStudent;
        localStorage.setItem("students", JSON.stringify(students));
  
        displayStudents(students);
      });
  
      cancelButton.addEventListener("click", () => {
        displayStudents(students);
      });
    }
  }
  
  // Handle delete button click
  function handleDelete(event) {
    const studentId = event.target.getAttribute("data-id");
    let students = JSON.parse(localStorage.getItem("students"));
    const studentIndex = students.findIndex(
      (student) => student.name === studentId
    );
  
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      localStorage.setItem("students", JSON.stringify(students));
      displayStudents(students);
    }
  }










    function handleLogout() {
        window.location.href = "../Login/Loginmain.html";
        localStorage.clear();
      }





    
  
    // Call the fetchData function when the page is loaded
    fetchData();
  });
  