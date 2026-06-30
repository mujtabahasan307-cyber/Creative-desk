
document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // Navbar username + logout + hide login button
  // =========================
  const usernameSpan = document.getElementById("navbar-username");
  const logoutItem = document.getElementById("logout-item");
  const logoutBtn = document.getElementById("logout-btn");
  const loginBtn = document.getElementById("login-btn"); // target your login <li>
  const loggedInUser = localStorage.getItem("loggedInUser");

 if (loggedInUser) {
  if (usernameSpan) usernameSpan.textContent = `Hello, ${loggedInUser}`;
  if (logoutItem) logoutItem.classList.remove("d-none");
  if (loginBtn) loginBtn.style.display = "none"; // hide login button
} else {
  if (loginBtn) loginBtn.style.display = "block"; // show login button
  if (logoutItem) logoutItem.classList.add("d-none");
}

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      location.reload();
    });
  }

  // =========================
  // Dark Mode Always ON
  // =========================
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");

  // =========================
  // Cart System
  // =========================
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  window.addToCart = function (productName, price) {
    if (!loggedInUser) {
      alert("Please login first to add items to the cart.");
      window.location.href = "login.html";
      return;
    }

    const existingItem = cartItems.find((item) => item.name === productName);
    if (existingItem) existingItem.qty += 1;
    else cartItems.push({ name: productName, price: price || 0, qty: 1 });

    updateCart();
  };

  window.removeFromCart = function (index) {
    cartItems.splice(index, 1);
    updateCart();
  };

  function updateCart() {
    const countEl = document.getElementById("cart-count");
    const itemsEl = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("cart-subtotal");
    const taxEl = document.getElementById("cart-tax");
    const totalEl = document.getElementById("cart-total");

    if (countEl) countEl.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);

    if (itemsEl) {
      itemsEl.innerHTML =
        cartItems.length === 0
          ? `<li class="text-muted"><em>Cart is empty</em></li>`
          : cartItems
              .map(
                (item, i) => `
          <li class="d-flex justify-content-between align-items-center border-bottom py-1">
            <span>${item.name} (x${item.qty})</span>
            <span>Rs. ${(item.price * item.qty).toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${i})">❌</button>
          </li>`
              )
              .join("");
    }

    let subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    let tax = subtotal * 0.05;
    let total = subtotal + tax;

    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `Rs. ${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `Rs. ${total.toFixed(2)}`;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  updateCart(); // initial render

  // =========================
  // Cart Box Toggle
  // =========================
  const cartBtn = document.getElementById("cart-btn");
  cartBtn?.addEventListener("click", () => {
    const cartBox = document.getElementById("cart-box");
    if (cartBox) cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    const cartBox = document.getElementById("cart-box");
    if (cartBox && e.target !== cartBtn && !cartBox.contains(e.target)) {
      cartBox.style.display = "none";
    }
  });

  // =========================
  // PDF Downloads (Modal & Standalone)
  // =========================
  const modalDownloadBtns = document.querySelectorAll(".download-btn");
  modalDownloadBtns.forEach((btn) => {
    if (!loggedInUser) {
      btn.classList.add("btn-secondary");
      btn.classList.remove("btn-outline-danger");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Please login first to download this PDF.");
        window.location.href = "login.html";
      });
    }
  });

  const downloadBtn = document.getElementById("download-pdf");
  if (downloadBtn) {
    if (!loggedInUser) {
      downloadBtn.disabled = true;
      downloadBtn.classList.add("btn-secondary");
      downloadBtn.addEventListener("click", (e) => e.preventDefault());
    } else {
      downloadBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const link = document.createElement("a");
        link.href = "/files/sample.pdf";
        link.download = "sample.pdf";
        link.click();
      });
    }
  }

  // =========================
  // Checkout Button Thank You Popup
  // =========================
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cartBox = document.getElementById("cart-box");
      if (cartBox) cartBox.style.display = "none";

      cartItems = [];
      updateCart();

      const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
      thankYouModal.show();

      if (window.confetti) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    });
  }
});

