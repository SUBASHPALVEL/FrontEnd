document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API using GET method
    fetch('http://localhost:8080/api/tasks')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Get the table body element
            const tableBody = document.getElementById('taskTableBody');

            // Loop through the data and create table rows
            data.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${task.taskId}</td>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.status}</td>
                    <td>${task.priority}</td>
                    <td>${task.dueDate}</td>
                    <td>${task.createdDate}</td>
                    <td>${task.completedDate || 'N/A'}</td>
                    <td>${task.assignedUsers.map(user => user.username).join(', ')}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
