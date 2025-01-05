import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
export function renderPaymentSummary() {
  let totalItemsPrice = 0;
  let totalShippingPrice = 0;
  let totalBeforeTax = 0;
  let orderTotal = 0;
  cart.forEach((cartItem) => {
    let orderPrice = 0;
    const { productId, quantity, deliveryOptionId } = cartItem;
    const matchingProduct = products.find(
      (product) => product.id === productId
    );
    // console.log(matchingProduct);
    if (matchingProduct) {
      orderPrice += quantity * matchingProduct.priceCents;
      totalItemsPrice += orderPrice;
    }

    // shippingcost
    let shippingCost = 0;
    const shipping = deliveryOptions.find(
      (option) => option.id === deliveryOptionId
    );
    shippingCost += shipping.priceCents;
    totalShippingPrice += shippingCost;
  });
  console.log(`$${totalShippingPrice}`);

  console.log(`$${formatCurrency(totalItemsPrice)}`);
  totalBeforeTax = totalShippingPrice + totalItemsPrice;
  console.log(totalBeforeTax);
  //   if tax 10%
  orderTotal = (10 / 100) * totalBeforeTax + totalBeforeTax;
  console.log(`$${formatCurrency(orderTotal)}`);
}
