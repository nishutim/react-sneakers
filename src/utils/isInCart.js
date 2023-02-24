const isInCart = (cartItems, id) => {
   return cartItems.find(item => item.parentId === id);
}

export default isInCart;