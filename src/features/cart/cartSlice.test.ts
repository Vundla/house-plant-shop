import cartReducer, {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartItemsArray,
  selectCartTotalCount,
  selectCartTotalPrice,
  type CartState,
} from './cartSlice';
import type { Product } from '../../data/products';

const fakeProduct: Product = {
  id: 'test-plant',
  name: 'Test Plant',
  price: 10,
  description: 'Test description',
  image: 'https://example.com/plant.jpg',
  category: 'Low Light',
};

const makeState = (state?: Partial<CartState>): CartState => ({
  items: {},
  ...state,
});

describe('cartSlice', () => {
  it('adds a product only once', () => {
    const state = cartReducer(undefined, addItem(fakeProduct));
    expect(state.items[fakeProduct.id]?.quantity).toBe(1);
    const second = cartReducer(state, addItem(fakeProduct));
    expect(second.items[fakeProduct.id]?.quantity).toBe(1);
  });

  it('increments and decrements quantity', () => {
    const state = makeState({
      items: {
        [fakeProduct.id]: { product: fakeProduct, quantity: 1 },
      },
    });
    const incremented = cartReducer(state, increaseQuantity(fakeProduct.id));
    expect(incremented.items[fakeProduct.id]?.quantity).toBe(2);

    const decremented = cartReducer(incremented, decreaseQuantity(fakeProduct.id));
    expect(decremented.items[fakeProduct.id]?.quantity).toBe(1);

    const removed = cartReducer(decremented, decreaseQuantity(fakeProduct.id));
    expect(removed.items[fakeProduct.id]).toBeUndefined();
  });

  it('removes items directly', () => {
    const state = makeState({
      items: {
        [fakeProduct.id]: { product: fakeProduct, quantity: 2 },
      },
    });
    const result = cartReducer(state, removeItem(fakeProduct.id));
    expect(result.items[fakeProduct.id]).toBeUndefined();
  });

  it('calculates totals', () => {
    const state = makeState({
      items: {
        [fakeProduct.id]: { product: fakeProduct, quantity: 3 },
      },
    });
    const totalsState = { cart: state } as unknown as { cart: CartState };
    expect(selectCartItemsArray(totalsState)).toHaveLength(1);
    expect(selectCartTotalCount(totalsState)).toBe(3);
    expect(selectCartTotalPrice(totalsState)).toBe(30);
  });
});
