export const cart = [];

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
  