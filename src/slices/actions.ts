export const openCart = () => ({ type: OPEN_CART });
export const closeCart = () => ({ type: CLOSE_CART });
export const increaseCartQuantity = (id: number) => ({ type: INCREASE_CART_QUANTITY, payload: { id } });
export const decreaseCartQuantity = (id: number) => ({ type: DECREASE_CART_QUANTITY, payload: { id } });
export const removeFromCart = (id: number) => ({ type: REMOVE_FROM_CART, payload: { id } });