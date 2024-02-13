import { PayloadAction } from "@reduxjs/toolkit";

// actionTypes.ts
export const OPEN_CART = 'OPEN_CART';
export const CLOSE_CART = 'CLOSE_CART';
export const INCREASE_CART_QUANTITY = 'INCREASE_CART_QUANTITY';
export const DECREASE_CART_QUANTITY = 'DECREASE_CART_QUANTITY';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// actions.ts
export const openCart = () => ({ type: OPEN_CART });
export const closeCart = () => ({ type: CLOSE_CART });
export const increaseCartQuantity = (id: number) => ({ type: INCREASE_CART_QUANTITY, payload: { id } });
export const decreaseCartQuantity = (id: number) => ({ type: DECREASE_CART_QUANTITY, payload: { id } });
export const removeFromCart = (id: number) => ({ type: REMOVE_FROM_CART, payload: { id } });

// shoppingCartReducer.ts

type CartItem = {
  id: number;
  quantity: number;
};

interface ShoppingCartState {
  isOpen: boolean;
  cartItems: CartItem[];
}

const initialState: ShoppingCartState = {
  isOpen: false,
  cartItems: [],
};

const shoppingCartReducer = (state = initialState, action:PayloadAction<{id:number}>) => {
  switch (action.type) {
    case OPEN_CART:
      return { ...state, isOpen: true };

    case CLOSE_CART:
      return { ...state, isOpen: false };

      

    case INCREASE_CART_QUANTITY:
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (!existingItem) {
        return { ...state, cartItems: [...state.cartItems, { id, quantity: 1 }] };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      }

    case DECREASE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
        ),
      };

    case REMOVE_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload.id) };

    default:
      return state;
  }
};

export default shoppingCartReducer;
