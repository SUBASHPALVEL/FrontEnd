


const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic2siLCJpYXQiOjE3MDU0NjgxNjgsInJvbGVzIjoiUk9MRV9BRE1JTiJ9.LqOjbmHG0QTdywj77Il9l1RTP2t0-9Y7el86FXn7Gz6VWAgv74sYgvg9hj9Tqh4sEEdRNGEJYnG4fkIxQKqemzN7pakp8YmWwv2CQdUKWGoOEXF2niIuC0SCE3bXk0dpBAU678oyMu5dWBISOKQCJtYsSTxcBBumKsDE6GXBG9XUNwpU6dOkgpb4nx-88-SEHD2nm-lhENOmG3C8xXaiQBEHH0uGN0ny7GLdyEmfnz29WCc2jBkeXlvojvY_e5WoOajd5n53sg7YRcEbrtoYLr3sL_qQi26oFtAle3EJobDw6D9J56oTb5FIUJrJyecII5dXvEqTf6unsyLjSFr7tQ"; // Replace with your actual bearer token


async function fetchRoleIdOptions() {
    
    const apiUrl = "http://127.0.0.1:8080/api/roles";

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch status options: ${response.status}`);
        }

        const roleData = await response.json();
        const roleSelect = document.getElementById("roleId");

        // Populate the status dropdown with options from the API
        roleData.forEach(role => {
            const option = document.createElement("option");
            option.value = role.roleId;
            option.textContent = role.designation;
            roleSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching status options:", error);
    }
}


fetchRoleIdOptions();






































// Function to update task details
async function updateTask() {
const token = "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoic2siLCJpYXQiOjE3MDU0MTA2MDgsInJvbGVzIjoiUk9MRV9BRE1JTiJ9.zMOnasBmirIVXSOSxSPOqqWttuomlqmY9XLcst22QcS8_n2tcgG4dTgk_aNwVrwcgsNV4_WS3wMdZWMhnEtrP6wgA37d6hB_z5lSJs5MIhefAEYA7aOmu-jfFEcU3G6Chva_j9jbMDxEi7fhSYO1qYP57CR3U-AzDJivwuvuMVwSWUkUwq8f7sWByiIbi9yTTJWQ7NycVIg2pKhQJkcOVKZpa8w1qg8Zf03RT5KRCNPeH_kXmRWWrx9hmEIaJlGtlmcOoPO-zeEWgwLkW5QF0boioQHkZ1kt3EP1AslGocWJQUOjciQ7-aemPhY_kzuMfYEfFGH-4aS2TtadnvcMQQ"; // Replace with your actual bearer token

   const apiUrl = `http://127.0.0.1:8080/tasks/29`; // Assuming 1 is the task ID

   const assignedUsersArray= document.getElementById("assignedUsers").value.split(",").map(user => user.trim());

   const priorityString = document.getElementById("priority").value;
   const priorityObject = { "priorityId": parseInt(priorityString, 10) };

   const statusString = document.getElementById("status").value;
   const statusObject = { "statusId": parseInt(statusString, 10) }; 


    // Gather updated values from form fields
    const updatedTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,



        status: statusObject,
        priority: priorityObject,



        dueDate: document.getElementById("dueDate").value,
        completedDate: document.getElementById("completedDate").value,
        assignedUsers: assignedUsersArray.map(userId => {
            return { "userId": parseInt(userId) };
          })
    };

    console.log(updatedTask);




    try {
            fetch (apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        }).then(response =>{if (!response.ok) {
            console.log(response.status);
            throw new Error(`Failed to update task: ${response.status}`);
        }

       // const updatedTaskData = await response.json();
        console.log("Task updated successfully:", updatedTaskData);

        // You can show a success message or perform additional actions here
        document.getElementById("successMessage").style.display = "block";
        document.getElementById("failureMessage").style.display = "none";})

        

    } catch (error) {
        console.error("Error updating task:", error);

        // You can show an error message or perform additional error handling here
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("failureMessage").style.display = "block";
    }











}






async function fetchTaskDetails(taskId) {
   
    const apiUrl = `http://127.0.0.1:8080/tasks/${taskId}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch task details: ${response.status}`);
        }

        const taskData = await response.json();

        // Populate form fields with task details
        document.getElementById("taskId").value = taskData.taskId;
        document.getElementById("title").value = taskData.title;
        document.getElementById("description").value = taskData.description;
        document.getElementById("status").value = taskData.status.statusId;
        document.getElementById("priority").value = taskData.priority.priorityId;
        document.getElementById("dueDate").value = taskData.dueDate;
        document.getElementById("completedDate").value = taskData.completedDate;
        document.getElementById("assignedUsers").value = taskData.assignedUsers.map(user => user.userId).join(" ,");

    } catch (error) {
        console.error("Error fetching task details:", error);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const taskId = 29; // Replace with the actual task ID you want to load
    fetchTaskDetails(taskId);
});