document.addEventListener("DOMContentLoaded", function () {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
    }

    fetch("http://localhost:8080/api/users/" + userId + "/tasks")
        .then(response => response.json())
        .then(tasks => {
            var tableBody = document.getElementById("task-table-body");

            tasks.forEach(task => {
                var row = document.createElement("tr");

                row.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                    <td>${task.createdDate}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.completedDate}</td>
                    <td>${task.assignedUsers.map(user => user.username).join(", ")}</td>
                    <td>
                        <span class="edit-btn" data-id="${task.id}">Edit</span>
                        <span class="delete-btn" data-id="${task.id}">Delete</span>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
});
