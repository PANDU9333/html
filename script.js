document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js loaded");

  // Load existing cart or initialize new
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count on every page
  function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
      cartCountEl.textContent = cart.length;
    }
  }

  updateCartCount(); // Initial count

  // Get all Add to Cart buttons
  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      if (!card) return;

      const title = card.querySelector(".product-title")?.textContent.trim();
      const price = card.querySelector("p")?.textContent.trim();
      const image = card.querySelector("img")?.getAttribute("src");

      if (title && price && image) {
        const item = { title, price, image };
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${title} added to cart ✅`);
      } else {
        alert("❌ Failed to add item. Data missing.");
      }
    });
  });

  // Discard button functionality
  document.querySelectorAll(".discard-btn").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const title = card.querySelector(".product-title")?.textContent.trim();

      const index = cart.findIndex(item => item.title === title);
      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${title} removed from cart 🗑️`);
      } else {
        alert("Item not found in cart.");
      }
    });
  });
});
