let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Function
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Checkout Page Logic
if (document.getElementById("orderSummary")) {
  let orderSummary = document.getElementById("orderSummary");
  let checkoutTotal = 0;

  cart.forEach(item => {
    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = ${item.name} <strong>₹${item.price}</strong>;
    orderSummary.appendChild(li);
    checkoutTotal += item.price;
  });

  document.getElementById("checkoutTotal").textContent = checkoutTotal;

  // Payment method change handling
  let paymentRadios = document.querySelectorAll("input[name='payment']");
  let paymentDetails = document.getElementById("paymentDetails");

  paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "UPI") {
        paymentDetails.innerHTML = `
          <label class="form-label">Enter UPI ID</label>
          <input type="text" class="form-control" id="upiId" placeholder="example@upi" required>
        `;
      } else if (radio.value === "Card") {
        paymentDetails.innerHTML = `
          <label class="form-label">Card Number</label>
          <input type="text" class="form-control mb-2" id="cardNumber" placeholder="1234 5678 9012 3456" required>
          <label class="form-label">Expiry Date</label>
          <input type="month" class="form-control" id="expiryDate" required>
        `;
      } else {
        paymentDetails.innerHTML = "";
      }
    });
  });

  // Handle Checkout Form
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let payment = document.querySelector("input[name='payment']:checked").value;

    alert(✅ Order placed successfully!\nThank you, ${name}.\nPayment Method: ${payment});
    
    localStorage.removeItem("cart"); // Clear cart after order
    window.location.href = "index.html"; // Redirect to home
  });
}