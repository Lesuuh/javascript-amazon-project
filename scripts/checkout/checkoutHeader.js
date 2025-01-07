import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let checkoutHTML = "";
  checkoutHTML += `
        Checkout (<a class="return-to-home-link js-header-cart-count" href="amazon.html">${calculateCartQuantity()}</a>)
    `;

  document.querySelector(".js-checkout-header").innerHTML = checkoutHTML;
  updateCartQuantity(); // Call the function to update the cart quantity

  // TO UPDATE THE CART HEADER QUANTITY
  function updateCartQuantity() {
    const cartLengthDisplay = document.querySelector(".js-header-cart-count");
    const cartLength = calculateCartQuantity();
    if (cartLength === 0) {
      cartLengthDisplay.textContent = `No items`;
    } else if (cartLength === 1) {
      cartLengthDisplay.textContent = `${cartLength} item`;
    } else {
      cartLengthDisplay.textContent = `${cartLength} items`;
    }
  }
}
