const toggleButton = document.getElementById("toggle");
const body = document.body;

// Function to check the user's preferred color scheme
function setInitialMode() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (prefersDarkMode) {
    body.classList.add("dark-mode");
  }
}

toggleButton.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});

setInitialMode();
