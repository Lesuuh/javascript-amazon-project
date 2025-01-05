export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: 1,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: 2,
    },
  ];
}

// saving the cart to ocal storage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ADDING TO CART
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
    cart.push({
      productId,
      quantity: productQuantitySelect,
      deliveryOptionId: 1,
    });
  }
  saveToStorage();
}

// DELETING FROM CART
export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

// CALCULATING CART LENGHT
export function calculateCartQuantity() {
  const cartLength = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  return cartLength;
}

// UPDATING THE QUANTITY
export function updateQuantity(productId, newQuantity) {
  const filteredItems = cart.filter((item) => item.productId === productId);
  filteredItems[0].quantity = newQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
