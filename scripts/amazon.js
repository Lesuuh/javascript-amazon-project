import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
            product.id
          }">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// to add the total quantity of items in the cart to the cart icon in the header
function addToCartIcon() {
  const cartLength = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  document.querySelector(".js-cart-quantity").textContent = cartLength;
}

// add to cart message
function addToCartMessage(addedMessageTimeout, productId) {
  // adding the message to the button
  const addedMessage = document.querySelector(
    `.js-added-to-cart-message-${productId}`
  );

  addedMessage.classList.add("added-to-cart-show");

  // check to see if the timeout is already running
  if (addedMessageTimeout) {
    clearTimeout(addedMessageTimeout);
  }

  const timeout = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-show");
  }, 2000);

  // saving the timeout to stop it later
  addedMessageTimeout = timeout;
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  // initialize the added message timeout
  let addedMessageTimeout;
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    addToCart(productId);
    addToCartIcon();
    addToCartMessage(addedMessageTimeout, productId);
  });
});
