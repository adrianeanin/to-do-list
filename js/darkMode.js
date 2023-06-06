//dark mode

const toggleButton = document.querySelector("#toggle");
const body = document.body;

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
