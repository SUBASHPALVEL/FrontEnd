function redirectTo(url) {
  window.location.href = url;
}

function handleLogout() {
  window.location.href = "../login/login.html";
  localStorage.clear();
}

const isAdmin = localStorage.getItem("isAdmin");

function checkAdminAndDisplayButtons() {
  let buttonsToDisplay = ["All Users", "All Tasks", "User's Tasks", "Create Task","Create User", "Change Password"];

  if (isAdmin === "ADMIN") {
    buttonsToDisplay.forEach(function(buttonText) {
      showButton(buttonText);
    });
  } else {
    hideButton("All Users");
    hideButton("All Tasks");
    hideButton("User's Tasks");
    hideButton("Create Task")
    hideButton("Create User");
    hideButton("Change Password");
  }
}

function showButton(buttonText) {
  let buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === buttonText) {
      buttons[i].style.display = "inline-block";
      break;
    }
  }
}

function hideButton(buttonText) {
  var buttons = document.getElementsByClassName("button");
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent === buttonText) {
      buttons[i].style.display = "none";
      break;
    }
  }
}

checkAdminAndDisplayButtons();

