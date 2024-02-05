document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

let reportData;
const formContainer = document.getElementById("reportContainer");
const failureMessage = document.getElementById("failureMessage");

const token = localStorage.getItem("token");

async function fetchData() {
  const apiUrl = "http://localhost:8080/api/report/task-vs-assign";
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    reportData = await response.json();
    createDashboard(reportData);
  } catch (error) {
    console.error("Error fetching data:", error);
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
  window.location.href = "../login/login.html";
  localStorage.clear();
}

function generateDatasets(countsObject) {
  return {
    labels: Object.keys(countsObject),
    datasets: [
      {
        data: Object.values(countsObject),
        backgroundColor: Object.values(countsObject).map(() =>
          getRandomColor()
        ),
        borderWidth: 1,
      },
    ],
  };
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function createDashboard(reportData) {
  document.getElementById("totalUsersText").innerHTML = reportData.totalUsers;
  document.getElementById("totalTasksText").innerHTML = reportData.totalTasks;
  document.getElementById("totalAssignmentText").innerHTML =
    reportData.totalAssignments;

  let statusChartCanvas = document
    .getElementById("statusChart")
    .getContext("2d");
  new Chart(statusChartCanvas, {
    type: "pie",
    data: generateDatasets(reportData.statusCounts),
    options: {
      title: {
        display: true,
        text: "Status Counts",
      },
    },
  });

  let priorityChartCanvas = document
    .getElementById("priorityChart")
    .getContext("2d");
  new Chart(priorityChartCanvas, {
    type: "pie",
    data: generateDatasets(reportData.priorityCounts),
    options: {
      title: {
        display: true,
        text: "Priority Counts",
      },
    },
  });

  let designationChartCanvas = document
    .getElementById("designationChart")
    .getContext("2d");
  new Chart(designationChartCanvas, {
    type: "pie",
    data: generateDatasets(reportData.designationCounts),
    options: {
      title: {
        display: true,
        text: "Designation Counts",
      },
    },
  });
}