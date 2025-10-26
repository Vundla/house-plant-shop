import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductListingPage from './ProductListingPage';
import { renderWithProviders } from '../test-utils';
import type { CartLineItem } from '../features/cart/cartSlice';

describe('ProductListingPage', () => {
  it('lists products and prevents duplicate adds', async () => {
    const { store } = renderWithProviders(<ProductListingPage />, { route: '/products' });

    const addButtons = await screen.findAllByRole('button', { name: /add to cart/i });
    expect(addButtons).toHaveLength(6);

    await userEvent.click(addButtons[0]);

    expect(addButtons[0]).toBeDisabled();
    expect(addButtons[0]).toHaveTextContent(/added to cart/i);

    const state = store.getState();
    const items = Object.values(state.cart.items) as CartLineItem[];
    expect(items).toHaveLength(1);
    expect(items[0]?.quantity).toBe(1);
  });
});
