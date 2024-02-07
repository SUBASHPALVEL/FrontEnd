
async function updateTask(event) {
    event.preventDefault();
  
    const apiUrl = `http://127.0.0.1:8080/api/tasks/${updateTaskId}`;
  
    const assignedUsersArray = document
      .getElementById("assignedUsers")
      .value.split(",")
      .map((user) => user.trim());
  
    const priorityString = document.getElementById("priority").value;
    const priorityObject = { priorityId: parseInt(priorityString, 10) };
  
    const statusString = document.getElementById("status").value;
    const statusObject = { statusId: parseInt(statusString, 10) };
  
    const updatedTask = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
  
      status: statusObject,
      priority: priorityObject,
  
  
      dueDate: document.getElementById("dueDate").value,
      completedDate: document.getElementById("completedDate").value,
      assignedUsers: assignedUsersArray.map((userId) => {
        return { userId: parseInt(userId) };
      }),
    };
  
    console.log(updatedTask);
  
    try {
      fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      }).then((response) => {
        if (!response.ok) {
          console.log(response.status);
          showFor4SecondsForFailure();
          throw new Error(`Failed to update task: ${response.status}`);
        }
  
        console.log("Task updated successfully:");
        showFor4SecondsForSuccess();
      });
    } catch (error) {
      console.error("Error updating task:", error);
      showFor4SecondsForFailure();
    }
  }
  
  async function fetchTaskDetails(updateTaskId) {
    const apiUrl = `http://127.0.0.1:8080/api/tasks/${updateTaskId}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const taskData = await response.json();
  
      document.getElementById("taskId").value = taskData.taskId;
      document.getElementById("title").value = taskData.title;
      document.getElementById("description").value = taskData.description;
      document.getElementById("status").value = taskData.status.statusId;
      document.getElementById("priority").value = taskData.priority.priorityId;
      document.getElementById("dueDate").value = taskData.dueAt;
      document.getElementById("completedDate").value = taskData.completedAt;
      document.getElementById("assignedUsers").value = taskData.assignedUsers
        .map((user) => user.userId)
        .join(" ,");
    } catch (error) {
      let errorCode = "Fetching Task Details Failed";
      errorCodeElement.innerHTML = errorCode;
      errorElement.innerText = error.message;
      showFor4SecondsForFailure();
    }
  }