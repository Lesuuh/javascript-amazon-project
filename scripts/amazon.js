import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

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
            $${formatCurrency(product.priceCents)}
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
          }" >
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML = productsHTML;

// to add the total quantity of items in the cart to the cart icon in the header
function addToCartIcon() {
  const cartLength = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").textContent = cartLength;
}

// add to cart message
function addToCartMessage(addedMessageTimeout, productId) {
  const addedMessage = document.querySelector(
    `.js-added-to-cart-message-${productId}`
  );
  addedMessage.classList.add("added-to-cart-show");

  if (addedMessageTimeout) {
    clearTimeout(addedMessageTimeout);
  }

  // to remove the cartMessage after 2 secs
  const removeMessage = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-show");
  }, 2000);

  addedMessageTimeout = removeMessage;
}

let addedMessageTimeout;
// calling all the functions when clicking add to cart button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  // initialize the settimeout

  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    addToCart(productId);
    addToCartIcon();
    addToCartMessage(addedMessageTimeout, productId);
  });
});
