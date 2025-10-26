import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
  Draft,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Product } from '../../data/products';

export type CartLineItem = {
  product: Product;
  quantity: number;
};

export type CartState = {
  items: Record<string, CartLineItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: Draft<CartState>, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items[product.id];
      if (!existing) {
        state.items[product.id] = { product, quantity: 1 };
      }
    },
    increaseQuantity(state: Draft<CartState>, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.items[id];
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state: Draft<CartState>, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.items[id];
      if (!item) return;
      if (item.quantity <= 1) {
        delete state.items[id];
      } else {
        item.quantity -= 1;
      }
    },
    removeItem(state: Draft<CartState>, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    clearCart(state: Draft<CartState>) {
      state.items = {};
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart } =
  cartSlice.actions;

const selectCartState = (state: RootState) => state.cart.items;

export const selectCartItems = createDraftSafeSelector(
  selectCartState,
  (items: CartState['items']) => items,
);

export const selectCartItemsArray = createDraftSafeSelector(
  selectCartState,
  (items: CartState['items']): CartLineItem[] => Object.values(items),
);

export const selectCartTotalCount = createDraftSafeSelector(
  selectCartItemsArray,
  (items: CartLineItem[]) => items.reduce((acc: number, item: CartLineItem) => acc + item.quantity, 0),
);

export const selectCartTotalPrice = createDraftSafeSelector(
  selectCartItemsArray,
  (items: CartLineItem[]) =>
    items.reduce(
      (acc: number, item: CartLineItem) => acc + item.quantity * item.product.price,
      0,
    ),
);

export const makeSelectIsInCart = (productId: string) =>
  createDraftSafeSelector(selectCartState, (items: CartState['items']) => Boolean(items[productId]));

export default cartSlice.reducer;
