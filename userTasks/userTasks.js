document.addEventListener("DOMContentLoaded", function () {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
    }

    fetch("http://localhost:8080/api/tasks/userTasks/1")
        .then(response => response.json())
        .then(tasks => {
            let tableBody = document.getElementById("task-table-body");

            tasks.forEach(task => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${task.taskId}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                    <td>${task.createdDate}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.completedDate}</td>
                    <td>${task.assignedUsers ? task.assignedUsers.map(user => user.username).join(", ") : ''}</td>
                    <td>
                        <span class="edit-btn" data-id="${task.taskId}">Edit</span>
                        <span class="delete-btn" data-id="${task.taskId}">Delete</span>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
});
