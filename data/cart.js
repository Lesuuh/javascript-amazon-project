export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
  {
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 2,
  },
];

// add to cart
export function addToCart(productId) {
  // ALTERNATiVE METHOD OF ADDING TO CART
  // let matchingItem = undefined;

  // cart.forEach((item) => {
  //   if (productName === item.productName) {
  //     matchingItem = item;
  //   }
  // });

  // if (matchingItem) {
  //   matchingItem.quantity += 1;
  // } else {
  //   cart.push({ productName: productName, quantity: 1 });
  // }

  // ADDING TO CART
  let productQuantitySelect = document.querySelector(
    `.js-quantity-selector-${productId}`
  ).value;
  productQuantitySelect = Number(productQuantitySelect);

  const productInCart = cart.find(
    (cartItem) => cartItem.productId === productId
  );
  if (productInCart) {
    productInCart.quantity += productQuantitySelect;
  } else {
    cart.push({ productId, quantity: productQuantitySelect });
  }
}
