document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // Scroll animations
  // =========================
  const elements = document.querySelectorAll(".scroll-animate");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  elements.forEach((el) => observer.observe(el));

  // =========================
  // Open links normally
  // =========================
  function handleAction(selector) {
    const items = document.querySelectorAll(selector);
    items.forEach((item) => {
      item.addEventListener("click", function (e) {
        const isDarkToggle = this.classList.contains("dark-mode-toggle"); 
        const targetUrl = this.dataset.url || this.getAttribute("href");
        if (targetUrl && !isDarkToggle) {
          window.location.href = targetUrl;
        }
      });
    });
  }
  handleAction(".btn-buy, .btn-info, .product-link, .dropdown-item");

  // =========================
  // Navbar login/logout handling
  // =========================
  const loggedInUser = localStorage.getItem("loggedInUser"); // login name stored in localStorage

  const loginBtn = document.getElementById("login-btn"); // navbar login button
  const userMenu = document.getElementById("user-menu"); // user dropdown
  const usernameDisplay = document.getElementById("username-display"); // dropdown span
  const logoutBtn = document.getElementById("logout-btn");
  const getStartedBtn = document.getElementById("get-started-btn"); // homepage "Get Started" button

  if (loggedInUser) {
    // Hide login button, show user menu
    if (loginBtn) loginBtn.style.display = "none";
    if (userMenu) userMenu.classList.remove("d-none");

    // Show username
    if (usernameDisplay) usernameDisplay.textContent = `Hello, ${loggedInUser}`;

    // Hide Get Started button if exists
    if (getStartedBtn) getStartedBtn.style.display = "none";
  } else {
    // Show login, hide user menu
    if (loginBtn) loginBtn.style.display = "block";
    if (userMenu) userMenu.classList.add("d-none");
  }

  // Logout button functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedInUser"); // remove login info
      location.reload(); // reload page
    });
  }

  // =========================
  // Dark Mode Toggle
  // =========================
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const siteFooter = document.querySelector(".site-footer");

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      if (themeToggle) themeToggle.textContent = "☀️";
      if (siteFooter) siteFooter.classList.add("footer-dark");
    } else {
      body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.textContent = "🌙";
      if (siteFooter) siteFooter.classList.remove("footer-dark");
    }
  }

  applyTheme(localStorage.getItem("theme") || "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }
});