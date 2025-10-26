import type { CartState } from '../features/cart/cartSlice';

const STORAGE_KEY = 'verdant-vibes-cart';

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const loadCartState = (): CartState | undefined => {
  if (!isBrowser) {
    return undefined;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return undefined;
    }
    const parsed = JSON.parse(raw) as CartState;
    if (parsed && typeof parsed === 'object' && parsed.items) {
      return parsed;
    }
  } catch (error) {
    console.warn('Failed to parse cart state from storage', error);
  }

  return undefined;
};

let saveTimeout: number | undefined;

export const queueCartSave = (cartState: CartState) => {
  if (!isBrowser) {
    return;
  }

  if (saveTimeout) {
    window.clearTimeout(saveTimeout);
  }

  saveTimeout = window.setTimeout(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
    } catch (error) {
      console.warn('Failed to persist cart state', error);
    }
  }, 150);
};

export const clearCartState = () => {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear cart state from storage', error);
  }
};
