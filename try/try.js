function login() {
    const usermail = document.getElementById('usermail').value;
    const password = document.getElementById('password').value;

    // Assuming you have a server endpoint at http://localhost:8080/api/users/login
    fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usermail, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data.userId);
        localStorage.setItem("userId",data.userId);
        // You can redirect or perform other actions based on the response
    })
    .catch(error => {
        console.error('Error:', error);
    });
}