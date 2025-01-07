import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// import dayjs from "https://cdn.skypack.dev/dayjs";
import {
  calculateDeliveryDate,
  deliveryOptions,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartItemHTML = "";

  cart.forEach((cartItem) => {
    const { productId, quantity, deliveryOptionId } = cartItem;
    const matchingProduct = products.find(
      (product) => product.id === productId
    );
    const { image, priceCents, name } = matchingProduct;

    // Find the matching delivery option
    const deliveryOption = deliveryOptions.find(
      (option) => option.id === Number(deliveryOptionId)
    );

    // // Handle case where no matching delivery option is found
    // if (!deliveryOption) {
    //   console.error(
    //     `No matching delivery option found for deliveryOptionId: ${deliveryOptionId}`
    //   );
    //   return; // Skip this cart item to prevent errors
    // }

    const dateString = calculateDeliveryDate(deliveryOption);

    cartItemHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image" src="${image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">
              $${formatCurrency(priceCents)} 
            </div>
  
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${productId}">${quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">
                Update
              </span>
               <input class="quantity-input js-quantity-input-${productId}">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const { id, deliveryDays, priceCents } = deliveryOption;

      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        priceCents === 0 ? "FREE" : `$${formatCurrency(priceCents)}`;

      // Check if this delivery option is selected
      //   const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      const isChecked = deliveryOption.id === Number(cartItem.deliveryOptionId);

      // Generate HTML for this delivery option
      html += `
         
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });

    return html;
  }
  document.querySelector(".js-order-summary").innerHTML = cartItemHTML;

  //   // TO UPDATE THE CART HEADER QUANTITY
  //   function updateCartQuantity() {
  //     const cartLengthDisplay = document.querySelector(".js-header-cart-count");
  //     const cartLength = calculateCartQuantity();
  //     if (cartLength === 0) {
  //       cartLengthDisplay.textContent = `No items`;
  //     } else if (cartLength === 1) {
  //       cartLengthDisplay.textContent = `${cartLength} item`;
  //     } else {
  //       cartLengthDisplay.textContent = `${cartLength} items`;
  //     }
  //   }

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
      renderCheckoutHeader();
      //   updateCartQuantity();
      renderPaymentSummary();
    });
  });
  //   updateCartQuantity();
  renderCheckoutHeader();

  // TO UPDATE THE CART
  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
      renderPaymentSummary();
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

      //   updateCartQuantity();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
