


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































async function updateUser() {

   const apiUrl = `http://127.0.0.1:8080/api/users/1`; 

   const roleString = document.getElementById("roleId").value;
   const roleObject = { "roleId": parseInt(roleString, 10) };



    const updatedUserData = {
        userName: document.getElementById("userName").value,
        userMail: document.getElementById("userMail").value,
        password: document.getElementById("password").value,

        roleId: roleObject,

    };

    console.log(updatedUserData);




    try {
            fetch (apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUserData)
        }).then(response =>{if (!response.ok) {
            console.log(response.status);
            throw new Error(`Failed to update task: ${response.status}`);
        }

        console.log("Task updated successfully:", updatedUserData);

        document.getElementById("successMessage").style.display = "block";
        document.getElementById("failureMessage").style.display = "none";})

        

    } catch (error) {
        console.error("Error updating task:", error);

        document.getElementById("successMessage").style.display = "none";
        document.getElementById("failureMessage").style.display = "block";
    }

}






async function fetchUserDetails(userId) {

    const apiUrl = `http://127.0.0.1:8080/api/users/${userId}`;

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

        const userData = await response.json();

        // Populate form fields with task details
        document.getElementById("userId").value = userData.userId;
        document.getElementById("userName").value = userData.userName;
        document.getElementById("userMail").value = userData.userMail;
        document.getElementById("password").value = userData.password;
        document.getElementById("roleId").value = userData.roleId.roleId;

    } catch (error) {
        console.error("Error fetching task details:", error);
    }
}


document.addEventListener("DOMContentLoaded", function() {
    const userId = 1; 
    fetchUserDetails(userId);
});