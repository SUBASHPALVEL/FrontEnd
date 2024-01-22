document.addEventListener('DOMContentLoaded', function () {

    fetchData();
  });

  let reportData;
  const formContainer = document.getElementById("reportContainer");
  const failureMessage = document.getElementById("failureMessage");

  const token = localStorage.getItem('token');

  async function fetchData() {
    const apiUrl = 'http://localhost:8080/api/report/task-vs-assign';
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

       reportData = await response.json();
      createDashboard(reportData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

function showFor4SecondsForFailure() {
  failureMessage.style.display = "block";
  formContainer.style.opacity = "0.5";
  setTimeout(() => {
    failureMessage.style.display = "none";
    formContainer.style.opacity = "1";
    window.location.href = "../homepage/homepage.html";
  }, 4000);
}

function handleHome() {
    window.location.href = "../homepage/homepage.html";
  }



    function handleLogout() {
        window.location.href = "../Login/Loginmain.html";
        localStorage.clear();
      }

function createDashboard() {

}
