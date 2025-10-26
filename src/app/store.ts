import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import { clearCartState, loadCartState, queueCartSave } from './persist';
import type { CartState } from '../features/cart/cartSlice';

const preloadedCartState = loadCartState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: preloadedCartState
    ? {
        cart: preloadedCartState,
      }
    : undefined,
});

let currentCartSnapshot: CartState = store.getState().cart;

store.subscribe(() => {
  const nextCart = store.getState().cart;
  if (nextCart === currentCartSnapshot) {
    return;
  }

  currentCartSnapshot = nextCart;

  if (Object.keys(nextCart.items).length === 0) {
    clearCartState();
    return;
  }

  queueCartSave(nextCart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
