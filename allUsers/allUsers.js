document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API using GET method
    const token = localStorage.getItem('token'); 

    fetch('http://localhost:8080/api/users', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Adjust this header based on your API requirements
    }
})
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Get the table body element
            const tableBody = document.getElementById('usersTableBody');

            // Loop through the data and create table rows
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.userId}</td>
                    <td>${user.username}</td>
                    <td>${user.assignedTasks.length > 0 ? generateTaskList(user.assignedTasks) : 'No tasks assigned'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Helper function to generate a list of tasks
function generateTaskList(tasks) {
    const taskList = tasks.map(task => {
        return `<li>${task.title}</li>`;
    });
    return `<ul>${taskList.join('')}</ul>`;
}

// Go back button action
function goBack() {
    window.location.href = "../homepage/homepage.html";

}

// Logout button action
function logout() {
    window.location.href = "../practiceLogin/practiceLogin.html";
}
