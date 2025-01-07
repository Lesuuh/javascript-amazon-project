import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let paymentSummaryHTML = ""; // Initialize as an empty string
  let totalItemsPrice = 0;
  let totalShippingPrice = 0;
  let totalBeforeTax = 0;
  let taxPrice = 0;
  let orderTotal = 0;

  const totalCartQuantity = cart.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );
  console.log(totalCartQuantity);

  cart.forEach((cartItem) => {
    let orderPrice = 0;
    const { productId, quantity, deliveryOptionId } = cartItem;
    const matchingProduct = products.find(
      (product) => product.id === productId
    );

    if (matchingProduct) {
      orderPrice += quantity * matchingProduct.priceCents;
      totalItemsPrice += orderPrice;
    }

    // Calculate shipping cost
    let shippingCost = 0;
    const shipping = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );

    if (shipping) {
      shippingCost += shipping.priceCents;
      totalShippingPrice += shippingCost;
    }
  });

  totalBeforeTax = totalShippingPrice + totalItemsPrice;
  taxPrice = totalBeforeTax * 0.1;
  orderTotal = totalBeforeTax + taxPrice;
  //   console.log(orderTotal);

  // Generate the HTML
  paymentSummaryHTML += `
      <div class="payment-summary-title">Order Summary</div>
  
      <div class="payment-summary-row">
        <div>Items (${totalCartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalItemsPrice
        )}</div>
      </div>
  
      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalShippingPrice
        )}</div>
      </div>
  
      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(
          totalBeforeTax
        )}</div>
      </div>
  
      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxPrice)}</div>
      </div>
  
      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
      </div>
  
      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
