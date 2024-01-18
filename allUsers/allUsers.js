document.addEventListener('DOMContentLoaded', function () {

  fetchData();
});

    const token = localStorage.getItem('token');
    async function fetchData() {
      const apiUrl = 'http://localhost:8080/api/users';
      
  
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

  
    function populateTable(data) {

        const tableBody = document.getElementById('user-table-body');
    
        if(data.length==0){
            
        document.querySelector(".no-Data").style.display = "block";
        }else{

            data.forEach(user =>{
    
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.userName}</td>
                    <td>${user.userMail}</td>
                    <td>${user.roleId.designation}</td>
                    
                    <td><span class="edit-btn" data-id="${user.userId}">Edit</span></td>
                    <td><span class="delete-btn" data-id="${user.userId}">Delete</span></td>
        
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
  function handleDelete(event) {

  }

function handleHome() {
  window.location.href = "../homepage/homepage.html";
}




  // Handle logout button click
    function handleLogout() {
        window.location.href = "../Login/Loginmain.html";
        localStorage.clear();
      }