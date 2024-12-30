import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartItemHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const product = products.find((product) => product.id === productId);
  const { image, priceCents, name } = product;

  cartItemHTML += `
        <div class="cart-item-container js-cart-item-container-${
          cartItem.productId
        }">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(priceCents)} 
                    </div>

                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${productId}">${
    cartItem.quantity
  }</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">
                        Update
                    </span>
                     <input class="quantity-input js-quantity-input-${productId}">
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      cartItem.productId
                    }">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name=${cartItem.productId}>
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name=${cartItem.productId}>
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name=${cartItem.productId}>
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>`;
});

document.querySelector(".js-order-summary").innerHTML = cartItemHTML;

// TO UPDATE THE CART HEADER QUANTITY
function updateCartQuantity() {
  const cartLengthDisplay = document.querySelector(".js-header-cart-count");
  const cartLength = calculateCartQuantity();
  console.log(cartLength);
  if (cartLength === 0) {
    cartLengthDisplay.textContent = `No items`;
  } else if (cartLength === 1) {
    cartLengthDisplay.textContent = `${cartLength} item`;
  } else {
    cartLengthDisplay.textContent = `${cartLength} items`;
  }
}

// TO DELETE FROM CART
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();

    // Update the cart quantity after removing the item
    updateCartQuantity();
  });
});
updateCartQuantity();

// TO UPDATE THE CART
document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});

// ON SAVE AFTER EDITING
document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    const inputValue = document.querySelector(
      `.js-quantity-input-${productId}`
    ).value;

    const newQuantity = Number(inputValue);

    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateQuantity(productId, newQuantity);

    // Update the quantity label
    document.querySelector(`.js-quantity-label-${productId}`).textContent =
      newQuantity;
    container.classList.remove("is-editing-quantity");

    updateCartQuantity();
  });
});