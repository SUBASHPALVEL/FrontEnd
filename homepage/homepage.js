function redirectTo(url) {
  window.location.href = url;
}

function handleLogout() {
  window.location.href = "../login/login.html";
  localStorage.clear();
}
